import {useMemo, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

/*
 * FlexoStack sabit kaynak birim fiyatları (USD, aylık birim fiyat).
 * Sıra: [aylık, 6 ay peşin, 12 ay peşin]
 * Fiyatlar değiştiğinde yalnızca bu tabloyu güncelleyin.
 */
const PRICES = {
  vcpu: [1.8, 1.71, 1.62],
  ram: [1.8, 1.71, 1.62],
  diskHigh: [0.048, 0.0456, 0.0432],
  diskEco: [0.028, 0.0266, 0.0252],
  ip: [2, 1.9, 1.8],
  lb: [15, 15, 15],
  windows: [25, 25, 25],
  backupGb: [0.1, 0.095, 0.09],
};

// Miktar indirimleri: [eşik, oran]; miktar eşiğe ulaştığında oran tüm miktara uygulanır.
const TIERS = {
  vcpu: [[33, 0.15], [9, 0.1]],
  ram: [[65, 0.15], [33, 0.1]],
  diskHigh: [[20480, 0.15], [4097, 0.1]],
  diskEco: [[20480, 0.15], [4097, 0.1]],
  backupGb: [[20480, 0.15], [4097, 0.1]],
};

const PERIODS = [1, 6, 12];

const FIELDS = [
  {key: 'vcpu', unit: 'vCore', max: 1024, step: 1},
  {key: 'ram', unit: 'GB', max: 4096, step: 1},
  {key: 'diskHigh', unit: 'GB', max: 512000, step: 10},
  {key: 'diskEco', unit: 'GB', max: 512000, step: 10},
  {key: 'ip', unit: '', max: 256, step: 1},
  {key: 'lb', unit: '', max: 64, step: 1},
  {key: 'windows', unit: 'VM', max: 512, step: 1},
  {key: 'backupGb', unit: 'GB', max: 512000, step: 10},
];

const T = {
  tr: {
    period: 'Ödeme dönemi',
    periods: {1: 'Aylık', 6: '6 ay peşin', 12: '12 ay peşin'},
    resources: 'Kaynaklar',
    labels: {
      vcpu: 'vCPU',
      ram: 'RAM',
      diskHigh: 'Disk High IOPS (NVMe SSD)',
      diskEco: 'Disk Economy (SAS)',
      ip: 'Public IP',
      lb: 'Load balancer',
      windows: 'Windows Server lisansı',
      backupGb: 'Acronis yedekleme (GB bazlı)',
    },
    units: {'': 'adet'},
    item: 'Kalem',
    qty: 'Miktar',
    unitPrice: 'Birim fiyat',
    discount: 'İndirim',
    monthly: 'Aylık tutar',
    empty: 'Hesaplama için en az bir kaynak girin.',
    totalMonthly: 'Aylık toplam',
    totalPeriod: (m) => `${m} aylık dönem toplamı`,
    saving: (v) => `Aylık ödemeye göre bu dönemde ${v} tasarruf`,
    reset: 'Sıfırla',
    note: 'Hesaplanan tutarlar tahminidir ve bilgilendirme amaçlıdır. Vergiler, ağ trafiği ve diğer hizmetler dahil değildir. Kesin tutar için sipariş ekranını esas alın.',
  },
  en: {
    period: 'Billing period',
    periods: {1: 'Monthly', 6: '6 months prepaid', 12: '12 months prepaid'},
    resources: 'Resources',
    labels: {
      vcpu: 'vCPU',
      ram: 'RAM',
      diskHigh: 'Disk High IOPS (NVMe SSD)',
      diskEco: 'Disk Economy (SAS)',
      ip: 'Public IP',
      lb: 'Load balancer',
      windows: 'Windows Server license',
      backupGb: 'Acronis backup (per GB)',
    },
    units: {'': 'pcs'},
    item: 'Item',
    qty: 'Quantity',
    unitPrice: 'Unit price',
    discount: 'Discount',
    monthly: 'Monthly',
    empty: 'Enter at least one resource to calculate.',
    totalMonthly: 'Monthly total',
    totalPeriod: (m) => `${m}-month period total`,
    saving: (v) => `${v} saved in this period compared to monthly billing`,
    reset: 'Reset',
    note: 'Amounts are estimates for information only. Taxes, network traffic and other services are not included. The order screen is authoritative.',
  },
};

const DEFAULTS = {vcpu: '4', ram: '8', diskHigh: '80', diskEco: '0', ip: '1', lb: '0', windows: '0', backupGb: '0'};

function discountFor(key, qty) {
  for (const [min, rate] of TIERS[key] || []) if (qty >= min) return rate;
  return 0;
}

export default function FixedPriceCalculator() {
  const {i18n} = useDocusaurusContext();
  const locale = i18n.currentLocale === 'en' ? 'en' : 'tr';
  const t = T[locale];
  const [period, setPeriod] = useState(1);
  const [values, setValues] = useState(DEFAULTS);

  const money = useMemo(() => {
    const f = new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'tr-TR', {
      style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
    });
    return (v) => f.format(v);
  }, [locale]);
  const unitFmt = useMemo(() => new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 4}), [locale]);

  const idx = PERIODS.indexOf(period);

  const calc = (pIdx) => FIELDS.map(({key}) => {
    const qty = Math.max(0, Number(values[key]) || 0);
    const unit = PRICES[key][pIdx];
    const rate = discountFor(key, qty);
    return {key, qty, unit, rate, total: qty * unit * (1 - rate)};
  }).filter((r) => r.qty > 0);

  const rows = calc(idx);
  const monthlyTotal = rows.reduce((s, r) => s + r.total, 0);
  const periodTotal = monthlyTotal * period;
  const baseline = calc(0).reduce((s, r) => s + r.total, 0) * period;
  const saving = baseline - periodTotal;

  const set = (key, v) => setValues((s) => ({...s, [key]: v}));

  return (
    <div className={styles.calc}>
      <div className={styles.section}>
        <div className={styles.label}>{t.period}</div>
        <div className={styles.periods} role="radiogroup" aria-label={t.period}>
          {PERIODS.map((p) => (
            <button
              key={p}
              type="button"
              role="radio"
              aria-checked={period === p}
              className={`${styles.periodBtn} ${period === p ? styles.active : ''}`}
              onClick={() => setPeriod(p)}>
              {t.periods[p]}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.label}>{t.resources}</div>
        <div className={styles.grid}>
          {FIELDS.map(({key, unit, max, step}) => (
            <label key={key} className={styles.field}>
              <span>{t.labels[key]}</span>
              <span className={styles.inputWrap}>
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max={max}
                  step={step}
                  value={values[key]}
                  onChange={(e) => set(key, e.target.value)}
                />
                <span className={styles.unit}>{unit || t.units['']}</span>
              </span>
            </label>
          ))}
        </div>
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
                <th>{t.unitPrice}</th>
                <th>{t.discount}</th>
                <th>{t.monthly}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.key}>
                  <td>{t.labels[r.key]}</td>
                  <td>{unitFmt.format(r.qty)}</td>
                  <td>${unitFmt.format(r.unit)}</td>
                  <td>{r.rate ? (locale === 'en' ? `${Math.round(r.rate * 100)}%` : `%${Math.round(r.rate * 100)}`) : '–'}</td>
                  <td>{money(r.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className={styles.totals}>
        <div className={styles.totalBox}>
          <span>{t.totalMonthly}</span>
          <strong>{money(monthlyTotal)}</strong>
        </div>
        <div className={`${styles.totalBox} ${styles.primary}`}>
          <span>{t.totalPeriod(period)}</span>
          <strong>{money(periodTotal)}</strong>
        </div>
      </div>

      {saving > 0.005 && <p className={styles.saving}>{t.saving(money(saving))}</p>}

      <div className={styles.footer}>
        <p className={styles.note}>{t.note}</p>
        <button type="button" className={styles.reset} onClick={() => { setValues(DEFAULTS); setPeriod(1); }}>
          {t.reset}
        </button>
      </div>
    </div>
  );
}
