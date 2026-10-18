<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 🛍️ Store Mituni — AI & Engineering Handbook

Dokumen ini adalah **Single Source of Truth** bagi AI saat merancang, menulis kode, membuat komponen, atau menjawab pertanyaan teknis di repositori ini.

---

## 1. 🏢 Identitas & Tujuan Proyek

* **Nama Aplikasi**: **Store Mituni**
* **Peran Aplikasi**: Platform e-commerce, marketing showcase, dan penjualan resmi seluruh portofolio produk digital dalam ekosistem **Mituni**.
* **Target Pengguna**: Pengusaha laundry UMKM, agensi/kreator TikTok live stream, penjual e-commerce/marketplace, dan pengembang perangkat lunak di Indonesia.
* **Tumpukan Teknologi Utama**: Next.js 16 (App Router), React 19, Tailwind CSS v4, Base UI (`@base-ui/react`), Shadcn UI, Lucide Icons, Recharts, Shiki.
* **Dokumentasi Lengkap**:
  * [Product Requirements Document (PRD)](file:///Users/robykartis/Documents/ROBY/GITHUB/MITUNI/MITUNI/STORE/store-mituni/DOCS/prd.md)
  * [Spesifikasi Arsitektur & Infrastruktur](file:///Users/robykartis/Documents/ROBY/GITHUB/MITUNI/MITUNI/STORE/store-mituni/DOCS/infra.md)

---

## 2. 🌐 Pengetahuan Ekosistem Produk Digital Mituni

AI **wajib memahami** seluruh produk yang dipasarkan dan dijual di Store Mituni:

1. **🧺 Mituni Laundry Management SaaS (Mituni POS & Dashboard)**:
   - SaaS manajemen operasional dan kasir (POS) laundry terlengkap di Indonesia.
   - Fitur: POS multi-cabang, inventaris cucian/rak/parfum, notifikasi WhatsApp otomatis ke pelanggan saat cucian selesai, pembukuan laba-rugi, dan manajemen hak akses karyawan.
2. **🛰️ Mituni Live Stream Agent & TikTok Live Performance Suite**:
   - Infrastruktur analitik dan konektor real-time TikTok Live via WebSocket (Socket.io).
   - Fitur: Menangkap event live (chat, gift, join), import & rekap performa otomatis dari file Excel TikTok Shop (`Creator-Live-Performance`), kalkulasi GMV per shift streamer, dan efisiensi iklan (ROAS).
3. **📈 Mituni Marketing Analytics (TikTok Shop Intelligence)**:
   - Platform intelijen pasar dan analitik produk TikTok Shop Indonesia (terinspirasi dari FastMoss/Kalodata).
   - Fitur: Product discovery, snapshot berkala untuk melacak harga dan *sales velocity*, serta *trending score* otomatis.
4. **📲 Kilex WhatsApp Gateway (Mituni WA Gateway)**:
   - Layanan API Gateway WhatsApp berkecepatan tinggi untuk notifikasi transaksi, OTP, dan pesan blast marketing bisnis dengan webhook responsif.
5. **🤖 Mituni AI Assistant & Automation Tools**:
   - Asisten AI cerdas untuk layanan pelanggan 24/7 dan ekstensi browser *Auto-Click* untuk otomasi tugas harian marketplace dan live streaming.

---

## 3. 🎨 Standar Desain, UI/UX & Kualitas Kode

1. **Estetika Visual Premium & Dynamic**:
   - Tampilan wajib memukau (*wow factor*): palet warna harmonis, dukungan Dark/Light mode elegan, gradien halus, dan mikro-animasi interaktif.
   - Menggunakan tipografi modern (Inter + Geist) dan tata letak responsif (*mobile-first*).
   - **DILARANG memakai placeholder**: selalu gunakan data dan teks yang realistis, kontekstual, dan berbahasa Indonesia yang profesional.
2. **Konvensi React 19 & Next.js 16**:
   - Utamakan **Server Components (RSC)** secara bawaan untuk kecepatan render awal dan efisiensi SEO.
   - Tambahkan direktif `"use client"` hanya pada komponen yang membutuhkan interaksi pengguna langsung (`useState`, `useEffect`, event handler).
   - Gunakan fungsi `cn()` dari `@/lib/utils` untuk manipulasi kelas Tailwind secara kondisional.
   - Komponen UI berbasis **Base UI** (`@base-ui/react`) dan **Shadcn UI**.

---

## Activity Sync — lapor kegiatan ke portfolio

Setiap selesai mengerjakan perubahan yang **dirasakan pengguna** (fitur baru, perbaikan bug, perubahan perilaku, rilis, deploy, hapus fitur), AI WAJIB mencatat di berkas rilis lalu mengirim satu entri kegiatan ke portfolio sebelum menyelesaikan tugas. Refactor internal, format, komentar, dan tes yang tak terlihat pengguna: jangan kirim.

1. Tulis/perbarui berkas rilis `releases/YYYY-MM-DD-*.json` memakai skill `release-notes` (folder `.agents/skills/activity-sync/release-notes/`): konsolidasi 1 berkas JSON per hari, dwibahasa (id + en), bahasa pelayanan publik — bebas istilah teknis/library/framework/database/file kode.
2. Muat skill `activity-sync` (`.agents/skills/activity-sync/SKILL.md`) dan ikuti alur CRUD di sana:
   - Cek proyek: `GET https://ajoroby.is-a.dev/api/projects?key=<KEY>`
   - Kirim isi berkas rilis `releases/*.json` apa adanya lewat `POST` dengan menambahkan `"project": {"name": "Store Mituni"}` (API yang memetakan `type`/`date`/`items` otomatis).
   - Ubah bila perlu (`PATCH /api/activities/<ID>`).
   - Hapus bila fitur dihapus di proyek (`DELETE /api/activities/<ID>`).
   - Verifikasi hasil (`GET https://ajoroby.is-a.dev/api/activities?slug=store-mituni` atau `GET https://ajoroby.is-a.dev/api/projects/store-mituni?key=<KEY>`), pastikan tidak dobel.
3. Kunci `X-project` proyek ini: baca dari berkas `.agents/skills/activity-sync/.ACTIVITY_PROJECT_KEYS` (baris `ACTIVITY_PROJECT_KEYS=<kunci>:<nama>`). JANGAN commit berkas kunci ke git, JANGAN tampilkan ke user kecuali diminta.
4. Setiap kiriman wajib dwibahasa (`id` + `en`), maksimal 300 karakter judul / 2000 karakter isi, bahasa pelayanan publik (dilarang menyebut library, framework, database, file kode, atau mekanisme internal).
5. Laporkan ke user: apa yang dikirim (id kegiatan), hasil verifikasi, dan apa pun yang gagal.

