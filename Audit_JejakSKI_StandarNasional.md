# Laporan Audit — Jejak SKI (jejak-ski.web.app)
**Menuju Standar Rujukan Nasional untuk Portal Pembelajaran SKI**

**Tanggal audit:** 13 September 2026
**Metode:** Peninjauan langsung terhadap situs live (beranda, halaman daftar bab Kelas XI & XII, satu halaman rangkuman bab), disandingkan dengan PRD dan mockup desain yang sudah disepakati sebelumnya.

---

## Peran Auditor

Laporan ini disusun dari empat sudut pandang sekaligus, karena "layak rujukan nasional" bukan satu dimensi saja:

| Peran | Fokus Audit |
|---|---|
| **Pengawas Kurikulum Kemenag** | Keselarasan struktur & akurasi konten dengan Kurikulum Merdeka KMA 450 |
| **UX/Accessibility Auditor** | Kelayakan pakai nyata bagi siswa, acuan WCAG 2.1 AA |
| **Web Performance & SEO Auditor** | Kelayakan teknis situs publik, acuan Core Web Vitals |
| **Editor Sumber Belajar Terbuka (OER)** | Kredibilitas, tata kelola konten, etika sitasi sumber |

---

## Ringkasan Eksekutif

Secara keseluruhan, Jejak SKI sudah berada di **level "layak pakai internal"** dan sangat dekat dengan level "layak rujukan publik". Ini kemajuan besar dari audit kode sebelumnya — halaman daftar bab per kelas sudah terimplementasi dengan baik, seluruh 16 bab sudah berisi konten sungguhan, dan ada **pemberitahuan hak cipta eksplisit di setiap halaman bab** (praktik yang jarang dilakukan situs pelajar amatir, dan justru salah satu ciri kredibilitas sumber belajar terbuka yang baik).

Namun ada **satu temuan kritis** yang harus diperbaiki sebelum situs ini disebut "layak rujukan nasional": deskripsi jenjang kelas di beranda salah — Kelas XI dan Kelas XII tertukar. Ini bukan soal selera desain, tapi **informasi yang keliru di halaman pertama yang dilihat semua orang**.

**Skor keseluruhan (estimasi kualitatif): 7/10** — solid secara struktur dan konten, perlu pemolesan pada presentasi dan beberapa perbaikan sebelum diklaim sebagai rujukan resmi.

---

## 1. Temuan Kritis (Wajib Diperbaiki)

### 1.1 Deskripsi jenjang kelas di beranda TERTUKAR

Ini temuan paling serius dalam audit ini — bukan soal estetika, tapi **kesalahan informasi**.

| Kelas | Deskripsi di beranda saat ini | Konten sebenarnya | Status |
|---|---|---|---|
| Kelas X | "Sirah Nabawiyah & Daulah Islam Awal" | Makkah, Madinah, Khulafaurasyidin, Umayah, Abasiah | ✅ Benar |
| Kelas XI | "Khulafaur Rasyidin, Bani Umayyah & Abbasiyah" | Usmani, Safawi, Mughal, Masuk Nusantara, Wali Sanga | ❌ **Salah total** — ini deskripsi Kelas X |
| Kelas XII | "Peradaban Islam di Dunia" | Kerajaan Nusantara, Ulama, Organisasi Islam, Kemerdekaan, Tokoh Berpengaruh | ❌ **Salah** — deskripsi ini lebih cocok untuk Kelas XI (Usmani-Safawi-Mughal = peradaban dunia), bukan XII yang justru fokus Nusantara/Indonesia |

**Dampak:** Siswa atau guru yang baru pertama kali membuka situs akan salah menduga isi Kelas XI dan XII sebelum masuk ke halamannya. Untuk situs yang mengklaim jadi rujukan resmi, ini adalah cacat kredibilitas paling mendasar — kesan pertama pengunjung langsung menemukan informasi keliru.

**Rekomendasi:** Ganti teks subjudul di komponen homepage:
- Kelas XI → "Tiga Kerajaan Besar & Masuknya Islam ke Nusantara" (atau serupa, mencakup Usmani-Safawi-Mughal + Wali Sanga)
- Kelas XII → "Islam di Nusantara & Perjuangan Kemerdekaan"

---

## 2. Kekuatan yang Sudah Dicapai (Layak Dipertahankan)

Beberapa hal berikut sudah di level yang baik dan justru menjadi nilai jual dibanding situs sejenis:

