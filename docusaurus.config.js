// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Cloud2Biz Docs',
  tagline: 'Bulut altyapısı rehberleri ve dokümantasyon',
  favicon: 'img/favicon.png',

  url: 'https://docs.cloud2biz.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',

  headTags: [
    {tagName: 'meta', attributes: {name: 'theme-color', content: '#000000'}},
  ],

  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en'],
    localeConfigs: {
      tr: {label: 'Türkçe'},
      en: {label: 'English'},
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {customCss: './src/css/custom.css'},
      }),
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['tr', 'en'],
        indexBlog: false,
        indexDocs: true,
        highlightSearchTermsOnTargetPage: true,
        searchBarShortcutHint: false,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo.png',
      colorMode: {defaultMode: 'light', disableSwitch: true, respectPrefersColorScheme: false},
      navbar: {
        style: 'dark',
        title: 'Docs',
        logo: {
          alt: 'Cloud2Biz',
          src: 'img/logo.png',
          href: '/',
        },
        items: [
          {
            type: 'dropdown',
            label: 'Platform seçin',
            position: 'left',
            items: [
              {label: 'Genel', to: '/docs/intro'},
              {label: 'FlexoStack Cloud', to: '/docs/flexostack-cloud/genel-bakis'},
              {label: 'Object Storage', to: '/docs/object-storage/genel-bakis'},
            ],
          },
          {href: 'https://cloud2biz.com', label: 'cloud2biz.com', position: 'right'},
          {type: 'localeDropdown', position: 'right'},
        ],
      },
      tableOfContents: {minHeadingLevel: 2, maxHeadingLevel: 4},
      footer: {
        style: 'dark',
        logo: {alt: 'Cloud2Biz', src: 'img/logo.png', href: 'https://cloud2biz.com', height: 40},
        links: [
          {
            title: 'Cloud2Biz',
            items: [
              {label: 'Ana Sayfa', href: 'https://cloud2biz.com'},
              {label: 'FlexoStack', href: 'https://cloud2biz.com/flexostack'},
              {label: 'BizPaaS', href: 'https://cloud2biz.com/bizpaas'},
              {label: 'İletişim', href: 'https://cloud2biz.com/iletisim'},
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Cloud2Biz. Tüm hakları saklıdır.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'nginx', 'yaml', 'json'],
      },
    }),
};

export default config;
