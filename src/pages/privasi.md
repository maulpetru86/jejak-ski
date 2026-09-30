---
title: Kebijakan Privasi
description: Informasi tentang pengumpulan data dan kebijakan privasi portal Jejak SKI.
hide_table_of_contents: false
---

# Kebijakan Privasi Jejak SKI

*Terakhir diperbarui: 30 September 2026*

Portal **Jejak SKI** berkomitmen menjaga privasi seluruh pengunjung, khususnya siswa dan guru Madrasah Aliyah. Halaman ini menjelaskan secara transparan informasi apa yang diproses saat Anda mengakses portal ini.

---

## Data yang Diproses

### 1. Statistik Kunjungan Agregat (Google Analytics 4)

Saat mengakses Jejak SKI dalam mode publik (produksi), portal menggunakan **Google Analytics 4 (GA4)** untuk memantau performa teknis dan statistik agregat penggunaan:

- Halaman yang dibaca serta durasi sesi belajar
- Perkiraan wilayah geografis (tingkat kota/provinsi, bukan lokasi presisi)
- Informasi teknis perangkat (jenis peramban, sistem operasi, resolusi layar)
- Jalur rujukan (mesin pencari atau tautan langsung)

GA4 menggunakan cookie peramban (`_ga`, `_ga_*`) untuk membedakan sesi kunjungan secara teknis tanpa mengumpulkan identitas pribadi langsung (nama, alamat rumah, dsb.). Data tersebut diproses oleh Google sesuai dengan [Kebijakan Privasi Google](https://policies.google.com/privacy).

### 2. Riwayat Belajar Lokal (localStorage Browser)

Untuk kenyamanan navigasi belajar mandiri, portal Jejak SKI menyimpan preferensi belajar **hanya di peramban perangkat Anda sendiri** (`localStorage`):

| Kunci | Data yang Disimpan | Fungsi |
|-------|--------------------|--------|
| `jejak_ski_continue_learning` | Bab materi terakhir yang Anda buka | Menampilkan kartu "Lanjutkan Belajar" di beranda |
| `jejak_ski_read_history` | Daftar bab yang pernah dibuka | Menghitung persentase bab yang sudah dibuka |

Data `localStorage` ini **sepenuhnya berada di perangkat Anda**, tidak dikirim ke server Jejak SKI, dan dapat dihapus sewaktu-waktu melalui menu pembersihan data peramban Anda.

---

## Data yang Tidak Dikumpulkan

- **Tidak ada akun pengguna atau pendaftaran:** Anda bebas membaca seluruh materi tanpa membuat akun atau mengisi formulir login.
- **Tidak ada formulir data pribadi:** Portal tidak meminta nomor telepon, nomor induk siswa, maupun alamat email saat belajar.
- **Tidak ada cookie iklan komersial:** Portal ini dirancang murni untuk sarana edukasi terbuka.

---

## Hak & Kendali Pengguna

- **Membatasi Pelacakan Statistik:** Anda dapat memblokir cookie analitik atau skrip pelacakan menggunakan ekstensi privasi peramban (misalnya uBlock Origin atau Privacy Badger) atau dengan menonaktifkan penyimpanan cookie di pengaturan peramban. Portal ini tidak menerapkan pemrosesan otomatis terhadap sinyal *Do Not Track (DNT)*.
- **Menghapus Riwayat Belajar:** Anda dapat menghapus riwayat baca kapan saja melalui pengaturan peramban (*Clear Browsing Data* / *Hapus Data Situs*).

---

## Perlindungan Pengguna Siswa & Pelajar

Materi Jejak SKI diperuntukkan bagi siswa Madrasah Aliyah (umumnya usia 15–18 tahun). Pengelola tidak pernah secara sadar mengumpulkan data yang dapat mengidentifikasi anak secara pribadi. Jika orang tua atau wali memiliki pertanyaan terkait data teknis kunjungan, silakan hubungi pengelola.

---

## Kontak Pengelola Terkait Privasi

Pertanyaan atau klarifikasi terkait privasi dapat disampaikan melalui:

- **Pengelola MGMP:** Hubungi MGMP SKI Kab. Nganjuk melalui koordinator madrasah setempat.
- **Repositori Publik:** [GitHub Issues Jejak SKI](https://github.com/maulpetru86/jejak-ski/issues) (catatan: isu GitHub bersifat publik).

---

*Halaman ini disusun sebagai bentuk transparansi pengelola portal edukasi dan bukan merupakan nasihat hukum formal. Kepatuhan terhadap UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP) senantiasa ditinjau bersama pembina madrasah.*
