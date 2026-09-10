import React from 'react';
import Content from '@theme-original/DocItem/Content';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

export default function DocItemContentWrapper(props) {
  const {frontMatter} = useDoc();
  const {kelas, bab_nomor, sumber_buku, tokoh_terkait, ringkasan_singkat} = frontMatter || {};

  const isChapterPage = !!(kelas && bab_nomor);

  return (
    <>
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