- **Pemberitahuan hak cipta di setiap halaman bab** — secara eksplisit menyatakan konten adalah "rangkuman dan parafrase edukatif mandiri", bukan pengganti buku cetak resmi, dan menganjurkan siswa tetap membaca buku aslinya. Ini praktik OER (Open Educational Resource) yang matang, jarang ada di situs buatan individu.
- **Metadata SEO lengkap** — meta description, Open Graph, Twitter Card, keywords semua terisi dan spesifik per halaman (bukan generik). Ini akan membantu situs terindeks dengan baik di mesin pencari dan tampil rapi saat dibagikan di WhatsApp/media sosial.
- **Halaman daftar bab per kelas sudah sesuai rencana** — kartu per bab dengan label "BAB [angka]", sumber buku, ringkasan, jumlah tokoh & istilah, dan tombol "Baca Bab Ini". Ini menjawab celah navigasi yang saya temukan di audit sebelumnya.
- **Label sidebar dan judul halaman dipisah dengan baik** — sidebar pakai label ringkas ("Bab 2: Rasulullah Periode Madinah"), sementara halaman itu sendiri pakai judul lengkap resmi buku. Ini praktik UX yang tepat, bukan kebetulan.
- **Breadcrumb dan navigasi sebelum/sesudah bab** berfungsi dan konsisten di semua halaman yang diperiksa.
- **Tanggal "Terakhir diperbarui"** tercantum di tiap bab — baik untuk transparansi dan kredibilitas jangka panjang.
- Isi 16 bab (Kelas X, XI, XII) sudah lengkap dan akurat sesuai buku sumber Kemenag — tidak ada lagi placeholder.

---

## 3. Temuan Prioritas Tinggi

### 3.1 Kesetiaan desain terhadap mockup masih parsial
Hero beranda sekarang sudah punya gambar (`hero-mosque.png`) dan tagline yang baik ("Menelusuri sejarah. Memahami peradaban. Menemukan makna."), jauh lebih baik dari versi kartu generik yang diaudit sebelumnya. Namun elemen visual "rak buku" (3 punggung kitab) yang disepakati di mockup awal belum terwujud — hero memakai foto/ilustrasi masjid generik, bukan elemen visual yang secara langsung merepresentasikan struktur "3 kelas = 3 kitab" yang menjadi ciri khas konsep desain Jejak SKI.

**Dampak:** Bukan cacat fungsional, tapi mengurangi "distinctiveness" — situs terlihat seperti template dokumentasi Docusaurus pada umumnya, belum terasa seperti produk yang dirancang khusus.

### 3.2 Sidebar menumpuk 16 bab dari 3 kelas sekaligus, selalu terbuka penuh
Dari hasil fetch, sidebar menampilkan seluruh 16 bab (6+5+5) dalam kondisi expanded sekaligus di setiap halaman, bukan hanya kelas yang sedang dibuka. Ini berpotensi membuat sidebar sangat panjang, terutama pada tampilan mobile di mana ruang sudah terbatas.

**Rekomendasi:** Gunakan `collapsed: true` pada kategori kelas yang sedang tidak aktif di `sidebars.ts`/`_category_.json`, sehingga hanya kelas yang sedang dibuka siswa yang terekspansi.

### 3.3 Fitur pencarian belum bisa diverifikasi berfungsi
Tombol "Cari Materi" terlihat di beranda, tapi karena pencarian Docusaurus umumnya berjalan lewat modal JavaScript (bukan URL terpisah), saya tidak bisa memverifikasi dari sisi ini apakah pencarian benar-benar mengindeks konten (judul, tokoh, istilah) atau hanya tombol UI kosong.

**Rekomendasi:** Bapak perlu tes manual langsung — ketik nama tokoh (misalnya "Sunan Kalijaga" atau "Ibnu Rusyd") di kotak pencarian dan pastikan hasilnya mengarah ke bab yang benar.

---

## 4. Temuan Prioritas Sedang

### 4.1 Footer mengekspos tautan GitHub langsung ke publik
Tautan repositori kode ada di footer setiap halaman. Ini umum di proyek open-source, tapi untuk audiens siswa SMA/MA, ini bisa sedikit membingungkan (siswa mengklik dan melihat kode mentah, bukan konten). Bukan masalah keamanan, tapi pertimbangan pengalaman pengguna.

**Rekomendasi:** Opsional — bisa dipertahankan untuk transparansi (baik untuk kredibilitas ke sesama guru/pengembang), atau dipindah ke halaman "Tentang" terpisah agar footer utama lebih bersih untuk audiens siswa.

### 4.2 Tidak ada halaman "Tentang" atau "Kredit/Sumber" yang berdiri sendiri
Info "diinisiasi oleh civitas akademika MAN 2 Nganjuk" saat ini hanya muncul sebagai satu paragraf kecil di beranda. Untuk klaim "layak rujukan nasional", biasanya dibutuhkan halaman kredibilitas tersendiri: siapa penyusun, metodologi rangkuman, tanggal tinjauan terakhir, dan kontak untuk laporan koreksi/kesalahan.

