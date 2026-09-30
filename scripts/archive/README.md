# Arsip Skrip Migrasi (One-off Scripts)

Folder ini berisi skrip otomatisasi sekali pakai yang digunakan selama proses migrasi dan optimasi aset Jejak SKI:

- `generate-remaining-thumbs.ps1`: Skrip otomatisasi pembuatan thumbnail bab materi.
- `optimize-thumb.ps1`: Skrip optimasi ukuran thumbnail gambar.
- `update-frontmatter-thumbs.ps1`: Skrip pembaruan frontmatter thumbnail bab.
- `fix-nested-p.ps1`: Skrip perbaikan tag `<p>` bersarang.

Skrip-skrip ini tidak lagi dijalankan pada alur kerja operasional reguler maupun CI/CD. Alur verifikasi dan build harian menggunakan `npm run check` (`scripts/check-catalog.mjs`) dan `npm run build:og` (`scripts/make-og-image.mjs`).
