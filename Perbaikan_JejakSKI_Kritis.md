# Prompt Perbaikan — Jejak SKI (Temuan Audit Kritis & Prioritas Tinggi)

**Untuk:** AI coding agent (Claude Code atau sejenis) yang bekerja langsung di repo `jejak-ski`
**Sumber:** `Audit_JejakSKI_StandarNasional.md` — kerjakan sesuai urutan prioritas di bawah, jangan lompat ke item Sedang/Rendah sebelum semua item Kritis dan Tinggi selesai dan diverifikasi.

---

## PROMPT LENGKAP (salin mulai baris ini)

```
Perbaiki 4 masalah berikut di repo Jejak SKI. Kerjakan berurutan sesuai nomor,
verifikasi tiap perbaikan sebelum lanjut ke nomor berikutnya. Jangan mengubah
struktur konten 16 file bab (docs/kelas-x/, docs/kelas-xi/, docs/kelas-xii/) —
perbaikan ini murni di homepage, sidebar config, dan komponen visual.

MASALAH 1 (KRITIS) — Deskripsi Kelas XI dan XII di beranda tertukar dan salah.

Cari komponen homepage (kemungkinan src/pages/index.js atau index.tsx) yang
merender tiga kartu "Kelas X / Kelas XI / Kelas XII". Ganti teks subjudul untuk
Kelas XI dan Kelas XII dengan ini (Kelas X TIDAK perlu diubah, sudah benar):

- Kelas XI, subjudul saat ini "Khulafaur Rasyidin, Bani Umayyah & Abbasiyah"
  SALAH — ganti menjadi: "Tiga Kerajaan Besar & Masuknya Islam ke Nusantara"
- Kelas XII, subjudul saat ini "Peradaban Islam di Dunia"
  SALAH — ganti menjadi: "Islam di Nusantara & Perjuangan Kemerdekaan"

Setelah mengubah, verifikasi dengan menjalankan build lokal dan cek visual
bahwa subjudul Kelas XI menyebut Usmani/Safawi/Mughal/Wali Sanga (BUKAN
Khulafaurasyidin/Umayyah), dan subjudul Kelas XII menyebut Nusantara/
Kemerdekaan (BUKAN "peradaban dunia").

MASALAH 2 (TINGGI) — Sidebar menampilkan 16 bab dari 3 kelas sekaligus
dalam kondisi expanded penuh di setiap halaman, termasuk di mobile.

Buka sidebars.ts (atau sidebars.js) dan/atau file _category_.json di masing-
masing folder docs/kelas-x/, docs/kelas-xi/, docs/kelas-xii/. Tambahkan atau
ubah properti collapsed pada tiap kategori kelas menjadi true secara default,
KECUALI kategori kelas yang sedang aktif dibuka oleh pengguna (Docusaurus akan
otomatis expand kategori aktif berdasarkan URL saat ini jika collapsible: true
dan collapsed: true diset bersamaan — verifikasi perilaku ini setelah build).

Target akhir: saat siswa membuka halaman bab Kelas X, sidebar Kelas XI dan XII
tampil dalam kondisi tertutup/collapsed, bukan menampilkan semua 16 bab
sekaligus.

MASALAH 3 (TINGGI) — Fungsi pencarian belum terverifikasi bekerja.

Cek apakah plugin pencarian lokal Docusaurus (misalnya
@easyops-cn/docusaurus-search-local) sudah terpasang dan terkonfigurasi di
docusaurus.config.ts. Jika belum, pasang plugin tersebut. Jika sudah, jalankan
build lokal dan uji manual: ketik "Sunan Kalijaga" dan "Ibnu Rusyd" di kotak
pencarian, pastikan hasil pencarian mengarah ke halaman bab yang benar
(kelas-xi/bab-5-wali-sanga untuk Sunan Kalijaga, kelas-x/bab-5-umayah-andalusia
untuk Ibnu Rusyd). Laporkan hasil pengujian ini secara eksplisit setelah
selesai — jangan asumsikan berhasil tanpa pengujian nyata.

MASALAH 4 (TINGGI) — Hero beranda belum menampilkan elemen visual "rak buku"
(3 punggung kitab) yang sudah disepakati sebelumnya di mockup desain, saat ini
memakai gambar generik hero-mosque.png.

Ganti atau tambahkan elemen visual di hero beranda berupa 3 kartu vertikal
menyerupai punggung buku/kitab (spine), masing-masing mewakili Kelas X, XI,
XII, dengan gaya:
- Warna latar gelap kehijauan (bukan foto/ilustrasi masjid generik)
- Angka Romawi besar (X, XI, XII) di tengah tiap spine dengan warna aksen emas
- Label singkat cakupan materi di bawah angka romawi
- Jumlah bab di bagian bawah tiap spine

Rujuk struktur visual ini pada dokumen desain sebelumnya (deskripsi mockup:
tiga kartu vertikal seperti punggung buku berjejer, bukan grid kartu generik
horizontal). Elemen ini menggantikan atau melengkapi hero-mosque.png yang ada
sekarang, dan setiap spine tetap harus bisa diklik menuju halaman daftar bab
kelas terkait (tautan yang sudah ada saat ini jangan dihapus, cukup ubah
tampilannya).
```

## (salin sampai baris ini)

---

## Catatan untuk Bapak

- Saya urutkan berdasarkan prioritas di laporan audit: Masalah 1 wajib selesai duluan karena itu satu-satunya yang sifatnya "informasi salah", bukan sekadar estetika.
- Masalah 2 dan 3 saya gabung sebagai prioritas Tinggi yang sama pentingnya — keduanya soal fungsi, bukan tampilan.
- Masalah 4 (hero rak buku) sengaja saya taruh terakhir meski juga prioritas Tinggi di laporan, karena dampaknya ke pengalaman siswa lebih kecil dibanding tiga masalah lain yang menyangkut akurasi info dan fungsi navigasi/pencarian.
- Item prioritas Sedang dan Rendah dari laporan audit (halaman "Tentang", tahun edisi buku, custom domain, dll.) sengaja tidak saya masukkan ke prompt ini — bisa jadi prompt terpisah setelah keempat masalah ini beres dan sudah Bapak verifikasi di situs live.
- Setelah agent selesai mengerjakan, saya sarankan Bapak cek ulang situsnya seperti kemarin (screenshot atau saya fetch langsung) untuk memastikan keempatnya benar-benar diterapkan, bukan cuma diklaim selesai.
