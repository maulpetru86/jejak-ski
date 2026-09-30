/**
 * scripts/check-catalog.mjs
 * Validasi integritas kurikulum, frontmatter bab, dan kartu katalog.
 * Dijalankan di CI dan lokal via: npm run check
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TOTAL_BAB, BAB_DATA } from '../src/data/kurikulum.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

function parseYamlList(yamlText, fieldName) {
  const regex = new RegExp(`^${fieldName}:\\s*\\r?\\n((?:\\s*-\\s*.+\\r?\\n?)*)`, 'm');
  const match = yamlText.match(regex);
  if (!match || !match[1]) return [];
  return match[1]
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.startsWith('-'))
    .map(line => line.replace(/^-\s*['"]?/, '').replace(/['"]?$/, '').trim());
}

function parseFrontmatter(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/^\uFEFF/, '');
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) {
    throw new Error(`Frontmatter tidak ditemukan pada berkas: ${filePath}`);
  }
  const fmText = fmMatch[1];

  const getField = (name) => {
    const m = fmText.match(new RegExp(`^${name}:\\s*['"]?(.+?)['"]?\\s*$`, 'm'));
    return m ? m[1] : null;
  };

  return {
    kelas: getField('kelas'),
    bab_nomor: parseInt(getField('bab_nomor'), 10),
    judul: getField('judul'),
    tokoh_terkait: parseYamlList(fmText, 'tokoh_terkait'),
    istilah_kunci: parseYamlList(fmText, 'istilah_kunci'),
    content,
  };
}

let hasError = false;

for (const kelas of ['X', 'XI', 'XII']) {
  const kelasLower = kelas.toLowerCase();
  const kelasDir = path.join(rootDir, 'docs', `kelas-${kelasLower}`);
  const expectedTotal = TOTAL_BAB[kelas];
  const expectedBabList = BAB_DATA[kelas];

  // 1. Periksa jumlah berkas bab
  const babFiles = fs.readdirSync(kelasDir)
    .filter(f => /^bab-\d+.*\.md$/.test(f))
    .sort();

  if (babFiles.length !== expectedTotal) {
    console.error(`❌ Kelas ${kelas}: jumlah berkas bab (${babFiles.length}) != TOTAL_BAB (${expectedTotal})`);
    hasError = true;
  }

  // 2. Periksa kecocokan data tiap bab
  for (let i = 0; i < expectedBabList.length; i++) {
    const exp = expectedBabList[i];
    const file = babFiles.find(f => f.startsWith(`bab-${exp.nomor}-`));

    if (!file) {
      console.error(`❌ Kelas ${kelas} Bab ${exp.nomor}: berkas slug '${exp.slug}.md' tidak ditemukan`);
      hasError = true;
      continue;
    }

    const filePath = path.join(kelasDir, file);
    try {
      const parsed = parseFrontmatter(filePath);

      if (parsed.tokoh_terkait.length !== exp.tokoh) {
        console.error(`❌ ${file}: jumlah tokoh_terkait (${parsed.tokoh_terkait.length}) != BAB_DATA (${exp.tokoh})`);
        hasError = true;
      }

      if (parsed.istilah_kunci.length !== exp.istilah) {
        console.error(`❌ ${file}: jumlah istilah_kunci (${parsed.istilah_kunci.length}) != BAB_DATA (${exp.istilah})`);
        hasError = true;
      }
    } catch (err) {
      console.error(`❌ Gagal membaca frontmatter ${file}:`, err.message);
      hasError = true;
    }
  }

  // 3. Periksa halaman index kelas
  const indexFile = path.join(kelasDir, 'index.md');
  if (fs.existsSync(indexFile)) {
    const indexContent = fs.readFileSync(indexFile, 'utf8');

    // Pastikan tidak ada <a href="/docs
    if (/<a\s+[^>]*href=["']\/docs/i.test(indexContent)) {
      console.error(`❌ ${indexFile} masih memuat tag <a href="/docs..."> biasa (harus menggunakan Link)`);
      hasError = true;
    }

    // Pastikan angka tokoh dan istilah di kartu cocok
    for (const exp of expectedBabList) {
      const pattern = new RegExp(`${exp.tokoh}\\s*Tokoh\\s*•[^\\d]*${exp.istilah}\\s*Istilah`, 'i');
      if (!pattern.test(indexContent)) {
        console.error(`❌ ${indexFile}: angka kartu Bab ${exp.nomor} tidak cocok dengan (${exp.tokoh} Tokoh • ${exp.istilah} Istilah)`);
        hasError = true;
      }
    }
  } else {
    console.error(`❌ Berkas index kelas tidak ditemukan: ${indexFile}`);
    hasError = true;
  }
}

if (hasError) {
  console.error('\n❌ Validasi katalog kurikulum GAGAL. Periksa kesalahan di atas.');
  process.exit(1);
} else {
  console.log('✅ Validasi katalog kurikulum SUKSES: Seluruh 16 bab, data kurikulum, dan kartu indeks sinkron!');
  process.exit(0);
}
