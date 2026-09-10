# Product Requirements Document: Jejak SKI

**Portal Referensi Materi Sejarah Kebudayaan Islam untuk Siswa Madrasah Aliyah**

| | |
|---|---|
| **Disusun untuk** | MAN 2 Nganjuk |
| **Disusun oleh** | Muhamad Maulana Rokhim, S.Pd. |
| **Versi** | 2.0 (Audit & Restrukturisasi Teknis) |
| **Status** | Draft — menunggu keputusan pada Open Questions (§14) |
| **Target Pembaca** | Programmer, AI coding agent, admin konten |

---

## 1. Ringkasan Eksekutif

Jejak SKI adalah portal referensi berbasis web statis yang membantu siswa Madrasah Aliyah menemukan ringkasan materi Sejarah Kebudayaan Islam (SKI) dengan cepat, disusun mengikuti struktur bab pada buku siswa resmi terbitan Kementerian Agama untuk setiap jenjang (Kelas X, XI, XII).

Fase 1 berfokus pada dua hal: rangkuman poin-poin kunci per bab, dan navigasi yang mudah diikuti (Kelas → Bab → Rangkuman). Tidak ada fitur interaktif (kuis, akun pengguna, kontribusi multi-pihak) pada fase ini. Konten dikelola oleh satu admin, namun **disimpan di Git** agar tidak menjadi single point of failure.

---

## 2. Latar Belakang dan Masalah

Siswa MA sering kesulitan menemukan bagian materi tertentu saat belajar mandiri atau menjelang ujian, karena:

- Struktur Alur Tujuan Pembelajaran (ATP) yang beredar tidak selalu sama persis dengan urutan bab di buku cetak resmi.
- Buku cetak fisik tidak selalu tersedia saat siswa ingin mengulang materi di luar jam sekolah.
- Tidak ada satu titik akses digital yang merangkum materi per bab secara ringkas dan konsisten lintas tiga jenjang kelas.

---

## 3. Tujuan dan Sasaran

### 3.1 Tujuan (Goals) — Phase 1

| ID | Tujuan | Cara Verifikasi |
|---|---|---|
| G-01 | Siswa menemukan rangkuman bab tertentu dalam maks. 3 klik/tap dari beranda | Usability test dengan ≥5 siswa sebelum peluncuran |
| G-02 | Navigasi mengikuti persis urutan & judul bab buku siswa resmi tiap jenjang | Cross-check manual terhadap Lampiran A |
| G-03 | Konten dikelola 1 admin non-programmer via edit Markdown | Admin dapat publish 1 bab baru dalam <15 menit tanpa bantuan teknis |
| G-04 | Tampilan optimal di mobile (mayoritas akses via ponsel) | Lighthouse Mobile score ≥ 90 (Performance & Accessibility) |
| G-05 | Traksi penggunaan terukur secara anonim | Analytics privasi-aman terpasang dan menghasilkan laporan mingguan |

### 3.2 Non-Goals — Phase 1

- Tidak ada kuis/latihan soal interaktif.
- Tidak ada sistem akun/login siswa.
- Tidak menerima kontribusi konten dari pihak luar — pengelolaan terpusat pada satu admin.
- Tidak menyalin teks penuh buku secara verbatim — konten berupa rangkuman/parafrase, bukan reproduksi buku berhak cipta.
- Tidak melakukan tracking data pribadi/identitas siswa individual.

---

## 4. Target Pengguna

| Peran | Deskripsi |
|---|---|
| **Pengguna utama** | Siswa MA Kelas X, XI, XII yang mempelajari/mengulang materi SKI |
| **Pengguna sekunder** | Guru SKI (termasuk admin) yang membagikan tautan materi lewat WhatsApp |
| **Pengelola konten** | Satu admin tunggal — bertanggung jawab penuh atas penulisan & pembaruan konten |

---

## 5. Ruang Lingkup Konten — Fase 1

