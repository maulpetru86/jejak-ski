# SECURITY AUDIT & HARDENING PLAN — JEJAK SKI

**Project:** Jejak SKI  
**Repository:** `maulpetru86/jejak-ski`  
**Production:** `https://jejak-ski.web.app/`  
**Architecture:** Docusaurus + React + static build + Firebase Hosting  
**Audit mode:** Non-destructive / passive-first  
**Purpose:** Dokumen kerja yang dapat langsung diberikan kepada AI coding agent untuk audit, perbaikan, pengujian, dan verifikasi keamanan.

---

## 0. ATURAN KESELAMATAN AGENT

1. Jangan melakukan DDoS, flooding, brute force, credential stuffing, exploit persistence, atau aktivitas yang mengganggu layanan.
2. Jangan mencoba mengambil alih akun GitHub/Firebase atau layanan pihak ketiga.
3. Jangan menghapus file, branch, deployment, secret, atau konfigurasi produksi tanpa alasan teknis dan approval manusia bila diperlukan.
4. Jangan mengubah konten pembelajaran, URL publik, navigasi, atau UI/UX kecuali diperlukan untuk keamanan.
5. Jangan memasukkan secret/token/API key ke source code, commit, log, atau laporan.
6. Semua perubahan harus minimal, dapat direview, dapat di-revert, dan lolos build.
7. Pengujian eksternal harus low-volume/passive.
8. Bila vulnerability berpotensi mengganggu production, reproduksi di local/staging terlebih dahulu.

---

# 1. EXECUTIVE SUMMARY

Jejak SKI memiliki attack surface relatif kecil karena situs utamanya merupakan static build Docusaurus yang di-host pada Firebase Hosting. Ini mengurangi risiko dibanding aplikasi dengan database/API/login/upload/backend.

Fokus hardening:

- security headers
- npm dependency / supply-chain security
- secret exposure
- XSS/DOM XSS/unsafe MDX
- production artifact exposure
- Content Security Policy
- GitHub security
- GitHub Actions
- cache/error handling
- automated security regression

### Target severity

| Severity | Target |
|---|---|
| Critical | 0 |
| High | 0 known exploitable |
| Medium | 0–2 dengan mitigation terdokumentasi |
| Low | terdokumentasi |

**Jangan pernah menyatakan website 100% aman.** Gunakan: `No known security issue was found within the tested scope.`

---

# 2. BASELINE INVENTORY

Sebelum perubahan, jalankan:

```bash
git status --short
git branch --show-current
git remote -v
git ls-files
```

Identifikasi:

```text
package.json
package-lock.json / yarn.lock / pnpm-lock.yaml
firebase.json
.firebaserc
.gitignore
docusaurus.config.js
sidebars.js
src/
docs/
static/
.github/workflows/
```

Simpan baseline hasil audit di `security/` tanpa memasukkan secret.

---

# 3. SEC-001 — FIREBASE SECURITY HEADERS [HIGH]

Firebase Hosting mendukung custom response headers melalui `firebase.json`.

Periksa `firebase.json`. Jika belum ada, merge konfigurasi berikut tanpa menghapus konfigurasi existing:

```json
{
  "hosting": {
    "public": "build",
    "headers": [
      {
        "source": "**",
        "headers": [
          { "key": "X-Content-Type-Options", "value": "nosniff" },
          { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
          { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
          { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
        ]
      }
    ]
  }
}
```

**Catatan HSTS:** Firebase menyatakan konfigurasi HSTS pada default `*.web.app` dapat ditimpa oleh Hosting. Jangan menganggap HSTS berhasil pada subdomain default tanpa verifikasi response. Untuk custom domain, evaluasi HSTS setelah deployment.

Verifikasi:

```bash
npm run build
curl -I https://jejak-ski.web.app/
```

Expected minimal:

