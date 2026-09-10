// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Jejak SKI',
  tagline: 'Portal Referensi Materi Sejarah Kebudayaan Islam Madrasah Aliyah',
  favicon: 'img/favicon.ico',

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
      }),
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
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
            label: 'Materi Pembelajaran',
          },
          {
            to: '/docs/kelas-x/bab-1-makkah',
            label: 'Kelas X',
            position: 'left',
          },
          {
            to: '/docs/kelas-xi/bab-1-usmani',
            label: 'Kelas XI',
            position: 'left',
          },
          {
            to: '/docs/kelas-xii/bab-1-kerajaan-nusantara',
            label: 'Kelas XII',
            position: 'left',
          },
          {
            type: 'search',
            position: 'right',
          },
          {
            href: 'https://github.com/maulpetru86/jejak-ski',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Materi SKI per Jenjang',
            items: [
              {
                label: 'Kelas X (6 Bab)',
                to: '/docs/kelas-x/bab-1-makkah',
              },
              {
                label: 'Kelas XI (5 Bab)',
                to: '/docs/kelas-xi/bab-1-usmani',
              },
              {
                label: 'Kelas XII (5 Bab)',
                to: '/docs/kelas-xii/bab-1-kerajaan-nusantara',
              },
            ],
          },
          {
            title: 'Tentang & Kontak',
            items: [
              {
                label: 'MAN 2 Nganjuk',
                href: 'https://man2nganjuk.sch.id',
              },
              {
                label: 'Repositori GitHub',
                href: 'https://github.com/maulpetru86/jejak-ski',
              },
            ],
          },
        ],
        copyright: `Hak Cipta © ${new Date().getFullYear()} Jejak SKI — MAN 2 Nganjuk. Disusun untuk keperluan pembelajaran siswa.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