| Kelas | Fokus Materi | Jumlah Bab | Sumber Buku |
|---|---|---|---|
| X | Sirah Nabawiyah, Khulafaurasyidin, Daulah Umayah, Daulah Abasiah | 6 bab | Buku Siswa SKI Kelas X, Kemenag |
| XI | Tiga kerajaan besar (Usmani, Safawi, Mughal), masuknya Islam ke Indonesia, Wali Sanga | 5 bab | Buku Siswa SKI Kelas XI, Kemenag |
| XII | Kerajaan Islam Nusantara, ulama, organisasi Islam, kemerdekaan, tokoh berpengaruh | 5 bab | Buku Siswa SKI Kelas XII, Kemenag |

> **Aturan wajib:** struktur navigasi mengikuti daftar isi buku cetak asli per jenjang, **bukan** struktur ATP infografis — keduanya terbukti berbeda (contoh: buku Kelas XII menggabungkan tiga topik ATP menjadi satu bab "Kerajaan Islam Nusantara"). Daftar lengkap ada di **Lampiran A**.

---

## 6. Kebutuhan Fungsional

| ID | Fitur | Deskripsi | Prioritas |
|---|---|---|---|
| FR-01 | Navigasi Kelas | Tab pemilih Kelas X / XI / XII di beranda | Wajib (P0) |
| FR-02 | Daftar Bab | Daftar bab per kelas, mengikuti urutan buku resmi (bukan ATP) | Wajib (P0) |
| FR-03 | Halaman Rangkuman Bab | Poin-poin kunci per bab dalam bahasa ringkas | Wajib (P0) |
| FR-04 | Breadcrumb | Jejak navigasi Beranda / Kelas / Bab | Wajib (P0) |
| FR-05 | Navigasi Bab Sebelum/Sesudah | Tombol pindah bab dari halaman rangkuman | Penting (P1) |
| FR-06 | Pencarian | Cari judul bab / nama tokoh; hasil arahkan ke halaman terkait. **Implementasi: plugin local search bawaan Docusaurus** (`@easyops-cn/docusaurus-search-local`) — tanpa dependensi API eksternal (Algolia) agar tetap gratis & tanpa kuota | Penting (P1) |
| FR-07 | Tampilan Mobile-First | Layout optimal di ponsel | Wajib (P0) |
| FR-08 | Chip Tokoh Terkait | Daftar nama tokoh yang dibahas dalam satu bab | Opsional (P2) |
| FR-09 | Disclaimer Konten | Notice tetap di footer setiap halaman bab: konten adalah rangkuman/parafrase, bukan pengganti buku resmi Kemenag | Wajib (P0) |
| FR-10 | Halaman 404 | Halaman not-found kustom dengan tautan kembali ke beranda | Wajib (P0) |
| FR-11 | Analytics Anonim | Page view & search query tercatat tanpa PII, untuk mengukur G-05 | Penting (P1) |

---

## 7. Kebutuhan Non-Fungsional

| ID | Kebutuhan | Target Terukur |
|---|---|---|
| NFR-01 | Responsif mobile-first | Ukuran teks isi rangkuman min. 16px; breakpoint teruji di lebar 360–768px |
| NFR-02 | Kecepatan muat halaman | < 2 detik pada koneksi 4G tersimulasi (Lighthouse throttled) |
| NFR-03 | Tanpa instalasi aplikasi | Dapat diakses langsung dari tautan browser (WhatsApp share) |
| NFR-04 | Kemudahan kelola non-IT | Update konten = edit file teks + 1 command deploy, terdokumentasi di README |
| NFR-05 | Privasi data | Tidak ada login/formulir; analytics (jika dipasang) bersifat agregat & anonim, tanpa cookie identifikasi personal |
| NFR-06 | Aksesibilitas (a11y) | Kontras warna WCAG AA minimum; semua gambar punya `alt` text; navigasi dapat diakses keyboard |
| NFR-07 | SEO dasar | Setiap halaman bab punya `<title>`, meta description, dan struktur heading semantik (H1–H3) untuk discoverability |
| NFR-08 | Ketersediaan (uptime) | ≥ 99% (bergantung SLA Firebase Hosting free/paid tier) |
| NFR-09 | Cross-browser | Teruji di Chrome, Safari (iOS), dan Chrome Android — mayoritas trafik diperkirakan mobile Android |

