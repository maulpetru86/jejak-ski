// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Jejak SKI',
  tagline: 'Portal Referensi Terbuka Sejarah Kebudayaan Islam Siswa Madrasah Aliyah',
  favicon: 'img/favicon.svg',

  // URL deployment Firebase Hosting
  url: 'https://jejak-ski.web.app',
  baseUrl: '/',

  organizationName: 'maulpetru86',
  projectName: 'jejak-ski',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'id',
    locales: ['id'],
  },

  clientModules: [
    './src/clientModules/gtagFix.js',
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs',
          breadcrumbs: true,
        },
        blog: false, // Blog dinonaktifkan sesuai PRD Phase 1 (fokus materi SKI)
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: process.env.NODE_ENV === 'production' ? {
          trackingID: 'G-GR5KG10DK7', // Firebase Analytics Measurement ID
          anonymizeIP: true,           // NFR-05: Anonimkan IP pengunjung tanpa PII
        } : undefined,
      }),
    ],
  ],

  themes: [
    [
      // @ts-ignore -- docusaurus-search-local non-standard theme tuple
      '@easyops-cn/docusaurus-search-local',
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      // @ts-ignore -- PluginOptions index signature mismatch
      ({
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: '/docs',
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        searchBarShortcut: true,
        searchBarShortcutHint: true,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Jejak SKI',
        logo: {
          alt: 'Logo Jejak SKI',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'skiSidebar',
            position: 'left',
            label: 'Materi',
          },
          {
            to: '/docs/kelas-x/',
            label: 'Kelas X',
            position: 'left',
          },
          {
            to: '/docs/kelas-xi/',
            label: 'Kelas XI',
            position: 'left',
          },
          {
            to: '/docs/kelas-xii/',
            label: 'Kelas XII',
            position: 'left',
          },
          {
            to: '/tentang',
            label: 'Tentang',
            position: 'right',
          },
          {
            type: 'search',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: ' ',
            items: [
              {
                html: '<div class="footer-brand-col"><div class="footer-brand"><img src="/img/logo.svg" alt="Jejak SKI" class="footer-brand-logo" /><span class="footer-brand-title">Jejak <span class="footer-brand-accent">SKI</span></span></div><p class="footer-tagline">Portal referensi terbuka Sejarah Kebudayaan Islam untuk siswa Madrasah Aliyah. Mengacu pada buku teks resmi Kementerian Agama RI.</p></div>',
              },
            ],
          },
          {
            title: 'Navigasi',
            items: [
              { label: 'Beranda', to: '/' },
              { label: 'Semua Materi', to: '/docs/intro' },
              { label: 'Kelas X', to: '/docs/kelas-x/' },
              { label: 'Kelas XI', to: '/docs/kelas-xi/' },
              { label: 'Kelas XII', to: '/docs/kelas-xii/' },
            ],
          },
          {
            title: 'Informasi',
            items: [
              { label: 'Tentang Jejak SKI', to: '/tentang' },
              {
                label: 'Laporkan Koreksi',
                href: 'https://github.com/maulpetru86/jejak-ski/issues',
              },
              {
                html: '<a href="https://github.com/maulpetru86/jejak-ski" target="_blank" rel="noopener noreferrer" class="footer__link-item footer-github-link"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>Kode Sumber</a>',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Jejak SKI · Diinisiasi oleh MAN 2 Nganjuk · Materi mengacu pada buku SKI Kemenag RI (KMA 1503/2025)`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