```text
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

# 4. SEC-002 — NPM DEPENDENCY SECURITY [HIGH]

Jalankan:

```bash
npm audit
npm outdated
npm ls --depth=0
```

Jika perlu:

```bash
npm audit --json > security/npm-audit.json
```

Rules:

- Jangan langsung `npm audit fix --force`.
- Patch/minor update diprioritaskan.
- Major upgrade harus diuji terpisah.
- Periksa apakah dependency vulnerable benar-benar masuk production bundle.
- Setelah perubahan: `npm install && npm run build`.

Untuk setiap finding catat:

```text
Package
Installed version
Affected range
Fixed version
Severity
Production relevance
Exploitability
Remediation
Residual risk
```

---

# 5. SEC-003 — SECRET / CREDENTIAL EXPOSURE [HIGH]

Cari secara aman:

```bash
git grep -nEi "(api[_-]?key|secret|password|passwd|token|private[_-]?key|client[_-]?secret|access[_-]?token)"
find . -type f \( -name '.env*' -o -name '*.pem' -o -name '*.key' -o -iname '*credentials*' -o -iname '*service-account*' \) -not -path './node_modules/*'
```

Jangan menampilkan isi secret.

Jika secret pernah masuk Git history:

1. Anggap credential compromised.
2. Rotate/revoke credential.
3. Bersihkan history hanya jika benar-benar diperlukan.
4. Jangan force-push production branch tanpa approval manusia.

---

# 6. SEC-004 — XSS / MDX / UNSAFE CONTENT [HIGH]

Audit:

```bash
grep -RniE "dangerouslySetInnerHTML|innerHTML|outerHTML|eval\\(|new Function|javascript:|onerror=|onload=|onclick=|<script|<iframe|<object|<embed" src docs static docusaurus.config.js --exclude-dir=node_modules
```

Periksa semua `.md` dan `.mdx`.

Rules:

- Hindari `dangerouslySetInnerHTML` kecuali benar-benar diperlukan.
- Jangan memasukkan query parameter/user input menjadi raw HTML.
- Hindari inline JavaScript.
- External iframe/script harus memiliki alasan dan sumber yang jelas.

Acceptance: tidak ada jalur user-controlled input → executable HTML/JS.

---

# 7. SEC-005 — PRODUCTION ARTIFACT EXPOSURE [MEDIUM]

Pastikan Firebase hanya deploy `build`.

Jangan deploy:

```text
.
src/
docs/
node_modules/
.git/
.github/
```

Uji low-volume setelah deploy:

```text
/.git/config
/.env
/.env.local
/package.json
/firebase.json
/docusaurus.config.js
/src/
/docs/
/node_modules/
/.github/
```

Expected: `404` atau tidak ada disclosure sensitif.

---

# 8. SEC-006 — CONTENT SECURITY POLICY [MEDIUM/HIGH]

Jangan langsung memasang CSP ketat.

Inventaris resource:

```bash
grep -RniE "https://|http://|<script|<iframe|<img|<link|@import" src docs static docusaurus.config.js
```

Kelompokkan:

```text
self
fonts
images
analytics
search
video/embed
other
```

Jika memungkinkan mulai dengan Report-Only. Setelah compatibility test, enforce policy.

Baseline konseptual (HARUS disesuaikan):

```text
default-src 'self';
base-uri 'self';
object-src 'none';
frame-ancestors 'self';
img-src 'self' data: https:;
font-src 'self' https:;
style-src 'self' 'unsafe-inline' https:;
script-src 'self' 'unsafe-inline' https:;
connect-src 'self' https:;
```

Jangan menambahkan `unsafe-eval` tanpa bukti kebutuhan.

---

# 9. SEC-007 — GITHUB SECURITY [MEDIUM/HIGH]

Periksa/aktifkan jika tersedia:

- Dependabot alerts
- Dependabot security updates
- Secret scanning
- Push protection
- Code scanning / CodeQL
- `SECURITY.md`

Tambahkan `SECURITY.md`:

```markdown
# Security Policy

## Supported Versions

Security fixes are applied to the current production branch.

## Reporting a Vulnerability

Please do not disclose security vulnerabilities publicly in GitHub Issues.

Report suspected vulnerabilities privately to the repository maintainer.

Include:
- affected URL/file
- reproduction steps
- impact
- screenshots/logs when safe
- suggested mitigation

