import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function NotFound() {
  return (
    <Layout
      title="Halaman Tidak Ditemukan (404) | Jejak SKI"
      description="Halaman materi Sejarah Kebudayaan Islam yang Anda cari tidak ditemukan.">
      <main className="container margin-vert--xl not-found-container">
        <div className="row">
          <div className="col col--8 col--offset-2 text--center">
            <div className="not-found-illustration">
              <span className="not-found-icon">📜</span>
              <h1 className="hero__title not-found-title">404</h1>
              <p className="hero__subtitle not-found-subtitle">
                Halaman Materi Tidak Ditemukan
              </p>
            </div>

            <p className="not-found-desc">
              Mohon maaf, jejak materi Sejarah Kebudayaan Islam yang Anda cari tidak dapat ditemukan atau mungkin telah dipindahkan ke bab lain.
            </p>

            <div className="not-found-actions margin-vert--lg">
              <Link
                className="button button--primary button--lg not-found-btn"
                to="/">
                🏠 Kembali ke Beranda
              </Link>
              <Link
                className="button button--secondary button--lg not-found-btn"
                to="/docs/intro">
                📖 Daftar Materi SKI
              </Link>
            </div>

            <div className="not-found-quicklinks margin-top--xl">
              <h3>Tautan Cepat Jenjang Kelas:</h3>
              <div className="button-group button-group--block not-found-class-group">
                <Link className="button button--outline button--primary" to="/docs/kelas-x/">
                  Kelas X (6 Bab)
                </Link>
                <Link className="button button--outline button--primary" to="/docs/kelas-xi/">
                  Kelas XI (5 Bab)
                </Link>
                <Link className="button button--outline button--primary" to="/docs/kelas-xii/">
                  Kelas XII (5 Bab)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
