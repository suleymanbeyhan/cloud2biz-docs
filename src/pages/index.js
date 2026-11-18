import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import SearchBar from '@theme/SearchBar';
import {HeroCloud, HeroDocs} from '@site/src/components/HeroIllustration';
import styles from './index.module.css';

const TEXT = {
  tr: {
    title: 'Cloud2Biz Docs',
    subtitle: 'İhtiyacınız olan yardımı rehberlerimiz ve dokümantasyonumuzda bulun.',
    search: 'Ara',
    section: 'Platform seçin ve cevabınızı bulun',
    cards: [
      {title: 'Genel', desc: 'Cloud2Biz hesabı, müşteri paneli ve genel konular hakkında bilgiler', to: '/docs/intro'},
      {title: 'FlexoStack Cloud', desc: 'Esnek bulut: sanal sunucular, ağ, depolama, Kubernetes, faturalandırma ve API', to: '/docs/flexostack-cloud/genel-bakis'},
      {title: 'Object Storage', desc: 'S3 uyumlu nesne depolama: kullanım, SSS ve en iyi uygulamalar', to: '/docs/object-storage/genel-bakis'},
    ],
  },
  en: {
    title: 'Cloud2Biz Docs',
    subtitle: 'Find the help you need in our guides and documentation.',
    search: 'Search',
    section: 'Select a platform and find your answer',
    cards: [
      {title: 'General', desc: 'Information on your Cloud2Biz account, client area and general topics', to: '/docs/intro'},
      {title: 'FlexoStack Cloud', desc: 'Flexible cloud: virtual servers, networking, storage, Kubernetes, billing and API', to: '/docs/flexostack-cloud/genel-bakis'},
      {title: 'Object Storage', desc: 'S3-compatible object storage: usage, FAQ and best practices', to: '/docs/object-storage/genel-bakis'},
    ],
  },
};

export default function Home() {
  const {i18n} = useDocusaurusContext();
  const t = TEXT[i18n.currentLocale] ?? TEXT.tr;
  const history = useHistory();
  const searchPage = useBaseUrl('/search');

  const goSearch = (e) => {
    e.preventDefault();
    const input = document.querySelector('.hero-searchbox input');
    const q = (input?.value || '').trim();
    if (q) history.push(`${searchPage}?q=${encodeURIComponent(q)}`);
    else input?.focus();
  };

  return (
    <Layout title={t.title} description={t.subtitle}>
      <header className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true">
          <HeroDocs className={styles.artLeft} />
          <HeroCloud className={styles.artRight} />
        </div>
        <div className={styles.heroInner}>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
          <form className={styles.searchRow} onSubmit={goSearch} role="search">
            <div className={`hero-searchbox ${styles.searchBox}`}>
              <SearchBar />
            </div>
            <button type="submit" className={styles.searchBtn}>
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path fill="currentColor" d="M10 2a8 8 0 0 1 6.32 12.9l5.39 5.4-1.41 1.4-5.4-5.39A8 8 0 1 1 10 2Zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z" />
              </svg>
              {t.search}
            </button>
          </form>
        </div>
      </header>

      <main className={styles.page}>
        <h2 className={styles.section}>{t.section}</h2>
        <div className={styles.grid}>
          {t.cards.map((c) => (
            <Link key={c.to} to={c.to} className={styles.card}>
              <h3>
                {c.title}
                <span className={styles.chevron} aria-hidden="true" />
              </h3>
              <p>{c.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}