Do not include passwords, tokens, or other secrets.
```

---

# 10. SEC-008 — GITHUB ACTIONS [MEDIUM]

Audit:

```bash
find .github/workflows -type f -maxdepth 2 -print
```

Periksa:

- `permissions`
- `secrets`
- `pull_request_target`
- fork PR
- `actions/checkout`
- Firebase deploy
- third-party actions

Target minimal:

```yaml
permissions:
  contents: read
```

Jangan deploy production dari untrusted PR. Jangan expose Firebase credential ke fork PR. Pin third-party action ke commit SHA jika practical.

---

# 11. SEC-009 — 404 / ERROR HANDLING [LOW/MEDIUM]

Jika belum ada, buat custom `404.html` yang tidak membocorkan:

- filesystem path
- stack trace
- environment variables
- internal Firebase details

Tetap sesuai visual Jejak SKI dan menyediakan link kembali ke homepage.

---

# 12. SEC-010 — CACHE POLICY [LOW/MEDIUM]

Periksa generated filenames.

Target:

```text
HTML/index/404 → short/no-cache strategy
hashed JS/CSS/assets → long cache
```

Jangan memberikan immutable cache pada HTML yang harus segera berubah setelah deployment.

---

# 13. PRODUCTION VERIFICATION

Gunakan request low-volume saja.

```bash
curl -I https://jejak-ski.web.app/
curl -I https://jejak-ski.web.app/404-test
```

Periksa:

- HTTPS
- status code
- content-type
- security headers
- redirect behavior
- cache-control
- disclosure

Jangan menyimpulkan vulnerability hanya karena sebuah header tidak ada; verifikasi dampaknya.

---

# 14. SECURITY TEST MATRIX

| Test | Expected |
|---|---|
| Homepage | 200 |
| Kelas X | 200 |
| Kelas XI | 200 |
| Kelas XII | 200 |
| Search | berfungsi |
| Mobile | berfungsi |
| `/.env` | 404/no disclosure |
| `/.git/config` | 404/no disclosure |
| `/src/` | 404/no source disclosure |
| `/docs/` | 404/no source disclosure |
| `/node_modules/` | 404 |
| Security headers | sesuai policy |
| Build | sukses |
| npm audit | findings documented/fixed |
| Secret scan | no exposed production secret |

---

# 15. MASTER PROMPT UNTUK AI CODING AGENT

```text
Anda adalah Senior Web Application Security Engineer sekaligus Senior Docusaurus/Firebase Engineer.

Tugas: SECURITY HARDENING repository Jejak SKI.
Repository: maulpetru86/jejak-ski
Production: https://jejak-ski.web.app/
Architecture: Docusaurus + React + static build + Firebase Hosting.

Tujuan: mengurangi attack surface tanpa merusak fungsi, URL, materi, navigasi, desain UI/UX, dan deployment.

ATURAN WAJIB:
- Jangan DDoS/flooding/brute force.
- Jangan exploit destruktif.
- Jangan mengambil alih akun/layanan.
- Jangan hapus data/secret/deployment produksi otomatis.
- Jangan commit secret.
- Jangan gunakan npm audit fix --force.
- Jangan major-upgrade massal tanpa alasan dan test.
- Semua perubahan harus minimal, dapat direview, dan dapat di-revert.

PHASE 1: inventory repository.
PHASE 2: npm audit + dependency analysis.
PHASE 3: secret scan dan Git history review tanpa menampilkan secret.
PHASE 4: XSS/MDX/DOM injection audit.
PHASE 5: Firebase Hosting hardening; pastikan public=build dan tambahkan security headers.
PHASE 6: audit external resources lalu desain CSP yang kompatibel; jangan mematikan Docusaurus/search/fonts.
PHASE 7: audit GitHub security; Dependabot, secret scanning, push protection, CodeQL, SECURITY.md.
PHASE 8: audit GitHub Actions; least privilege dan no production deploy dari untrusted PR.
PHASE 9: cek production artifact exposure.
PHASE 10: npm run build.
PHASE 11: regression test homepage, Kelas X/XI/XII, search, image, CSS, mobile.
PHASE 12: passive production verification.
PHASE 13: buat SECURITY_AUDIT.md.

Pada setiap perubahan:
1. Jelaskan finding.
2. Tampilkan file yang berubah.
3. Tampilkan diff penting.
4. Jalankan test.
5. Jika gagal, rollback/fix sebelum lanjut.

