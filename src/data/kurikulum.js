/**
 * src/data/kurikulum.js
 * Satu sumber data untuk seluruh struktur kelas, bab, dan metadata kurikulum SKI.
 * Digunakan oleh: pages/index.js, theme/DocItem/Content/index.js, pages/404.js
 * 
 * PENTING: Angka tokoh dan istilah harus sinkron dengan frontmatter di docs/kelas-x/ (XI, XII)
 * Perbarui file ini setiap kali frontmatter tokoh_terkait atau istilah_kunci berubah.
 */

export const TOTAL_BAB = {
  X: 6,
  XI: 5,
  XII: 5,
};

export const KELAS_INFO = {
  X: {
    fase: 'Fase E',
    title: 'Sirah Nabawiyah & Daulah Islam Awal',
    desc: 'Mencakup periode dakwah Makkah dan Madinah, kepemimpinan Khulafaurasyidin, Daulah Umayah di Damaskus & Andalusia, hingga masa keemasan Daulah Abasiah.',
    to: '/docs/kelas-x',
    bgImage: '/img/card-kelas-x-bg.webp',
    colorTheme: 'jenjang-theme-green',
    accentColor: '#163E2B',
  },
  XI: {
    fase: 'Fase F',
    title: 'Tiga Kerajaan Besar & Masuknya Islam ke Nusantara',
    desc: 'Mempelajari kejayaan Daulah Usmani di Turki, Daulah Safawi di Persia, Daulah Mughal di India, serta jalur sejarah masuknya Islam dan peran Wali Sanga di Nusantara.',
    to: '/docs/kelas-xi',
    bgImage: '/img/card-kelas-xi-bg.webp',
    colorTheme: 'jenjang-theme-gold',
    accentColor: '#7A5C00',
  },
  XII: {
    fase: 'Fase F',
    title: 'Islam di Nusantara & Perjuangan Kemerdekaan',
    desc: 'Mengkaji kerajaan-kerajaan Islam Nusantara, peran ulama awal dan pesantren, organisasi pergerakan Islam, perjuangan kemerdekaan, hingga tokoh pascakemerdekaan.',
    to: '/docs/kelas-xii',
    bgImage: '/img/card-kelas-xii-bg.webp',
    colorTheme: 'jenjang-theme-maroon',
    accentColor: '#7A1A22',
  },
};

/**
 * Data bab per kelas — sinkron dengan frontmatter docs/kelas-x/ (XI, XII)
 * tokoh: jumlah item di tokoh_terkait
 * istilah: jumlah item di istilah_kunci
 */
export const BAB_DATA = {
  X: [
    { nomor: 1, slug: 'bab-1-makkah',           judul: 'Perkembangan Islam Masa Rasulullah Saw. Periode Makkah',         tokoh: 6, istilah: 7 },
    { nomor: 2, slug: 'bab-2-madinah',          judul: 'Perkembangan Islam Masa Rasulullah Saw. Periode Madinah',        tokoh: 6, istilah: 6 },
    { nomor: 3, slug: 'bab-3-khulafaurasyidin', judul: 'Perkembangan Islam Masa Khulafaurasyidin',                       tokoh: 6, istilah: 8 },
    { nomor: 4, slug: 'bab-4-umayah-damaskus',  judul: 'Perkembangan Islam Masa Daulah Umayah di Damaskus',             tokoh: 5, istilah: 8 },
    { nomor: 5, slug: 'bab-5-umayah-andalusia', judul: 'Perkembangan Islam Masa Daulah Umayah di Andalusia',            tokoh: 6, istilah: 6 },
    { nomor: 6, slug: 'bab-6-abasiah',          judul: 'Perkembangan Islam Masa Daulah Abasiah',                        tokoh: 7, istilah: 6 },
  ],
  XI: [
    { nomor: 1, slug: 'bab-1-usmani',                      judul: 'Perkembangan Peradaban dan Ilmu Pengetahuan Islam pada Masa Daulah Usmani',      tokoh: 6, istilah: 6 },
    { nomor: 2, slug: 'bab-2-safawi',                      judul: 'Perkembangan Peradaban dan Ilmu Pengetahuan Islam pada Masa Daulah Safawi',      tokoh: 5, istilah: 6 },
    { nomor: 3, slug: 'bab-3-mughal',                      judul: 'Perkembangan Peradaban dan Ilmu Pengetahuan Islam pada Masa Daulah Mughal',      tokoh: 5, istilah: 5 },
    { nomor: 4, slug: 'bab-4-masuknya-islam-indonesia',    judul: 'Menelusuri Jejak Sejarah Masuknya Islam ke Indonesia',                           tokoh: 4, istilah: 6 },
    { nomor: 5, slug: 'bab-5-wali-sanga',                  judul: 'Peran Wali Sanga dalam Penyebaran Islam di Indonesia',                          tokoh: 9, istilah: 5 },
  ],
  XII: [
    { nomor: 1, slug: 'bab-1-kerajaan-nusantara',  judul: 'Kerajaan Islam Nusantara',                                                         tokoh: 6, istilah: 7 },
    { nomor: 2, slug: 'bab-2-ulama-awal',          judul: 'Peran Ulama Awal Nusantara Prakemerdekaan',                                        tokoh: 6, istilah: 4 },
    { nomor: 3, slug: 'bab-3-organisasi-islam',    judul: 'Kontribusi Umat Islam Prakemerdekaan melalui Organisasi Berbasis Islam',            tokoh: 7, istilah: 9 },
    { nomor: 4, slug: 'bab-4-kemerdekaan',         judul: 'Peran Umat Islam Masa Kemerdekaan dan Pascakemerdekaan',                           tokoh: 5, istilah: 5 },
    { nomor: 5, slug: 'bab-5-tokoh-berpengaruh',   judul: 'Tokoh Islam Nusantara Paling Berpengaruh Pascakemerdekaan RI',                     tokoh: 5, istilah: 3 },
  ],
};
