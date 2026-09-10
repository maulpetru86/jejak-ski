import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

export default function DocItemFooterWrapper(props) {
  const {frontMatter} = useDoc();
  const {terakhir_diperbarui, kelas} = frontMatter || {};

  return (
    <>
      {kelas && (
        <div className="chapter-disclaimer-box">
          <div className="chapter-disclaimer-header">
            <span className="chapter-disclaimer-icon">⚖️</span>
            <strong>Pemberitahuan Hak Cipta & Ketentuan Penggunaan</strong>
          </div>
          <p className="chapter-disclaimer-text">
            Materi dalam laman ini disusun sebagai rangkuman dan parafrase edukatif mandiri bagi siswa Madrasah Aliyah,{' '}
            <strong>bukan merupakan pengganti buku cetak resmi terbitan Kementerian Agama Republik Indonesia</strong>.
            Siswa tetap dianjurkan membaca buku teks utama untuk pembahasan yang utuh dan komprehensif.
          </p>
          {terakhir_diperbarui && (
            <div className="chapter-updated-date">
              <small>Terakhir diperbarui: <em>{terakhir_diperbarui}</em></small>
            </div>
          )}
        </div>
      )}
      <Footer {...props} />
    </>
  );
}
