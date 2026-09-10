# Jejak SKI — Portal Referensi Sejarah Kebudayaan Islam

Portal referensi materi Sejarah Kebudayaan Islam (SKI) untuk siswa Madrasah Aliyah (MAN 2 Nganjuk), berbasis Docusaurus dan di-hosting melalui Firebase Hosting.

---

## 📖 Panduan Pengelola Konten (Untuk Admin)

Situs ini dirancang agar mudah diperbarui oleh admin tanpa perlu keahlian pemrograman mendalam. Seluruh materi disimpan dalam file **Markdown (`.md`)** di dalam folder `docs/`.

### Struktur Folder Materi

```text
docs/
├── kelas-x/      # Materi SKI Kelas X (6 bab)
├── kelas-xi/     # Materi SKI Kelas XI (5 bab)
└── kelas-xii/    # Materi SKI Kelas XII (5 bab)
```

---

### Alur Kerja Pembaruan Konten (Langkah demi Langkah)

Setiap kali Anda ingin menambah atau mengedit rangkuman bab, ikuti 5 langkah sederhana berikut:

#### 1. Sinkronisasi Perubahan Terbaru
Buka terminal (PowerShell / Command Prompt) di folder proyek ini, lalu jalankan:
```bash
git pull origin main
```

#### 2. Edit atau Buat File Materi
- Buka folder `docs/kelas-x/`, `docs/kelas-xi/`, atau `docs/kelas-xii/`.
- Edit file bab yang diinginkan menggunakan VS Code atau editor teks lainnya.
- **Pastikan bagian atas file (Frontmatter) selalu diisi lengkap** sesuai format:

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
ringkasan_singkat: "Satu atau dua kalimat preview rangkuman bab."
terakhir_diperbarui: "2026-09-11"
---
```

- **Format Isi Bab:**
  1. **Konteks Singkat** (gambaran umum bab)
  2. **Poin-Poin Kunci** (daftar bullet poin ringkas)
  3. **Istilah Kunci** (makna istilah penting)
  4. **Tokoh Terkait** (peran tokoh)

> **PENTING (Hak Cipta):** Gunakan bahasa rangkuman / parafrase sendiri. Jangan menyalin kalimat panjang langsung dari buku secara verbatim.

#### 3. Simpan Riwayat Perubahan ke Git
Setelah selesai mengedit, simpan riwayat perubahan agar aman dari kehilangan data:
```bash
git add .
git commit -m "Update materi Kelas X Bab 1"
git push origin main
```

#### 4. Uji Tampilan Lokal (Opsional tapi Direkomendasikan)
Untuk melihat tampilan di laptop sebelum diunggah ke internet:
```bash
npm run start
```
Buka browser di alamat: `http://localhost:3000`. Jika sudah selesai, tekan `Ctrl + C` di terminal untuk menghentikan.

#### 5. Publikasikan ke Internet (Deploy)
Jika materi sudah rapi dan siap dibaca siswa:
```bash
npm run build
firebase deploy
```
Situs langsung terbarui di alamat: [https://jejak-ski.web.app](https://jejak-ski.web.app).

---

## 🛠️ Perintah Berguna untuk Pengembang

| Perintah | Fungsi |
|---|---|
| `npm run start` | Menjalankan server lokal untuk preview langsung (hot-reload) |
| `npm run build` | Melakukan kompilasi file statis ke folder `build/` |
| `npm run serve` | Menjalankan preview dari hasil build statis di folder `build/` |
| `firebase deploy` | Mengunggah isi folder `build/` ke Firebase Hosting |

---

## 📜 Lisensi & Sumber Referensi
- **Sumber Materi:** Buku Siswa SKI Kelas X, XI, XII terbitan Kementerian Agama Republik Indonesia.
- **Pengembang & Pengelola:** Muhamad Maulana Rokhim, S.Pd. — MAN 2 Nganjuk.
