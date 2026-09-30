/**
 * scripts/make-og-image.mjs
 * Konversi static/img/og-image.svg → static/img/og-image.png (1200×630 px)
 * Jalankan: node scripts/make-og-image.mjs
 * Diperlukan setiap og-image.svg berubah.
 */
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath = join(__dirname, '..', 'static', 'img', 'og-image.svg');
const pngPath = join(__dirname, '..', 'static', 'img', 'og-image.png');

const svgData = readFileSync(svgPath, 'utf-8');

const resvg = new Resvg(svgData, {
  fitTo: { mode: 'width', value: 1200 },
});

const pngData = resvg.render();
const pngBuffer = pngData.asPng();
writeFileSync(pngPath, pngBuffer);

const kb = Math.round(pngBuffer.length / 1024);
console.log(`✅ og-image.png berhasil dibuat: ${kb} KB → ${pngPath}`);
