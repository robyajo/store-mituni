# 🛍️ Store Mituni — Digital Product Marketing & Sales Hub

**Store Mituni** adalah platform e-commerce dan pusat pemasaran resmi untuk seluruh portofolio produk digital dalam ekosistem **Mituni**. Aplikasi ini dirancang untuk menghadirkan etalase digital interaktif, komparasi paket langganan, demo langsung, serta alur transaksi instan (*checkout*) bagi para pelaku usaha, kreator, dan pengembang di Indonesia.

---

## 🌟 Ekosistem Produk Digital Mituni yang Dipasarkan

Store Mituni menjadi pusat katalog dan penjualan untuk produk-produk unggulan berikut:

1. **🧺 Mituni Laundry Management SaaS (Mituni POS & Dashboard)**
   - Sistem kasir (POS) dan manajemen operasional bisnis laundry terlengkap di Indonesia (multi-cabang, inventaris cucian/parfum/rak, notifikasi WhatsApp otomatis ke pelanggan, pembukuan keuangan, dan analitik performa).
2. **🛰️ Mituni Live Stream Agent & TikTok Live Performance Suite**
   - Infrastruktur analitik dan konektor real-time TikTok Live via WebSocket, dilengkapi modul import & rekap performa live streaming otomatis dari laporan TikTok Shop (`Creator-Live-Performance`), perhitungan GMV, shift streamer, dan efisiensi iklan.
3. **📈 Mituni Marketing Analytics (TikTok Shop Intelligence)**
   - Platform riset pasar dan intelijen e-commerce untuk menemukan produk viral, melacak kecepatan penjualan (*sales velocity*), estimasi GMV toko, dan skor tren produk TikTok Shop.
4. **📲 Kilex WhatsApp Gateway (Mituni WA Gateway)**
   - Layanan API Gateway WhatsApp berkecepatan tinggi untuk mengirimkan notifikasi sistem, OTP, status transaksi, dan pesan siaran (*broadcast*) bisnis dengan integrasi webhook yang andal.
5. **🤖 Mituni AI Assistant & Automation Tools**
   - Asisten kecerdasan buatan untuk customer service 24/7 dan ekstensi browser otomasi tugas operasional marketplace (*Auto-Clicker & Task Automator*).

---

## 🛠️ Tumpukan Teknologi (Tech Stack)

Aplikasi ini dibangun menggunakan arsitektur modern yang mengedepankan performa, aksesibilitas tinggi, dan estetika visual premium:

* **Framework**: [Next.js 16 (App Router)](https://nextjs.org) dengan React Server Components (RSC)
* **Library UI**: [React 19](https://react.dev)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + `tw-animate-css`
* **Komponen Primitif**: [Base UI (`@base-ui/react`)](https://base-ui.com) & [Shadcn UI](https://ui.shadcn.com)
* **Visualisasi & Grafik**: [Recharts](https://recharts.org) & [Lucide React Icons](https://lucide.dev)
* **Penyorot Kode**: [Shiki](https://shiki.style) (untuk dokumentasi API dan cuplikan integrasi)
* **Integrasi Pembayaran**: Midtrans Snap & Core API (QRIS, VA Bank, E-Wallet)
* **Notifikasi Transaksi**: Kilex WhatsApp Gateway REST API

---

## 📁 Struktur Direktori

```text
store-mituni/
├── .agents/                    # Customization rules & AI skills
│   ├── rules/                  # Project-wide AI rules (activity-sync, etc.)
│   └── skills/                 # Skills: activity-sync, shadcn, migrate-radix-to-base
├── app/                        # Next.js 16 App Router (pages, layout, globals.css)
├── components/                 # Komponen antarmuka pengguna
│   └── ui/                     # Koleksi komponen Shadcn / Base UI
├── DOCS/                       # Dokumentasi arsitektur dan bisnis
│   ├── prd.md                  # Product Requirements Document komprehensif
│   └── infra.md                # Spesifikasi infrastruktur, data model, & deployment
├── hooks/                      # Custom React hooks
├── lib/                        # Utilitas & helper aplikasi (cn, highlighter, dll)
├── public/                     # Aset statis publik (gambar, ikon, logo)
├── releases/                   # Catatan rilis harian dwibahasa (activity sync)
├── AGENTS.md                   # Panduan & aturan baku bagi seluruh AI Assistant
└── CLAUDE.md                   # Konfigurasi agen Claude Code
```

---

## 🚀 Memulai Pengembangan Lokal (Getting Started)

### Prasyarat
* Node.js v20+ atau v22+
* pnpm v9+ atau v12+

### Instalasi & Menjalankan Aplikasi

1. Pasang seluruh dependensi:
   ```bash
   pnpm install
   ```

2. Jalankan server pengembangan lokal:
   ```bash
   pnpm dev
   ```

3. Buka peramban Anda di [http://localhost:3000](http://localhost:3000).

### Script Berguna Lainnya

* `pnpm build`: Membangun bundle produksi Next.js.
* `pnpm lint`: Menjalankan pemeriksaan linter ESLint.
* `pnpm format`: Menjalankan pemformat kode otomatis via Prettier.
* `pnpm typecheck`: Memeriksa tipe data TypeScript tanpa membuat file emit (`tsc --noEmit`).

---

## 📚 Dokumentasi Terkait

* [Product Requirements Document (PRD)](DOCS/prd.md)
* [Spesifikasi Infrastruktur & Arsitektur](DOCS/infra.md)
* [Panduan AI & Activity Sync](AGENTS.md)