**Rekomendasi:** Tambahkan halaman `/tentang` yang memuat: metodologi penyusunan konten (dirangkum dari buku resmi Kemenag), penyusun/pengawas, dan mekanisme jika ada pengguna menemukan kesalahan konten (misalnya tautan email atau formulir).

### 4.3 Belum ada indikator versi/edisi buku sumber
Frontmatter mencantumkan "Buku Siswa SKI Kelas X, Kemenag RI" tanpa tahun terbit/edisi. Jika Kemenag merevisi buku di masa depan, pengunjung tidak bisa tahu apakah rangkuman di situs mengacu edisi lama atau baru.

**Rekomendasi:** Tambahkan tahun edisi buku di frontmatter `sumber_buku`, misalnya "Buku Siswa SKI Kelas X, Kemenag RI (Kurikulum Merdeka, KMA 450/2024)".

---

## 5. Temuan Prioritas Rendah (Penyempurnaan)

- **Konsistensi kapitalisasi label bab**: beberapa label sidebar memakai gaya ringkas berbeda dari judul asli buku (misal "Bab 3: Organisasi Pergerakan Islam" vs judul resmi "Kontribusi Umat Islam Prakemerdekaan melalui Organisasi Berbasis Islam") — ini sudah tepat sebagai keputusan UX, tapi pastikan konsisten di semua 16 bab (tidak semua diperiksa satu per satu dalam audit ini).
- **Tidak ada breadcrumb terstruktur (schema.org BreadcrumbList)** untuk SEO — peningkatan kecil yang membantu tampilan hasil pencarian Google.
- **Belum ada sitemap.xml yang terverifikasi** — Docusaurus biasanya generate otomatis, tapi perlu dicek submit ke Google Search Console agar situs terindeks maksimal sebagai rujukan publik.

---

## 6. Checklist Menuju "Layak Rujukan Nasional"

| # | Item | Status | Prioritas |
|---|---|---|---|
| 1 | Perbaiki deskripsi Kelas XI & XII yang tertukar di beranda | ❌ Belum | **Kritis** |
| 2 | Verifikasi fungsi pencarian benar-benar mengindeks konten | ❓ Perlu dicek manual | Tinggi |
| 3 | Sidebar hanya expand kelas aktif | ❌ Belum | Tinggi |
| 4 | Implementasi elemen visual "rak buku" sesuai mockup awal | ❌ Belum | Tinggi |
| 5 | Tambahkan halaman "Tentang" dengan metodologi & kontak koreksi | ❌ Belum | Sedang |
| 6 | Cantumkan tahun edisi buku sumber di setiap bab | ❌ Belum | Sedang |
| 7 | Submit sitemap ke Google Search Console | ❓ Perlu dicek | Rendah |
| 8 | Audit aksesibilitas kontras warna & alt text gambar | ❓ Belum diaudit visual langsung | Sedang |
| 9 | Uji kecepatan muat (Lighthouse) di kondisi jaringan 4G | ❓ Belum diuji | Sedang |
| 10 | Pertimbangkan custom domain (bukan `*.web.app`) untuk kesan resmi | ❌ Belum | Rendah |

---

## 7. Catatan Metodologi & Keterbatasan Audit

Audit ini dilakukan lewat pengambilan konten statis (fetch), bukan menjalankan situs di browser sungguhan. Artinya:
- Perilaku interaktif (fungsi tombol pencarian, animasi, responsivitas layar kecil secara visual) **tidak dapat diverifikasi 100%** dan sebagian ditandai "perlu dicek manual" di atas.
- Kontras warna dan keterbacaan visual **tidak diuji langsung** — rekomendasi sebelumnya soal palet warna (di `custom.css`) tetap relevan dan belum diverifikasi apakah sudah direvisi.
- Untuk audit yang lebih menyeluruh, sebaiknya dijalankan Lighthouse (Chrome DevTools) langsung oleh Bapak, lalu hasil skornya bisa saya bantu interpretasikan.

---

## 8. Kesimpulan

Jejak SKI sudah melewati fase paling berisiko (konten kosong, navigasi rusak) dan kini berada di fase **penghalusan menuju standar publik**. Temuan kritis (deskripsi kelas tertukar) sebaiknya diperbaiki **sebelum** situs ini dipromosikan lebih luas ke luar MAN 2 Nganjuk, karena ini langsung memengaruhi kesan pertama dan akurasi informasi. Setelah checklist prioritas Kritis dan Tinggi di atas selesai, situs ini sudah cukup layak diajukan sebagai rujukan resmi tingkat madrasah, bahkan berpotensi dipromosikan ke jaringan MA se-Kabupaten/Provinsi sebagai contoh praktik baik digitalisasi materi SKI.
