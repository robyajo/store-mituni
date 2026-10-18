# 📋 Product Requirements Document (PRD) — Store Mituni

> **Nama Proyek**: Store Mituni  
> **Status**: Active Development  
> **Versi**: 1.0.0  
> **Terakhir Diperbarui**: Oktober 2026  
> **Fungsi Utama**: Platform Marketing, Showcase, & Penjualan Resmi Seluruh Produk Digital Ekosistem Mituni  

---

## 1. Executive Summary & Visi Produk

**Store Mituni** adalah platform e-commerce dan marketing hub terpusat untuk menampilkan, memasarkan, dan menjual seluruh portofolio produk digital yang dikembangkan dalam ekosistem **Mituni**.

Sebagai *single storefront*, Store Mituni dirancang untuk menyajikan pengalaman belanja digital yang modern, elegan, interaktif, dan terpercaya bagi para pelaku bisnis di Indonesia — mulai dari pengusaha laundry, streamer & agensi TikTok, seller marketplace, hingga pengembang perangkat lunak.

### Visi Produk
Menjadi etalase digital terdepan yang menghubungkan solusi teknologi terbaik Mituni dengan para pelaku bisnis dan kreator digital di Indonesia melalui pengalaman pemasaran yang persuasif, transparan, dan terotomatisasi.

### Tujuan Bisnis (Business Goals)
1. **Pusat Penjualan Terpadu**: Mengonsolidasikan penjualan lisensi software, langganan SaaS, API gateway, dan add-on dari seluruh divisi Mituni ke dalam satu platform.
2. **Konversi Penjualan Tinggi**: Menyediakan alur checkout instan (QRIS, VA Bank, E-Wallet) dan integrasi langsung konsultasi WhatsApp untuk menangani calon pembeli enterprise.
3. **Showcase Interaktif**: Menyajikan demo langsung (*interactive product preview*), kalkulator estimasi ROI, dan tabel komparasi fitur yang transparan untuk meningkatkan kepercayaan pelanggan.
4. **Pemberian Lisensi & Pengiriman Otomatis**: Menghadirkan sistem aktivasi lisensi otomatis setelah pembayaran terverifikasi.

---

## 2. Portofolio Produk Digital Mituni (Katalog Utama)

Store Mituni melayani pemasaran dan penjualan untuk seluruh produk digital dalam ekosistem Mituni:

### 1. 🧺 Mituni Laundry Management SaaS (Mituni POS & Dashboard)
* **Deskripsi**: Sistem manajemen operasional dan kasir (POS) berbasis cloud terlengkap untuk bisnis laundry (kiloan, satuan, sepatu, karpet).
* **Fitur Utama**:
  * Point of Sale (POS) kasir multi-cabang dengan cetak struk Bluetooth/Thermal.
  * Manajemen cucian, parfum, rak penyimpanan, dan pelacakan status pengerjaan.
  * Notifikasi otomatis via WhatsApp kepada pelanggan saat cucian diterima, diproses, dan selesai.
  * Laporan keuangan komprehensif, pencatatan pengeluaran harian, dan analitik omzet.
* **Model Monetisasi**: Langganan bulanan / tahunan (Tier: Basic, Pro, Multi-Branch Unlimited).

### 2. 🛰️ Mituni Live Stream Agent & TikTok Performance Suite
* **Deskripsi**: Infrastruktur otomatisasi dan analitik sesi live streaming TikTok real-time.
* **Fitur Utama**:
  * Konektor real-time ke TikTok Live API via WebSocket untuk menangkap data interaksi (Join, Chat, Gift, Like).
  * Sistem import & rekap performa live streaming otomatis dari laporan TikTok Shop (`Creator-Live-Performance`).
  * Perhitungan GMV per sesi, pembagian shift streamer (Pagi, Siang, Malam), efisiensi biaya iklan (ROAS).
* **Model Monetisasi**: Lisensi software mandiri (Self-Hosted) atau langganan cloud agent.

### 3. 📈 Mituni Marketing Analytics (TikTok Shop Intelligence)
* **Deskripsi**: Platform riset pasar dan analitik produk TikTok Shop Indonesia (terinspirasi dari FastMoss & Kalodata).
* **Fitur Utama**:
  * *Product Discovery*: Menemukan produk viral dan toko bertumbuh tinggi.
  * *Snapshot Engine*: Pelacakan harga, kenaikan penjualan (*sales velocity*), dan estimasi GMV secara berkala.
  * *Trending Score*: Algoritma penilaian tren produk berdasarkan pertumbuhan transaksi dan ulasan.
* **Model Monetisasi**: Akses keanggotaan premium analitik (Tier Mingguan, Bulanan, Agensi).

### 4. 📲 Kilex WhatsApp Gateway (Mituni WA Gateway)
* **Deskripsi**: Layanan server gateway WhatsApp API berkecepatan tinggi untuk kebutuhan notifikasi sistem dan pemasaran bisnis.
* **Fitur Utama**:
  * Kirim pesan teks, media, dokumen, dan template notifikasi otomatis via REST API.
  * Webhook untuk menerima pesan masuk dan integrasi bot interaktif.
  * Manajemen multi-device dan anti-disconnect guard.
* **Model Monetisasi**: Sewa server bulanan per nomor atau lisensi source code mandiri.

### 5. 🤖 Mituni AI Assistant & Automation Tools
* **Deskripsi**: Agen kecerdasan buatan untuk customer service otomatis dan ekstensi peramban otomatisasi tugas.
* **Fitur Utama**:
  * Asisten AI pintar yang terintegrasi dengan WhatsApp dan web store untuk melayani tanya jawab produk 24/7.
  * **Auto-Click Browser Extension**: Alat otomasi untuk mempercepat operasional marketplace dan klik rutin.
