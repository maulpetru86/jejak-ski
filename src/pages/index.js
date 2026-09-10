import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  const classList = [
    {
      kelas: 'Kelas X',
      badge: 'Fase E — Kelas X',
      count: '6 Bab Lengkap',
      title: 'Sirah Nabawiyah & Daulah Islam Awal',
      desc: 'Mencakup periode dakwah Makkah dan Madinah, kepemimpinan Khulafaurasyidin, Daulah Umayah di Damaskus & Andalusia, hingga puncak Daulah Abasiah.',
      to: '/docs/kelas-x/bab-1-makkah',
      firstChapter: 'Bab 1: Periode Makkah',
    },
    {
      kelas: 'Kelas XI',
      badge: 'Fase F — Kelas XI',
      count: '5 Bab Lengkap',
      title: 'Tiga Daulah Besar & Islam Nusantara',
      desc: 'Mempelajari kejayaan Daulah Usmani di Turki, Daulah Safawi di Persia, Daulah Mughal di India, serta jalur sejarah masuknya Islam dan peran Wali Sanga di Nusantara.',
      to: '/docs/kelas-xi/bab-1-usmani',
      firstChapter: 'Bab 1: Daulah Usmani',
    },
    {
      kelas: 'Kelas XII',
      badge: 'Fase F — Kelas XII',
      count: '5 Bab Lengkap',
      title: 'Kerajaan Nusantara hingga Tokoh Bangsa',
      desc: 'Mengkaji kerajaan-kerajaan Islam Nusantara, peran ulama awal dan pesantren, organisasi Islam pergerakan, perjuangan kemerdekaan RI, serta pemikiran tokoh pascakemerdekaan.',
      to: '/docs/kelas-xii/bab-1-kerajaan-nusantara',
      firstChapter: 'Bab 1: Kerajaan Nusantara',
    },
  ];

  return (
    <Layout
      title={`${siteConfig.title} | Portal Referensi SKI MA`}
      description="Portal referensi rangkuman materi Sejarah Kebudayaan Islam resmi untuk siswa Madrasah Aliyah Kelas X, XI, dan XII.">
      {/* Hero Section */}
      <header className="ski-hero">
        <div className="container">
          <span className="ski-hero-badge">Portal Referensi Siswa MA</span>
          <h1 className="ski-hero-title">Jejak SKI</h1>
          <p className="ski-hero-subtitle">
            Rangkuman poin-poin kunci materi Sejarah Kebudayaan Islam (SKI) Madrasah Aliyah,
            disusun terstruktur mengikuti urutan buku cetak resmi Kementerian Agama Republik Indonesia.
          </p>

          <div className="ski-features-pills">
            <span className="ski-feature-pill">📖 Urutan Sesuai Buku Siswa</span>
            <span className="ski-feature-pill">⚡ Ringkasan Poin Kunci</span>
            <span className="ski-feature-pill">📱 Optimal untuk Ponsel</span>
            <span className="ski-feature-pill">🔍 Temu Materi Cepat</span>
          </div>
        </div>
      </header>

      {/* Main Content: Class Selector (FR-01) */}
      <main className="container ski-classes-section">
        <div className="ski-section-heading">
          <h2>Pilih Jenjang Kelas</h2>
          <p>Akses langsung daftar rangkuman bab sesuai jenjang kelas Anda dalam maksimal 3 ketukan:</p>
        </div>

        <div className="ski-card-grid">
          {classList.map((item, idx) => (
            <div key={idx} className="ski-class-card">
              <span className="ski-class-badge">{item.badge}</span>
              <h3 className="ski-class-title">{item.kelas}</h3>
              <div className="ski-class-count">{item.count}</div>
              <p className="ski-class-desc">{item.desc}</p>
              <Link className="button ski-class-btn" to={item.to}>
                Buka {item.kelas} ({item.firstChapter}) →
              </Link>
            </div>
          ))}
        </div>

        {/* Informative Note Box */}
        <div className="chapter-disclaimer-box margin-top--lg">
          <div className="chapter-disclaimer-header">
            <span className="chapter-disclaimer-icon">🏛️</span>
            <strong>Tentang Portal Jejak SKI — MAN 2 Nganjuk</strong>
          </div>
          <p className="chapter-disclaimer-text">
            Portal ini dikembangkan untuk memudahkan para siswa dalam mengulang materi pembelajaran di luar jam sekolah,
            persiapan asesmen harian, dan ujian madrasah. Materi bersifat ringkasan intisari dan tidak menggantikan kajian mendalam
            dari buku teks resmi Kementerian Agama Republik Indonesia.
          </p>
        </div>
      </main>
    </Layout>
  );
}
