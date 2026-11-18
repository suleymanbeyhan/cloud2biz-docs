import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HeroSearch from '@site/src/components/HeroSearch';
import {HeroCloud, HeroDocs} from '@site/src/components/HeroIllustration';
import styles from './index.module.css';

const TEXT = {
  tr: {
    title: 'Cloud2Biz Docs',
    subtitle: 'İhtiyacınız olan yardımı rehberlerimiz ve dokümantasyonumuzda bulun.',
    section: 'Platform Seçin ve Cevabınızı Bulun',
    cards: [
      {title: 'Genel', desc: 'Cloud2Biz hesabı, müşteri paneli ve genel konular hakkında bilgiler', to: '/docs/intro'},
      {title: 'FlexoStack Cloud', desc: 'Esnek bulut: sanal sunucular, ağ, depolama, Kubernetes, faturalandırma ve API', to: '/docs/flexostack-cloud'},
      {title: 'Object Storage', desc: 'S3 uyumlu nesne depolama: kullanım, SSS ve en iyi uygulamalar', to: '/docs/object-storage'},
    ],
  },
  en: {
    title: 'Cloud2Biz Docs',
    subtitle: 'Find the help you need in our guides and documentation.',
    section: 'Select a Platform and Find Your Answer',
    cards: [
      {title: 'General', desc: 'Information on your Cloud2Biz account, client area and general topics', to: '/docs/intro'},
      {title: 'FlexoStack Cloud', desc: 'Flexible cloud: virtual servers, networking, storage, Kubernetes, billing and API', to: '/docs/flexostack-cloud'},
      {title: 'Object Storage', desc: 'S3-compatible object storage: usage, FAQ and best practices', to: '/docs/object-storage'},
    ],
  },
};

export default function Home() {
  const {i18n} = useDocusaurusContext();
  const t = TEXT[i18n.currentLocale] ?? TEXT.tr;
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
          <HeroSearch />
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