---

## 8. Desain dan Pengalaman Pengguna

Identitas visual mengangkat nuansa "kitab digital", berbeda dari situs pembelajaran generik.

| Elemen | Ketentuan |
|---|---|
| Warna utama | Hijau tinta tua — navigasi & header |
| Latar | Warna kertas hangat (bukan putih polos), meniru naskah klasik |
| Aksen | Emas untuk penomoran bab (gaya manuskrip); merah marun terbatas untuk istilah kunci |
| Tipografi | Serif untuk judul; sans-serif untuk isi teks (keterbacaan layar kecil) |
| Alur halaman | Beranda (pilih kelas) → Daftar Bab (urutan buku asli) → Halaman Rangkuman Bab |

**Catatan a11y (baru):** kombinasi hijau tinta tua + latar kertas hangat + aksen emas WAJIB diuji rasio kontras (target WCAG AA ≥ 4.5:1 untuk teks isi) sebelum finalisasi palet warna, karena warna emas/pastel berisiko gagal kontras di atas latar terang.

Nama proyek: **Jejak SKI**.

---

## 9. Arsitektur Teknis

### 9.1 Pilihan Teknologi

| Komponen | Pilihan | Alasan |
|---|---|---|
| Site generator | Docusaurus (alternatif: Next.js + MDX) | Model konten berjenjang (Kelas → Bab) cocok dengan sidebar navigasi bawaan + built-in search |
| Hosting | Firebase Hosting | Output statis (HTML/CSS/JS), deploy via `firebase deploy`, tanpa server backend |
| Version control | **Git (GitHub/GitLab privat)** — *baru, wajib* | Mengatasi risiko bus factor (§12): histori konten, backup otomatis, siapa pun bisa ambil alih proyek dari repo |
| Manajemen konten | Satu file Markdown (`.md`) per bab, dengan **frontmatter terstruktur** (lihat §9.3) | Konsistensi lintas 16 bab |
| Search | `@easyops-cn/docusaurus-search-local` (client-side, tanpa API eksternal) | Gratis, tanpa kuota, sesuai NFR privasi |
| Analytics (opsional, P1) | Firebase Analytics (mode anonim) atau Plausible | Mengukur G-05 tanpa PII |

### 9.2 Struktur Folder Konten

```
/docs
  /kelas-x
    bab-1-makkah.md
    bab-2-madinah.md
    bab-3-khulafaurasyidin.md
    bab-4-umayah-damaskus.md
    bab-5-umayah-andalusia.md
    bab-6-abasiah.md
  /kelas-xi
    bab-1-usmani.md
    bab-2-safawi.md
    bab-3-mughal.md
    bab-4-masuknya-islam-indonesia.md
    bab-5-wali-sanga.md
  /kelas-xii
    bab-1-kerajaan-nusantara.md
    bab-2-ulama-awal.md
    bab-3-organisasi-islam.md
    bab-4-kemerdekaan.md
    bab-5-tokoh-berpengaruh.md
```

### 9.3 Skema Frontmatter Konten (baru — mengisi gap konsistensi)

Setiap file bab **wajib** menggunakan frontmatter berikut agar konsisten dan dapat diproses otomatis (mis. untuk fitur roadmap "Chip Tokoh" atau "Index Tokoh"):

