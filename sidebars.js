// @ts-check

/**
 * Konfigurasi Sidebar Jejak SKI
 * Sesuai PRD §5 & Lampiran A: Mengikuti urutan buku resmi Kemenag (bukan ATP)
 * 
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  skiSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Kelas X',
      link: {
        type: 'doc',
        id: 'kelas-x/index',
      },
      collapsed: true,
      items: [
        'kelas-x/bab-1-makkah',
        'kelas-x/bab-2-madinah',
        'kelas-x/bab-3-khulafaurasyidin',
        'kelas-x/bab-4-umayah-damaskus',
        'kelas-x/bab-5-umayah-andalusia',
        'kelas-x/bab-6-abasiah',
      ],
    },
    {
      type: 'category',
      label: 'Kelas XI',
      link: {
        type: 'doc',
        id: 'kelas-xi/index',
      },
      collapsed: true,
      items: [
        'kelas-xi/bab-1-usmani',
        'kelas-xi/bab-2-safawi',
        'kelas-xi/bab-3-mughal',
        'kelas-xi/bab-4-masuknya-islam-indonesia',
        'kelas-xi/bab-5-wali-sanga',
      ],
    },
    {
      type: 'category',
      label: 'Kelas XII',
      link: {
        type: 'doc',
        id: 'kelas-xii/index',
      },
      collapsed: true,
      items: [
        'kelas-xii/bab-1-kerajaan-nusantara',
        'kelas-xii/bab-2-ulama-awal',
        'kelas-xii/bab-3-organisasi-islam',
        'kelas-xii/bab-4-kemerdekaan',
        'kelas-xii/bab-5-tokoh-berpengaruh',
      ],
    },
  ],
};

export default sidebars;
