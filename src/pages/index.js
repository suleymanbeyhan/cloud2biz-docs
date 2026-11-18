import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import SearchBar from '@theme/SearchBar';
import styles from './index.module.css';

const TEXT = {
  tr: {
    title: 'Cloud2Biz Dokümantasyon',
    subtitle: 'Ürünlerimiz için kurulum rehberleri, sıkça sorulan sorular ve teknik makaleler.',
    cards: [
      {title: 'Başlarken', desc: 'Cloud2Biz dokümantasyonuna genel bakış.', to: '/docs/intro'},
      {title: 'FlexoStack Cloud', desc: 'Esnek bulut altyapısı: sanal sunucular, kaynak yönetimi ve PAYG modeli.', to: '/docs/flexostack-cloud/genel-bakis'},
      {title: 'Object Storage', desc: 'S3 uyumlu nesne depolama: kullanım, SSS ve en iyi uygulamalar.', to: '/docs/object-storage/genel-bakis'},
      {title: 'Blog', desc: 'Bulut, sunucu ve depolama üzerine güncel yazılar.', to: '/blog'},
    ],
  },
  en: {
    title: 'Cloud2Biz Documentation',
    subtitle: 'Setup guides, frequently asked questions and technical articles for our products.',
    cards: [
      {title: 'Getting Started', desc: 'An overview of the Cloud2Biz documentation.', to: '/docs/intro'},
      {title: 'FlexoStack Cloud', desc: 'Flexible cloud infrastructure: virtual servers, resource management and PAYG.', to: '/docs/flexostack-cloud/genel-bakis'},
      {title: 'Object Storage', desc: 'S3-compatible object storage: usage, FAQ and best practices.', to: '/docs/object-storage/genel-bakis'},
      {title: 'Blog', desc: 'Latest articles on cloud, servers and storage.', to: '/blog'},
    ],
  },
};

export default function Home() {
  const {i18n} = useDocusaurusContext();
  const t = TEXT[i18n.currentLocale] ?? TEXT.tr;
  return (
    <Layout title={t.title} description={t.subtitle}>
      <main className={styles.page}>
        <div className={styles.hero}>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
          <div className="hero-search"><SearchBar /></div>
        </div>
        <div className={styles.grid}>
          {t.cards.map((c) => (
            <Link key={c.to} to={c.to} className={styles.card}>
              <h2>{c.title}</h2>
              <p>{c.desc}</p>
              <span className={styles.arrow}>→</span>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}
