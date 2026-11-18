import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

/*
 * Platform ana sayfası (Hetzner Docs "Cloud" sayfası gibi): kenar çubuğundaki her
 * kategori bir kart olur, kartta ilk birkaç sayfa ve "Tümünü gör" bağlantısı listelenir.
 * İçerik kenar çubuğundan otomatik üretilir; yeni sayfa eklendiğinde kendiliğinden güncellenir.
 */
const T = {
  tr: {general: 'Genel', more: 'Tümünü Gör'},
  en: {general: 'General', more: 'View More'},
};
const LIMIT = 5;

function hrefOf(item) {
  if (item.href) return item.href;
  if (item.items) for (const c of item.items) {
    const h = hrefOf(c);
    if (h) return h;
  }
  return null;
}

export default function PlatformOverview() {
  const sidebar = useDocsSidebar();
  const {i18n} = useDocusaurusContext();
  const t = T[i18n.currentLocale === 'en' ? 'en' : 'tr'];
  if (!sidebar) return null;

  const visible = sidebar.items.filter((i) => !(i.className || '').includes('sidebar-hidden'));
  const loose = visible.filter((i) => i.type !== 'category');
  const cards = [];
  if (loose.length) cards.push({label: t.general, items: loose, href: null});
  for (const c of visible.filter((i) => i.type === 'category')) cards.push({label: c.label, items: c.items, href: hrefOf(c)});

  return (
    <div className={styles.grid}>
      {cards.map((card) => {
        const links = card.items.filter((i) => !(i.className || '').includes('sidebar-hidden'));
        return (
          <div key={card.label} className={styles.card}>
            <h2 className={styles.title}>
              {card.href ? <Link to={card.href}>{card.label}</Link> : card.label}
            </h2>
            <ul className={styles.list}>
              {links.slice(0, LIMIT).map((i) => {
                const h = hrefOf(i);
                return <li key={i.label}>{h ? <Link to={h}>{i.label}</Link> : i.label}</li>;
              })}
            </ul>
            {card.href && (
              <Link to={card.href} className={styles.more}>
                {t.more}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
