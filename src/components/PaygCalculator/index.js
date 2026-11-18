import {useMemo, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {PRICES as FIXED_PRICES, discountFor as fixedDiscount} from '../FixedPriceCalculator';
import styles from '../FixedPriceCalculator/styles.module.css';

/*
 * FlexoStack PAYG (kullandığın kadar öde) saatlik birim fiyatları (USD).
 * Kademeli fiyat: her kademedeki miktar o kademenin fiyatıyla ücretlendirilir.
 * [kademe üst sınırı (dahil değil), saatlik fiyat]; son kademenin sınırı Infinity.
 * Fiyatlar değiştiğinde yalnızca bu tabloyu güncelleyin (payg.md ile aynı tutun).
 */
const HOURLY = {
  vcpu: [[9, 0.0033], [33, 0.00297], [Infinity, 0.002805]],
  ram: [[33, 0.0033], [65, 0.00297], [Infinity, 0.002805]],
  diskHigh: [[4096, 0.000086], [20480, 0.000077], [Infinity, 0.000073]],
  diskEco: [[4096, 0.00005], [20480, 0.000045], [Infinity, 0.000043]],
  ip: [[Infinity, 0.0036]],
  lb: [[Infinity, 0.0308]],
  windows: [[Infinity, 0.0342]],
};

// Ağ trafiği (GB, dönem toplamı, her yön ayrı): [kademe üst sınırı, GB fiyatı]
const TRAFFIC = [[1024, 0], [4096, 0.007], [8192, 0.0065], [16384, 0.006], [32768, 0.0055], [Infinity, 0.005]];

const HOURS = [
  {h: 24, key: 'day'},
  {h: 168, key: 'week'},
  {h: 730, key: 'month'},
];

const FIELDS = [
  {key: 'vcpu', unit: 'vCore', max: 1024},
  {key: 'ram', unit: 'GB', max: 4096},
  {key: 'diskHigh', unit: 'GB', max: 512000},
  {key: 'diskEco', unit: 'GB', max: 512000},
  {key: 'ip', unit: '', max: 256},
  {key: 'lb', unit: '', max: 64},
  {key: 'windows', unit: 'VM', max: 512},
  {key: 'trafficOut', unit: 'GB', max: 10000000},
  {key: 'trafficIn', unit: 'GB', max: 10000000},
];

const T = {
  tr: {
    duration: 'Kullanım süresi',
    presets: {day: '1 gün', week: '1 hafta', month: '1 ay'},
    hours: 'saat',
    custom: 'Özel süre',
    resources: 'Kaynaklar',
    traffic: 'Ağ trafiği (seçilen süre boyunca)',
    labels: {
      vcpu: 'vCPU',
      ram: 'RAM',
      diskHigh: 'Disk High IOPS (NVMe SSD)',
      diskEco: 'Disk Economy (SAS)',
      ip: 'Public IP',
      lb: 'Load balancer',
      windows: 'Windows Server lisansı',
      trafficOut: 'Giden trafik (outbound)',
      trafficIn: 'Gelen trafik (inbound)',
    },
    units: {'': 'adet'},
    item: 'Kalem',
    qty: 'Miktar',
    hourly: 'Saatlik',
    total: (h) => `${h} saat`,
    free: 'İlk 1 TB ücretsiz',
    empty: 'Hesaplama için en az bir kaynak girin.',
    totalHourly: 'Saatlik toplam (trafik hariç)',
    totalPeriod: (h) => `${h} saatlik toplam`,
    fixed: (v) => `Aynı kaynaklar sabit kaynak modelinde aylık ${v} tutar (aylık ödeme, trafik hariç).`,
    fixedCheaper: 'Sürekli çalışacak kaynaklar için sabit kaynak modeli daha uygundur.',
    reset: 'Sıfırla',
    note: 'Hesaplanan tutarlar tahminidir ve bilgilendirme amaçlıdır. Vergiler dahil değildir. PAYG kullanımı saatlik ölçülür ve müşteri panelinizdeki PayG Hesapları bölümüne yazılır.',
  },
  en: {
    duration: 'Usage Period',
    presets: {day: '1 Day', week: '1 Week', month: '1 Month'},
    hours: 'hours',
    custom: 'Custom Period',
    resources: 'Resources',
    traffic: 'Network Traffic (During the Selected Period)',
    labels: {
      vcpu: 'vCPU',
      ram: 'RAM',
      diskHigh: 'Disk High IOPS (NVMe SSD)',
      diskEco: 'Disk Economy (SAS)',
      ip: 'Public IP',
      lb: 'Load Balancer',
      windows: 'Windows Server License',
      trafficOut: 'Outbound Traffic',
      trafficIn: 'Inbound Traffic',
    },
    units: {'': 'pcs'},
    item: 'Item',
    qty: 'Quantity',
    hourly: 'Hourly',
    total: (h) => `${h} hours`,
    free: 'First 1 TB free',
    empty: 'Enter at least one resource to calculate.',
    totalHourly: 'Hourly Total (Excluding Traffic)',
    totalPeriod: (h) => `Total for ${h} hours`,
    fixed: (v) => `The same resources cost ${v} per month with fixed resources (monthly billing, excluding traffic).`,
    fixedCheaper: 'For resources that run continuously, fixed resources are the more economical choice.',
    reset: 'Reset',
    note: 'Amounts are estimates for information only. Taxes are not included. PAYG usage is metered hourly and recorded under PayG Hesapları (PAYG Accounts) in your client area.',
  },
};

const DEFAULTS = {vcpu: '4', ram: '8', diskHigh: '80', diskEco: '0', ip: '1', lb: '0', windows: '0', trafficOut: '0', trafficIn: '0'};

// Kademeli hesap: miktarı kademelere böler, her parçayı kendi fiyatıyla çarpar.
function graduated(tiers, qty) {
  let rest = qty;
  let prev = 0;
  let sum = 0;
  for (const [limit, price] of tiers) {
    if (rest <= 0) break;
    const take = Math.min(rest, limit - prev);
    sum += take * price;
    rest -= take;
    prev = limit;
  }
  return sum;
}

export default function PaygCalculator() {
  const {i18n} = useDocusaurusContext();
  const locale = i18n.currentLocale === 'en' ? 'en' : 'tr';
  const t = T[locale];
  const nf = locale === 'en' ? 'en-US' : 'tr-TR';
  const [hours, setHours] = useState('730');
  const [values, setValues] = useState(DEFAULTS);

  const money = useMemo(() => {
    const f = new Intl.NumberFormat(nf, {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2});
    return (v) => f.format(v);
  }, [nf]);
  const small = useMemo(() => {
    const f = new Intl.NumberFormat(nf, {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 5});
    return (v) => f.format(v);
  }, [nf]);

  const h = Math.min(8760, Math.max(0, Number(hours) || 0));
  const qty = (key, max) => Math.min(max, Math.max(0, Number(values[key]) || 0));

  const rows = [];
  for (const {key, max} of FIELDS) {
    const q = qty(key, max);
    if (!q) continue;
    if (key.startsWith('traffic')) {
      rows.push({key, q, hourly: null, total: graduated(TRAFFIC, q), free: q <= 1024});
    } else {
      const perHour = graduated(HOURLY[key], q);
      rows.push({key, q, hourly: perHour, total: perHour * h});
    }
  }
  const hourlyTotal = rows.reduce((s, r) => s + (r.hourly || 0), 0);
  const periodTotal = rows.reduce((s, r) => s + r.total, 0);

  // Aynı kaynakların sabit kaynak (aylık ödeme) karşılığı
  const fixedMonthly = FIELDS.filter(({key}) => FIXED_PRICES[key]).reduce((s, {key, max}) => {
    const q = qty(key, max);
    return s + q * FIXED_PRICES[key][0] * (1 - fixedDiscount(key, q));
  }, 0);
  const paygMonthly = hourlyTotal * 730;

  const set = (key, v) => setValues((s) => ({...s, [key]: v}));
  const field = ({key, unit, max}) => (
    <label key={key} className={styles.field}>
      <span>{t.labels[key]}</span>
      <span className={styles.inputWrap}>
        <input type="number" inputMode="numeric" min="0" max={max} value={values[key]} onChange={(e) => set(key, e.target.value)} />
        <span className={styles.unit}>{unit || t.units['']}</span>
      </span>
    </label>
  );

  return (
    <div className={styles.calc}>
      <div className={styles.section}>
        <div className={styles.label}>{t.duration}</div>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.8rem', alignItems: 'center'}}>
          <div className={styles.periods} role="radiogroup" aria-label={t.duration}>
            {HOURS.map((p) => (
              <button
                key={p.h}
                type="button"
                role="radio"
                aria-checked={h === p.h}
                className={`${styles.periodBtn} ${h === p.h ? styles.active : ''}`}
                onClick={() => setHours(String(p.h))}>
                {t.presets[p.key]}
              </button>
            ))}
          </div>
          <label className={styles.field} style={{flexDirection: 'row', alignItems: 'center', gap: '0.5rem'}}>
            <span>{t.custom}</span>
            <span className={styles.inputWrap} style={{width: '9rem'}}>
              <input type="number" inputMode="numeric" min="1" max="8760" value={hours} onChange={(e) => setHours(e.target.value)} aria-label={t.custom} />
              <span className={styles.unit}>{t.hours}</span>
            </span>
          </label>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.label}>{t.resources}</div>
        <div className={styles.grid}>{FIELDS.filter((f) => !f.key.startsWith('traffic')).map(field)}</div>
      </div>

      <div className={styles.section}>
        <div className={styles.label}>{t.traffic}</div>
        <div className={styles.grid}>{FIELDS.filter((f) => f.key.startsWith('traffic')).map(field)}</div>
      </div>

      {rows.length === 0 ? (
        <p className={styles.empty}>{t.empty}</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t.item}</th>
                <th>{t.qty}</th>
                <th>{t.hourly}</th>
                <th>{t.total(h.toLocaleString(nf))}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.key}>
                  <td>{t.labels[r.key]}</td>
                  <td>{r.q.toLocaleString(nf)}</td>
                  <td>{r.hourly === null ? (r.free ? t.free : '–') : small(r.hourly)}</td>
                  <td>{money(r.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className={styles.totals}>
        <div className={styles.totalBox}>
          <span>{t.totalHourly}</span>
          <strong>{small(hourlyTotal)}</strong>
        </div>
        <div className={`${styles.totalBox} ${styles.primary}`}>
          <span>{t.totalPeriod(h.toLocaleString(nf))}</span>
          <strong>{money(periodTotal)}</strong>
        </div>
      </div>

      {fixedMonthly > 0 && (
        <p className={styles.saving}>
          {t.fixed(money(fixedMonthly))} {paygMonthly > fixedMonthly && t.fixedCheaper}
        </p>
      )}

      <div className={styles.footer}>
        <p className={styles.note}>{t.note}</p>
        <button type="button" className={styles.reset} onClick={() => { setValues(DEFAULTS); setHours('730'); }}>
          {t.reset}
        </button>
      </div>
    </div>
  );
}
