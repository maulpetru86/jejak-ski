import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

// SVG Icons untuk 4 Pilar "Mengapa Jejak SKI" (Bebas Emoji)
function BookIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="9" y1="7" x2="16" y2="7" />
      <line x1="9" y1="11" x2="14" y2="11" />
    </svg>
  );
}

function KeyPointsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <polygon points="12 3 14.8 9 21.2 9.5 16.3 14 17.8 20.3 12 17 6.2 20.3 7.7 14 2.8 9.5 9.2 9" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}

function MobileIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
    </svg>
  );
}

function SearchQuickIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

// Islamic ornament icon for Jenjang cards
function IslamicOrnamentIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Outer arch shape */}
      <path d="M20 2 C20 2, 36 12, 36 22 C36 30, 29 36, 20 36 C11 36, 4 30, 4 22 C4 12, 20 2, 20 2Z"
        fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      {/* Inner geometric star */}
      <path d="M20 8 L22.5 15 L30 15 L24 19.5 L26 27 L20 23 L14 27 L16 19.5 L10 15 L17.5 15 Z"
        fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.8" />
      {/* Center circle */}
      <circle cx="20" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1" />
      {/* Crescent */}
      <circle cx="20" cy="18" r="2" fill="currentColor" fillOpacity="0.3" />
      <circle cx="21" cy="17.2" r="1.6" fill="currentColor" fillOpacity="0" stroke="none" />
    </svg>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  // State untuk Lanjutkan Belajar (null saat pertama kali kunjungan, baru muncul setelah ada riwayat baca)
  const [continueState, setContinueState] = useState(null);

  useEffect(() => {
    // Sinkronisasi data progress terakhir dari localStorage jika tersedia
    const syncProgress = () => {
      try {
        const saved = localStorage.getItem('jejak_ski_continue_learning');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.title && parsed.to) {
            setContinueState(parsed);
          }
        }
      } catch (e) {
        // Abaikan bila localStorage dinonaktifkan di browser
      }
    };

    syncProgress();
    window.addEventListener('storage', syncProgress);
    window.addEventListener('focus', syncProgress);

    return () => {
      window.removeEventListener('storage', syncProgress);
      window.removeEventListener('focus', syncProgress);
    };
  }, []);

  const handleSearchClick = () => {
    const searchInput = document.querySelector('.navbar__search-input');
    if (searchInput) {
      searchInput.focus();
      searchInput.click();
    } else {
      document.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'k',
        code: 'KeyK',
        ctrlKey: true,
        bubbles: true,
      }));
    }
  };

  const jenjangList = [
    {
      id: 'kelas-x',
      kelas: 'Kelas X',
      fase: 'Fase E',
      title: 'Sirah Nabawiyah & Daulah Islam Awal',
      meta: '6 Bab · 1–2 Semester',
      desc: 'Mencakup periode dakwah Makkah dan Madinah, kepemimpinan Khulafaurasyidin, Daulah Umayah di Damaskus & Andalusia, hingga masa keemasan Daulah Abasiah.',
      to: '/docs/kelas-x/',
      bgImage: '/img/card-kelas-x-bg.png',
      colorTheme: 'jenjang-theme-green',
      accentColor: '#163E2B',
    },
    {
      id: 'kelas-xi',
      kelas: 'Kelas XI',
      fase: 'Fase F',
      title: 'Tiga Kerajaan Besar & Masuknya Islam ke Nusantara',
      meta: '5 Bab · 1–2 Semester',
      desc: 'Mempelajari kejayaan Daulah Usmani di Turki, Daulah Safawi di Persia, Daulah Mughal di India, serta jalur sejarah masuknya Islam dan peran Wali Sanga di Nusantara.',
      to: '/docs/kelas-xi/',
      bgImage: '/img/card-kelas-xi-bg.png',
      colorTheme: 'jenjang-theme-gold',
      accentColor: '#7A5C00',
    },
    {
      id: 'kelas-xii',
      kelas: 'Kelas XII',
      fase: 'Fase F',
      title: 'Islam di Nusantara & Perjuangan Kemerdekaan',
      meta: '5 Bab · 1–2 Semester',
      desc: 'Mengkaji kerajaan-kerajaan Islam Nusantara, peran ulama awal dan pesantren, organisasi pergerakan Islam, perjuangan kemerdekaan, hingga tokoh pascakemerdekaan.',
      to: '/docs/kelas-xii/',
      bgImage: '/img/card-kelas-xii-bg.png',
      colorTheme: 'jenjang-theme-maroon',
      accentColor: '#7A1A22',
    },
  ];

  const featurePillars = [
    {
      number: '01',
      title: 'Urutan sesuai buku siswa',
      desc: 'Materi disusun mengikuti struktur kurikulum resmi Kementerian Agama Republik Indonesia.',
      icon: <BookIcon />,
    },
    {
      number: '02',
      title: 'Ringkasan poin kunci',
      desc: 'Fokus pada intisari dan peristiwa penting yang perlu kamu pahami untuk persiapan asesmen.',
      icon: <KeyPointsIcon />,
    },
    {
      number: '03',
      title: 'Nyaman dibaca di ponsel',
      desc: 'Tampilan responsif dengan tipografi proporsional untuk belajar kapan saja dan di mana saja.',
      icon: <MobileIcon />,
    },
    {
      number: '04',
      title: 'Materi mudah ditemukan',
      desc: 'Dilengkapi fitur pencarian cepat agar topik, tokoh, dan peristiwa sejarah dapat segera ditemukan.',
      icon: <SearchQuickIcon />,
    },
  ];

  return (
    <Layout
      title={`${siteConfig.title} | Portal Pembelajaran Sejarah Kebudayaan Islam`}
      description="Ringkasan materi Sejarah Kebudayaan Islam untuk siswa Madrasah Aliyah, disusun mengikuti struktur pembelajaran Kelas X, XI, dan XII.">

      {/* =========================================================
          1. HERO SECTION — Atmospheric background + Book Spine Shelf
          ========================================================= */}
      <section className="board-hero">
        {/* Mosque image sebagai background atmosferik */}
        <div className="board-hero-bg" aria-hidden="true">
          <img
            src="/img/hero-mosque.png"
            alt=""
            className="board-hero-bg-img"
            loading="eager"
          />
        </div>
        <div className="board-hero-overlay" aria-hidden="true" />

        <div className="container board-hero-container">
          <div className="board-hero-content">
            <span className="board-hero-eyebrow">Portal Pembelajaran Sejarah Kebudayaan Islam</span>

            <h1 className="board-hero-title">
              Jejak <span className="board-hero-title-accent">SKI</span>
            </h1>

            <div className="board-hero-subheadline">
              Menelusuri sejarah. Memahami peradaban.{'\n'}Menemukan makna.
            </div>

            <p className="board-hero-description">
              Ringkasan materi Sejarah Kebudayaan Islam untuk siswa Madrasah Aliyah,
              disusun mengikuti struktur pembelajaran Kelas X, XI, dan XII.
            </p>

            <div className="board-hero-actions">
              <Link to="/docs/intro" className="board-btn board-btn-primary">
                Mulai Belajar <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>

              <button
                type="button"
                onClick={handleSearchClick}
                className="board-btn board-btn-secondary"
                aria-label="Cari materi Sejarah Kebudayaan Islam">
                Cari Materi
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </div>
          </div>

          {/* Book Spine Shelf — 3 punggung kitab vertikal */}
          <div className="board-hero-spines" aria-label="Pilih jenjang kelas">
            {[
              { roman: 'X', label: 'Sirah Nabawiyah & Daulah Islam Awal', bab: '6 Bab', to: '/docs/kelas-x/' },
              { roman: 'XI', label: 'Tiga Kerajaan Besar & Islam Nusantara', bab: '5 Bab', to: '/docs/kelas-xi/' },
              { roman: 'XII', label: 'Nusantara & Perjuangan Kemerdekaan', bab: '5 Bab', to: '/docs/kelas-xii/' },
            ].map((spine) => (
              <Link key={spine.roman} to={spine.to} className={`hero-spine hero-spine-${spine.roman.toLowerCase()}`}>
                <div className="hero-spine-inner">
                  <span className="hero-spine-roman">{spine.roman}</span>
                  <span className="hero-spine-label">{spine.label}</span>
                  <span className="hero-spine-bab">{spine.bab}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          2. CONTINUE LEARNING SECTION (Hanya tampil jika sudah ada riwayat membaca)
          ========================================================= */}
      {continueState && (
        <section className="board-section board-continue-section">
          <div className="container">
            <div className="board-continue-card">
              <div className="board-continue-header">
                <div className="board-continue-title-group">
                  <h2 className="board-continue-heading">Lanjutkan Belajar</h2>
                  <p className="board-continue-subtext">Kamu sedang belajar di {continueState.kelas}</p>
                </div>

                <div className="board-continue-progress-group">
                  <span className="board-continue-progress-label">{continueState.progressText}</span>
                  <div className="board-progress-track" role="progressbar" aria-valuenow={continueState.progressPercent} aria-valuemin="0" aria-valuemax="100">
                    <div className="board-progress-bar" style={{ width: `${continueState.progressPercent}%` }} />
                  </div>
                </div>
              </div>

              <div className="board-continue-body">
                <div className="board-continue-thumb-col">
                  <img
                    src={continueState.thumb}
                    alt="Thumbnail Materi"
                    className="board-continue-thumb"
                    loading="lazy"
                    onError={(e) => {
                      // Graceful fallback jika image gagal load
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                <div className="board-continue-info-col">
                  <span className="board-continue-badge">{continueState.babLabel}</span>
                  <h3 className="board-continue-chapter-title">{continueState.title}</h3>
                  <p className="board-continue-chapter-desc">{continueState.desc}</p>
                </div>

                <div className="board-continue-action-col">
                  <Link to={continueState.to} className="board-btn board-btn-continue">
                    Lanjutkan <span className="btn-arrow" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          3. PILIH JENJANG PEMBELAJARAN
          ========================================================= */}
      <section className="board-section board-jenjang-section">
        <div className="container">
          <div className="board-section-header">
            <h2 className="board-section-title">Pilih Jenjang Pembelajaran</h2>
            <p className="board-section-subtitle">
              Pilih kelas sesuai jenjangmu untuk mulai menjelajahi materi.
            </p>
          </div>

          <div className="board-jenjang-grid">
            {jenjangList.map((item) => (
              <div key={item.id} className={`board-jenjang-card ${item.colorTheme}`}>
                <div
                  className="board-jenjang-card-bg"
                  style={{ backgroundImage: `url(${item.bgImage})` }}
                  aria-hidden="true"
                />
                <div className="board-jenjang-card-overlay" aria-hidden="true" />

                <div className="board-jenjang-card-content">
                  {/* Top: Ornament icon + Kelas title */}
                  <div className="board-jenjang-top">
                    <div className="board-jenjang-ornament" aria-hidden="true">
                      <IslamicOrnamentIcon />
                    </div>
                    <h3 className="board-jenjang-class-title">{item.kelas}</h3>
                    <span className="board-jenjang-fase">{item.fase}</span>
                  </div>

                  {/* Center: Topic title + meta */}
                  <div className="board-jenjang-center">
                    <h4 className="board-jenjang-topic-subtitle">{item.title}</h4>
                    <span className="board-jenjang-meta">{item.meta}</span>
                  </div>

                  {/* Bottom: CTA */}
                  <div className="board-jenjang-bottom">
                    <Link to={item.to} className="board-btn board-btn-paper">
                      Jelajahi materi <span className="btn-arrow" aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          4. MENGAPA JEJAK SKI? (4 PILAR BEBAS EMOJI)
          ========================================================= */}
      <section className="board-section board-pillars-section">
        <div className="container">
          <div className="board-section-header">
            <h2 className="board-section-title">Mengapa Jejak SKI?</h2>
            <p className="board-section-subtitle">
              Dirancang untuk mempermudah pemahaman sejarah peradaban Islam secara terarah dan komprehensif.
            </p>
          </div>

          <div className="board-pillars-grid">
            {featurePillars.map((pillar) => (
              <div key={pillar.number} className="board-pillar-item">
                <div className="board-pillar-header-row">
                  <div className="board-pillar-icon-wrap" aria-hidden="true">
                    {pillar.icon}
                  </div>
                  <span className="board-pillar-num">{pillar.number}</span>
                </div>
                <h3 className="board-pillar-title">{pillar.title}</h3>
                <p className="board-pillar-desc">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          5. INFORMASI INISIASI & SUMBER
          ========================================================= */}
      <section className="board-section board-credit-section">
        <div className="container">
          <div className="board-credit-card">
            <div className="board-credit-mark" aria-hidden="true">🏛️</div>
            <div className="board-credit-text">
              <strong>Catatan Kecil dari Jejak SKI</strong>
              <p>
                diinisiasi oleh civitas akademika <strong>MAN 2 Nganjuk</strong> sebagai wujud kontribusi dalam menghadirkan ruang belajar digital terbuka bagi seluruh siswa Madrasah Aliyah di Indonesia. Seluruh materi merupakan intisari yang mengacu langsung pada buku teks resmi Kementerian Agama Republik Indonesia untuk memudahkan pemahaman, persiapan asesmen harian, dan ujian madrasah.
              </p>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