Final report wajib berisi:
- Executive Summary
- Findings per severity
- Dependency audit
- Secret audit
- XSS/MDX audit
- Firebase audit
- Security headers
- CSP
- GitHub security
- GitHub Actions
- Production verification
- Files changed
- Build result
- Remaining risks
- Manual actions

Jangan menyatakan 100% secure. Gunakan istilah "No known security issue was found within the tested scope" jika memang seluruh scope berhasil diverifikasi.
```

---

# 16. PROMPT PERBAIKAN FIREBASE

```text
Audit firebase.json Jejak SKI.

Pastikan hosting hanya deploy build directory dan pertahankan semua konfigurasi existing.
Tambahkan secara aman:
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()

Jangan menambahkan CORS * tanpa kebutuhan.
Jangan mengubah domain/project.
Jangan menghapus rewrite/redirect existing.

Setelah edit:
npm run build

Tampilkan diff firebase.json dan hasil build.
```

---

# 17. PROMPT PERBAIKAN DEPENDENCY

```text
Audit dependency Jejak SKI.
Jalankan npm audit, npm outdated, npm ls --depth=0.

Untuk setiap vulnerability jelaskan package, version, severity, affected range, fixed version, production relevance, exploitability, remediation.

Perbaiki patch/minor yang aman.
Jangan gunakan npm audit fix --force.
Jangan major upgrade massal.

Setelah perubahan:
npm install
npm run build

Pastikan Docusaurus tetap berjalan.
```

---

# 18. PROMPT PERBAIKAN XSS/MDX

```text
Audit src/, docs/, static/, dan docusaurus.config.js terhadap XSS.
Cari dangerouslySetInnerHTML, innerHTML, outerHTML, eval, new Function, javascript:, event handler inline, script, iframe, object, embed.

Pastikan tidak ada user-controlled input yang menjadi executable HTML/JS.

Jika ditemukan:
- beri severity
- beri file/line
- jelaskan exploit path
- gunakan perbaikan minimal
- jangan mengubah UI tanpa kebutuhan
- jalankan npm run build

Buat regression note untuk setiap fix.
```

---

# 19. PROMPT PERBAIKAN GITHUB ACTIONS

```text
Audit .github/workflows/*.yml.
Periksa permissions, secrets, pull_request_target, fork PR, checkout, npm scripts, Firebase deploy, third-party actions.

Target:
- least privilege
- no production deploy dari untrusted PR
- no secret exposure
- minimal GitHub token permissions
- pin third-party actions ke SHA jika practical

Jangan mengubah deployment behavior selain yang diperlukan untuk keamanan.
Laporkan workflow yang masih membutuhkan manual approval.
```

---

# 20. DEFINITION OF DONE

```text
[ ] npm audit selesai
[ ] dependency risk didokumentasikan
[ ] 0 known Critical
[ ] 0 known exploitable High
[ ] secret scan selesai
[ ] no exposed production secret
[ ] XSS/MDX audit selesai
[ ] Firebase headers diperkuat
[ ] CSP dianalisis/diperbaiki jika kompatibel
[ ] production artifact tidak membocorkan source sensitif
[ ] GitHub Actions diaudit
[ ] GitHub security diperiksa
[ ] SECURITY.md tersedia
[ ] npm run build berhasil
[ ] homepage tetap bekerja
[ ] Kelas X tetap bekerja
[ ] Kelas XI tetap bekerja
[ ] Kelas XII tetap bekerja
[ ] search tetap bekerja
[ ] mobile tetap bekerja
[ ] production verification selesai
[ ] SECURITY_AUDIT.md diperbarui
```

---

# 21. REFERENCES

- Firebase Hosting configuration: https://firebase.google.com/docs/hosting/full-config
- GitHub repository security: https://docs.github.com/en/code-security/getting-started/quickstart-for-securing-your-repository
- Repository: https://github.com/maulpetru86/jejak-ski
- Production: https://jejak-ski.web.app/

**Status dokumen:** Security hardening specification. Bukan sertifikasi keamanan atau penetration-test certification.