```yaml
---
kelas: "X"
bab_nomor: 1
judul: "Perkembangan Islam Masa Rasulullah Saw. Periode Makkah"
sumber_buku: "Buku Siswa SKI Kelas X, Kemenag RI"
tokoh_terkait:
  - "Nabi Muhammad Saw."
  - "Abu Bakar Ash-Shiddiq"
istilah_kunci:
  - "Hijrah"
  - "Dakwah sirriyah"
ringkasan_singkat: "Satu-dua kalimat untuk meta description & preview kartu"
terakhir_diperbarui: "2026-09-10"
---
```

Isi bab mengikuti template: **Konteks Singkat → Poin-Poin Kunci (bullet) → Istilah Kunci yang di-highlight → (opsional) Tokoh Terkait.** Target panjang: 300–600 kata per bab agar tetap ringkas dan konsisten (menjawab gap "panjang rangkuman tidak terstandar" pada draf awal).

### 9.4 Alur Pembaruan Konten

1. Admin `git pull` untuk sinkronisasi.
2. Admin mengedit/menambah file Markdown di VS Code sesuai skema §9.3.
3. Admin `git commit` + `git push` (histori perubahan otomatis tersimpan).
4. Admin menjalankan `npm run build` untuk membangun versi statis.
5. Admin menjalankan `firebase deploy` untuk publikasi.
6. Tidak ada proses review berlapis (single admin) — namun histori Git memungkinkan rollback jika ada kesalahan.

---

## 10. Alur Kerja Penyusunan Konten (Anti-Pelanggaran Hak Cipta)

1. Ekstraksi teks dari PDF buku siswa resmi Kemenag per jenjang.
2. Identifikasi poin-poin kunci per bab (bukan penyalinan kalimat penuh).
3. Penulisan ulang dalam bahasa ringkas ala rangkuman, istilah & nama tokoh tetap akurat sesuai buku sumber.
4. Isi frontmatter sesuai skema §9.3.
5. Tinjauan akhir oleh admin sebelum publikasi — cek tidak ada kalimat yang identik/near-identik dengan buku sumber.

---

## 11. Metrik Keberhasilan

| Metrik | Target | Cara Ukur |
|---|---|---|
| Cakupan konten | 16/16 bab memiliki halaman rangkuman saat peluncuran | Checklist manual vs. Lampiran A |
| Kecepatan temu (findability) | Siswa menemukan bab dalam maks. 3 tap | Usability test ≥5 siswa |
| Adopsi | Tautan portal aktif dibagikan & dipakai via WhatsApp kelas | Jumlah page view mingguan via analytics anonim (baru — dulu tidak terukur) |
| Performa teknis | Lighthouse Mobile ≥ 90 (Performance, Accessibility, Best Practices) | Audit Lighthouse sebelum go-live |

---

## 12. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Hak cipta — rangkuman terlalu dekat dengan teks asli | Tinggi | Proses §10 wajib diikuti; tambahkan disclaimer FR-09 di setiap halaman |
| Bus factor — hanya 1 admin | Tinggi | **Git repository** (§9.1) sebagai backup & histori; dokumentasi alur kerja di README agar bisa diambil alih |
| Konsistensi struktur — revisi kurikulum/cetakan buku baru Kemenag | Sedang | Verifikasi ulang daftar isi setiap ada revisi resmi; catat versi buku sumber di frontmatter (`sumber_buku`) |
| Kontras warna gagal a11y | Sedang | Uji WCAG AA sebelum finalisasi palet (§8) |
| Ketergantungan Firebase free tier | Rendah–Sedang | Pantau kuota hosting; situs statis ringan sehingga risiko kecil |

---

## 13. Roadmap Fase Berikutnya (Belum Dikerjakan)

- Kuis/latihan mandiri per bab sebagai self-check pemahaman siswa.
- Index tokoh lintas-bab (pencarian nama tokoh → semua bab terkait) — akan memanfaatkan field `tokoh_terkait` di frontmatter (§9.3) yang sudah disiapkan sejak Fase 1.
- Tampilan linimasa (timeline) lintas kelas X–XII.
- Pencarian teks penuh (full-text search) lebih canggih.
- Kemungkinan membuka kontribusi guru SKI lain (visi "SKIpedia") — memerlukan alur review berlapis & sistem akun kontributor.