* **Model Monetisasi**: Pembelian satu kali (*lifetime purchase*) atau paket bundling.

---

## 3. Profil Pengguna & Persona Pembeli

| Persona | Profil & Karakteristik | Kebutuhan Utama | Produk Mituni yang Relevan |
| :--- | :--- | :--- | :--- |
| **Pak Budi (Laundry Owner)** | Pemilik usaha laundry 3 cabang, butuh sistem pencatatan rapi dan anti-curang. | Kasir mudah dipakai karyawan, notifikasi WA ke pelanggan, laporan laba rugi jelas. | Mituni Laundry SaaS, Kilex WA Gateway |
| **Rani (Live Streamer / Agency Leader)** | Memimpin tim streamer 10 orang dengan jadwal shift padat di TikTok Live. | Rekap GMV per jam otomatis, transparansi komisi streamer, bot chat live. | Mituni Live Stream Suite & Agent |
| **David (Affiliate & E-commerce Seller)** | Riset produk setiap hari untuk mencari peluang produk trending TikTok Shop. | Data akurat produk terlaris, kecepatan penjualan, proyeksi keuntungan. | Mituni Marketing Analytics Platform |
| **Bambang (CTO / Developer UMKM)** | Ingin mengintegrasikan sistem perusahaannya dengan gateway WhatsApp stabil. | Dokumentasi API lengkap, respons cepat, uptime tinggi, harga terjangkau. | Kilex WhatsApp Gateway API |

---

## 4. Fitur Utama Aplikasi Store Mituni

### 4.1 Halaman Depan & Showcase Interaktif (Hero & Marketing)
* **Dynamic Hero Section**: Desain visual premium bertema modern dark/light mode, menampilkan slogan tegas, nilai jual unik (*value propositions*), dan metrik ekosistem Mituni.
* **Interactive Product Catalog**:
  * Filter berdasarkan kategori: *SaaS Bisnis*, *Live Streaming*, *Analitik E-Commerce*, *API & Developer Tools*, *AI & Automation*.
  * Kartu produk (*Product Card*) interaktif dengan cuplikan fitur, label harga, status ketersediaan, serta tombol demo & beli langsung.
* **Interactive Live Preview & Demowall**: Modal cuplikan antarmuka dan video demonstrasi interaktif untuk tiap produk.
* **Kalkulator Nilai ROI**: Alat simulasi interaktif yang menghitung penghematan waktu dan peningkatan omzet jika memakai produk Mituni.

### 4.2 Detail Produk & Perbandingan Paket (Pricing & Comparison)
* **Halaman Khusus Produk (`/products/[slug]`)**:
  * Penjelasan mendalam fitur, spesifikasi teknis, tangkapan layar, dan arsitektur produk.
  * Tabel harga berjenjang (*tiered pricing*): Bulanan, Tahunan (hemat hingga 30%), atau Akses Seumur Hidup (*Lifetime*).
  * FAQ spesifik per produk.

### 4.3 Alur Pemesanan & Pembayaran (Instant Checkout)
* **Multi-Gateway Payment Integration**:
  * QRIS otomatis (Gopay, OVO, Dana, ShopeePay, BCA Mobile).
  * Virtual Account Bank (BCA, Mandiri, BRI, BNI).
  * Kartu Kredit / Debit Online.
* **Checkout Cepat**: Tanpa registrasi yang rumit; cukup masukkan Nama, Email, dan Nomor WhatsApp.
* **Integrasi Konsultasi WhatsApp Cepat**: Bagi paket Enterprise atau custom integration, tombol *Hubungi Sales via WhatsApp* langsung terisi pesan otomatis sesuai produk yang diminati.

### 4.4 Pengiriman Lisensi & Akses Digital
* **Pengiriman Otomatis**: Setelah status transaksi *settlement*, sistem secara otomatis menerbitkan:
  * Kunci lisensi (*license key*).
  * Tautan unduhan berkas instalasi / repositori akses / URL dashboard.
  * Tanda terima & faktur resmi (*invoice*) yang dikirim langsung ke WhatsApp dan Email pembeli.

### 4.5 Testimoni, Bukti Sosial, & Kepercayaan
* Menampilkan ulasan autentik dari para pemilik usaha laundry dan agensi live stream yang telah menggunakan produk Mituni.
* Status *real-time live ticker* transaksi atau aktivitas ekosistem yang terverifikasi.

---

## 5. Non-Functional Requirements (Kualitas & Standar)

1. **Asetetika & UX Tingkat Tinggi**:
   - Memenuhi standar desain premium: kontras warna harmonis, tipografi modern (Inter + Geist), animasi mikro yang halus, serta tata letak responsif (*mobile-first*).
2. **Kecepatan & Performa**:
   - Skor Google Lighthouse > 90 untuk Performa, Aksesibilitas, dan SEO.
   - Pemanfaatan Server Components Next.js untuk waktu muat halaman awal di bawah 1 detik.
3. **SEO & Metadata Optimization**:
   - Metadata lengkap (Title, Description, OpenGraph, Twitter Cards, Schema JSON-LD Product & SoftwareApplication).
4. **Keamanan**:
   - Enkripsi transmisi data via HTTPS/TLS.
   - Verifikasi tanda tangan kriptografi pada webhook pembayaran.
   - Sanitasi input dan proteksi terhadap serangan web standar (CSRF, XSS, rate-limiting).
