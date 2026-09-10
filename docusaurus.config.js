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
        },
        blog: false, // Blog dinonaktifkan sesuai PRD Phase 1 (fokus materi SKI)
        theme: {
          customCss: './src/css/custom.css',
        },
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
            title: 'Materi Pembelajaran',
            items: [
              {
                label: 'Panduan & Pengantar',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Tentang',
            items: [
              {
                label: 'MAN 2 Nganjuk',
                href: 'https://man2nganjuk.sch.id',
              },
              {
                label: 'Repositori Proyek',
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