---

## 14. Pertanyaan Terbuka (Perlu Keputusan Sebelum Development)

1. Apakah portal diumumkan resmi ke seluruh siswa MAN 2 Nganjuk, atau pilot ke satu kelas dahulu?
2. Nama domain/subdomain final apa yang akan dipakai (mis. `maktabah-ski.web.app` bawaan Firebase, atau domain kustom)?
3. Apakah admin bersedia menyiapkan repository Git privat (GitHub/GitLab), atau perlu bantuan setup awal?
4. Target tanggal peluncuran Fase 1 — untuk menetapkan tenggat penulisan 16 bab?
5. Apakah analytics (FR-11) disetujui untuk dipasang, mengingat ini penambahan baru di luar draf awal?

---

## Lampiran A: Struktur Bab Lengkap per Kelas

**Kelas X (6 Bab)**

| Bab | Judul (sesuai buku asli) |
|---|---|
| I | Perkembangan Islam Masa Rasulullah Saw. Periode Makkah |
| II | Perkembangan Islam Masa Rasulullah Saw. Periode Madinah |
| III | Perkembangan Islam Masa Khulafaurasyidin |
| IV | Perkembangan Islam Masa Daulah Umayah di Damaskus |
| V | Perkembangan Islam Masa Daulah Umayah di Andalusia |
| VI | Perkembangan Islam Masa Daulah Abasiah |

**Kelas XI (5 Bab)**

| Bab | Judul (sesuai buku asli) |
|---|---|
| I | Perkembangan Peradaban dan Ilmu Pengetahuan Islam pada Masa Daulah Usmani |
| II | Perkembangan Peradaban dan Ilmu Pengetahuan Islam pada Masa Daulah Safawi |
| III | Perkembangan Peradaban dan Ilmu Pengetahuan Islam pada Masa Daulah Mughal |
| IV | Menelusuri Jejak Sejarah Masuknya Islam ke Indonesia |
| V | Peran Wali Sanga dalam Penyebaran Islam di Indonesia |

**Kelas XII (5 Bab)**

| Bab | Judul (sesuai buku asli) |
|---|---|
| 1 | Kerajaan Islam Nusantara |
| 2 | Peran Ulama Awal Nusantara Prakemerdekaan |
| 3 | Kontribusi Umat Islam Prakemerdekaan melalui Organisasi Berbasis Islam |
| 4 | Peran Umat Islam Masa Kemerdekaan dan Pascakemerdekaan |
| 5 | Tokoh Islam Nusantara Paling Berpengaruh Pascakemerdekaan RI |

---

## Lampiran B: Ringkasan Perubahan dari Draf v1.0

| Area | Perubahan |
|---|---|
| Struktur | Ditambahkan ID requirement (FR-xx, NFR-xx, G-xx) agar dapat di-tracking programmer/AI agent |
| Version control | Ditambahkan Git sebagai mitigasi bus factor (sebelumnya hanya disebut sebagai risiko tanpa solusi teknis) |
| Konten | Ditambahkan skema frontmatter terstruktur (§9.3) untuk konsistensi 16 bab |
| Fitur | Ditambahkan FR-09 (disclaimer hak cipta di UI), FR-10 (halaman 404), FR-11 (analytics anonim) |
| Non-fungsional | Ditambahkan NFR-06 (aksesibilitas), NFR-07 (SEO dasar), NFR-08 (uptime), NFR-09 (cross-browser) |
| Metrik | Metrik keberhasilan dibuat terukur dengan cara verifikasi eksplisit |
| Pencarian | Dispesifikkan implementasi teknis (plugin local search Docusaurus) agar tidak ambigu bagi developer |
