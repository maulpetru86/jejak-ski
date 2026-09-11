import React, {useEffect} from 'react';
import Content from '@theme-original/DocItem/Content';
import Head from '@docusaurus/Head';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

export default function DocItemContentWrapper(props) {
  const {frontMatter, metadata} = useDoc();
  const {kelas, bab_nomor, judul, sumber_buku, tokoh_terkait, istilah_kunci, ringkasan_singkat, sidebar_label} = frontMatter || {};

  const isChapterPage = !!(kelas && bab_nomor);
  const pageTitle = judul ? `${judul} (Kelas ${kelas} Bab ${bab_nomor}) | Jejak SKI` : null;
  const keywords = [
    `SKI Kelas ${kelas}`,
    `Bab ${bab_nomor}`,
    ...(Array.isArray(tokoh_terkait) ? tokoh_terkait : []),
    ...(Array.isArray(istilah_kunci) ? istilah_kunci : []),
  ].join(', ');

  // Simpan otomatis ke localStorage agar kartu 'Lanjutkan Belajar' di Homepage selalu sinkron
  useEffect(() => {
    if (typeof window === 'undefined' || !isChapterPage) return;

    try {
      const totalBabMap = {
        'X': 6,
        'XI': 5,
        'XII': 5,
      };
      const totalBab = totalBabMap[kelas] || 6;
      const currentBabNum = parseInt(bab_nomor, 10) || 1;

      // Kelola riwayat bab yang sudah pernah dibuka/dibaca
      let readHistory = [];
      try {
        const savedHistory = localStorage.getItem('jejak_ski_read_history');
        if (savedHistory) {
          readHistory = JSON.parse(savedHistory);
          if (!Array.isArray(readHistory)) readHistory = [];
        }
      } catch (err) {}

      const chapterKey = `${kelas}-${bab_nomor}`;
      if (!readHistory.includes(chapterKey)) {
        readHistory.push(chapterKey);
        try {
          localStorage.setItem('jejak_ski_read_history', JSON.stringify(readHistory));
        } catch (err) {}
      }

      // Hitung jumlah bab yang sudah dipelajari di kelas ini
      const chaptersReadInClass = readHistory.filter(item => item.startsWith(`${kelas}-`)).length;
      const finishedBab = Math.max(chaptersReadInClass, Math.max(1, currentBabNum - 1));
      const progressPercent = Math.min(100, Math.max(15, Math.round((finishedBab / totalBab) * 100)));

      // Tentukan thumbnail sesuai kelas dan bab
      const classBgMap = {
        'X': '/img/card-kelas-x-bg.png',
        'XI': '/img/card-kelas-xi-bg.png',
        'XII': '/img/card-kelas-xii-bg.png',
      };
      let thumb = classBgMap[kelas] || '/img/thumb-khulafaurasyidin.png';
      if (kelas === 'X' && currentBabNum === 3) {
        thumb = '/img/thumb-khulafaurasyidin.png';
      }

      // Judul ringkas untuk kartu
      let cleanTitle = sidebar_label
        ? sidebar_label.replace(/^Bab\s*\d+\s*:\s*/i, '')
        : (judul || `Bab ${bab_nomor}`);

      const continuePayload = {
        kelas: `Kelas ${kelas}`,
        babLabel: `Kelas ${kelas} · Bab ${bab_nomor}`,
        title: cleanTitle,
        desc: ringkasan_singkat || judul || 'Lanjutkan mempelajari rangkuman materi sejarah kebudayaan Islam.',
        to: metadata?.permalink || window.location.pathname,
        progressText: `${finishedBab} dari ${totalBab} bab selesai`,
        progressPercent: progressPercent,
        thumb: thumb,
      };

      localStorage.setItem('jejak_ski_continue_learning', JSON.stringify(continuePayload));
    } catch (e) {
      console.warn('Gagal memperbarui progres belajar:', e);
    }
  }, [isChapterPage, kelas, bab_nomor, judul, ringkasan_singkat, sidebar_label, metadata?.permalink]);

  return (
    <>
      {isChapterPage && (
        <Head>
          {pageTitle && <title>{pageTitle}</title>}
          {pageTitle && <meta property="og:title" content={pageTitle} />}
          {pageTitle && <meta name="twitter:title" content={pageTitle} />}
          {ringkasan_singkat && <meta name="description" content={ringkasan_singkat} />}
          {ringkasan_singkat && <meta property="og:description" content={ringkasan_singkat} />}
          {ringkasan_singkat && <meta name="twitter:description" content={ringkasan_singkat} />}
          {keywords && <meta name="keywords" content={keywords} />}
        </Head>
      )}

      {isChapterPage && (
        <div className="chapter-meta-container">
          <div className="chapter-badge-row">
            <span className="chapter-badge chapter-badge-class">
              Kelas {kelas}
            </span>
            <span className="chapter-badge chapter-badge-number">
              Bab {bab_nomor}
            </span>
            {sumber_buku && (
              <span className="chapter-source">
                📚 {sumber_buku}
              </span>
            )}
          </div>

          {ringkasan_singkat && (
            <div className="chapter-summary-card">
              <span className="chapter-summary-icon">💡</span>
              <p className="chapter-summary-text">{ringkasan_singkat}</p>
            </div>
          )}

          {Array.isArray(tokoh_terkait) && tokoh_terkait.length > 0 && (
            <div className="chapter-tokoh-section">
              <span className="tokoh-label">Tokoh Terkait:</span>
              <div className="tokoh-chips-wrapper">
                {tokoh_terkait.map((tokoh, idx) => (
                  <span key={idx} className="tokoh-chip">
                    <span className="tokoh-chip-icon">👤</span> {tokoh}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <Content {...props} />
    </>
  );
}
