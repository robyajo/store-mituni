export interface ProductPlan {
  id: string;
  name: string;
  billingCycle: "monthly" | "yearly" | "lifetime";
  price: number;
  discountPrice?: number;
  badge?: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: "saas" | "live-stream" | "marketing" | "gateway" | "ai";
  categoryLabel: string;
  badge: string;
  iconName: string;
  gradient: string;
  accentColor: string;
  highlights: string[];
  features: {
    title: string;
    description: string;
  }[];
  plans: ProductPlan[];
  stats: {
    label: string;
    value: string;
  }[];
  demoSnippet?: string;
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "mituni-laundry",
    slug: "mituni-laundry-saas",
    name: "Mituni Laundry SaaS",
    tagline: "Sistem Manajemen Kasir & Operasional Laundry Terlengkap",
    description:
      "Aplikasi berbasis web untuk otomasi seluruh siklus operasional bisnis laundry Anda: kasir multi-cabang, pelacakan cucian, manajemen inventaris rak & parfum, hingga notifikasi WhatsApp otomatis ke pelanggan saat cucian selesai.",
    category: "saas",
    categoryLabel: "SaaS Bisnis UMKM",
    badge: "Paling Populer",
    iconName: "Shirt",
    gradient: "from-cyan-500/20 via-teal-500/10 to-transparent",
    accentColor: "text-cyan-500",
    highlights: [
      "POS Kasir Multi-Cabang & Multi-Karyawan",
      "Notifikasi WhatsApp Otomatis ke Pelanggan",
      "Manajemen Inventaris Rak & Parfum",
      "Laporan Keuangan & Laba Rugi Real-Time",
    ],
    features: [
      {
        title: "Kasir POS Cepat & Cetak Struk",
        description: "Antarmuka kasir super responsif, mendukung printer thermal Bluetooth dan struk digital WhatsApp.",
      },
      {
        title: "Tracking Cucian Berbasis Rak & Parfum",
        description: "Cegah cucian hilang atau tertukar dengan penomoran rak dan pilihan aroma parfum yang terpantau jelas.",
      },
      {
        title: "Laporan Omzet & Pengeluaran Harian",
        description: "Dashboard grafik keuangan transparan untuk menghitung laba bersih tanpa pusing pembukuan manual.",
      },
      {
        title: "Notifikasi Otomatis Tanpa Pulsa SMS",
        description: "Kirim pesan ramah 'Cucian Anda Sudah Selesai' langsung ke WhatsApp pelanggan secara otomatis.",
      },
    ],
    plans: [
      {
        id: "laundry-starter",
        name: "Cabang Mandiri",
        billingCycle: "monthly",
        price: 99000,
        features: [
          "1 Cabang Aktif",
          "Hingga 3 Akun Kasir",
          "Manajemen Cucian & Rak",
          "Notifikasi WhatsApp 500 pesan/bln",
          "Laporan Keuangan Harian & Bulanan",
        ],
        ctaText: "Mulai 1 Cabang",
      },
      {
        id: "laundry-pro",
        name: "Multi-Cabang Pro",
        billingCycle: "monthly",
        price: 189000,
        discountPrice: 149000,
        badge: "Rekomendasi",
        isPopular: true,
        features: [
          "Hingga 5 Cabang Terintegrasi",
          "Jumlah Kasir Tak Terbatas",
          "Semua Fitur Starter",
          "Notifikasi WhatsApp Tanpa Batas",
          "Analitik Performa Karyawan",
          "Dukungan Prioritas 24/7",
        ],
        ctaText: "Pilih Paket Pro",
      },
      {
        id: "laundry-enterprise",
        name: "Jaringan Waralaba",
        billingCycle: "yearly",
        price: 1990000,
        features: [
          "Cabang & Kasir Unlimited",
          "Kustomisasi Domain & Brand Sendiri",
          "Integrasi Pembayaran QRIS Dinamis",
          "Dedicated Server & SLA 99.9%",
          "Onboarding & Training Karyawan",
        ],
        ctaText: "Hubungi Penjualan",
      },
    ],
    stats: [
      { label: "Cabang Aktif", value: "850+" },
      { label: "Transaksi/Bln", value: "350.000+" },
      { label: "Kepuasan Pemilik", value: "99.4%" },
    ],
  },
  {
    id: "mituni-livestream",
    slug: "mituni-livestream-agent",
    name: "Mituni Live Stream Suite",
    tagline: "Infrastruktur Analitik & Otomasi TikTok Live Streaming",
    description:
      "Tingkatkan penjualan live streaming TikTok dengan pelacakan performa real-time: konektor event WebSocket, rekap otomatis dari file Excel TikTok Shop, perhitungan GMV per shift host/streamer, dan efisiensi biaya iklan (ROAS).",
    category: "live-stream",
    categoryLabel: "Live Streaming & Agensi",
    badge: "Hot Trend",
    iconName: "Radio",
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    accentColor: "text-rose-500",
    highlights: [
      "Import Otomatis Creator-Live-Performance Excel",
      "Kalkulasi GMV & Durasi per Shift Streamer",
      "Analisis ROAS & Efisiensi Biaya Iklan Live",
      "Konektor Real-Time Event TikTok WebSocket",
    ],
    features: [
      {
        title: "Rekap Shift Streamer Sekali Klik",
        description: "Cukup unggah laporan ekspor TikTok, sistem langsung memisahkan omzet shift Pagi, Siang, dan Malam.",
      },
      {
        title: "Evaluasi Performa & Komisi Streamer",
        description: "Ketahui siapa streamer berkinerja tertinggi berdasarkan rata-rata GMV dan durasi tonton penonton.",
      },
      {
        title: "Monitoring Biaya Iklan vs Omzet",
        description: "Lacak rasio ROAS secara akurat untuk memastikan belanja iklan live TikTok menghasilkan keuntungan maksimal.",
      },
      {
        title: "WebSocket Live Listener Server",
        description: "Tangkap event penonton masuk, obrolan chat, dan gift secara langsung untuk memicu bot dan visual overlay.",
      },
    ],
    plans: [
      {
        id: "live-starter",
        name: "Creator Solo",
        billingCycle: "monthly",
        price: 149000,
        features: [
          "1 Akun TikTok Shop",
          "Import Excel Performa Harian",
          "Rekap GMV & Durasi Sesi",
          "Ekspor Laporan PDF/Excel",
        ],
        ctaText: "Mulai Creator",
      },
      {
        id: "live-agency",
        name: "Agensi Streamer Pro",
        billingCycle: "monthly",
        price: 349000,
        discountPrice: 289000,
        badge: "Paling Diminati Agensi",
        isPopular: true,
        features: [
          "Hingga 10 Akun TikTok Terkelola",
          "Manajemen Jadwal Shift Streamer",
          "Kalkulasi Komisi Streamer Otomatis",
          "Analisis ROAS & Iklan Berbayar",
          "Dukungan Server WebSocket Real-Time",
        ],
        ctaText: "Pilih Paket Agensi",
      },
      {
        id: "live-enterprise",
        name: "Enterprise Studio",
        billingCycle: "yearly",
        price: 3490000,
        features: [
          "Akun TikTok & Host Unlimited",
          "Custom Formula Perhitungan Bonus",
          "Integrasi Private Server PM2",
          "Dukungan Konsultan Dedicated",
        ],
        ctaText: "Konsultasi Agensi",
      },
    ],
    stats: [
      { label: "Sesi Live Teranalisis", value: "120.000+" },
      { label: "Total GMV Dipantau", value: "Rp 45M+" },
      { label: "Agensi Mitra", value: "70+" },
    ],
  },
  {
    id: "mituni-marketing",
    slug: "mituni-marketing-analytics",
    name: "Mituni Marketing Analytics",
    tagline: "Platform Intelijen Pasar & Produk Trending TikTok Shop",
    description:
      "Platform riset pasar produk TikTok Shop Indonesia (terinspirasi dari FastMoss & Kalodata). Temukan produk viral sebelum kompetitor, lacak kecepatan penjualan (sales velocity), estimasi GMV, dan pantau pertumbuhan toko kompetitor.",
    category: "marketing",
    categoryLabel: "Intelijen E-Commerce",
    badge: "Market Intelligence",
    iconName: "TrendingUp",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    accentColor: "text-amber-500",
    highlights: [
      "Product Discovery Produk Baru & Viral",
      "Snapshot Harga & Riwayat Penjualan Berkala",
      "Estimasi GMV & Sales Velocity Otomatis",
      "Skor Tren Cerdas (Trending Score)",
    ],
    features: [
      {
        title: "Deteksi Produk Naik Daun 24/7",
        description: "Crawler otomatis memantau jutaan data produk dan mengidentifikasi lonjakan penjualan tercepat setiap jam.",
      },
      {
        title: "Kalkulasi Sales Velocity & Delta",
        description: "Pahami percepatan unit terjual per menit untuk mengetahui apakah tren produk masih baru atau mulai mereda.",
      },
      {
        title: "Perangkingan Toko & Kategori",
        description: "Lihat toko mana yang mendominasi ceruk pasar Anda dan pelajari katalog produk unggulan mereka.",
      },
      {
        title: "Filter Fleksibel Berdasarkan Rentang Waktu",
        description: "Saring produk berdasarkan performa hari ini, 7 hari terakhir, atau 30 hari untuk riset persediaan stok.",
      },
    ],
    plans: [
      {
        id: "mkt-basic",
        name: "Affiliate Hunter",
        billingCycle: "monthly",
        price: 199000,
        features: [
          "Pencarian 10.000 Produk Viral",
          "Snapshot Data per 1 Jam",
          "Filter Kategori Dasar",
          "Daftar Top 50 GMV Harian",
        ],
        ctaText: "Mulai Riset",
      },
      {
        id: "mkt-pro",
        name: "Pro Seller & Brand",
        billingCycle: "monthly",
        price: 399000,
        discountPrice: 299000,
        badge: "Pilihan Seller",
        isPopular: true,
        features: [
          "Database Seluruh Produk Terindeks",
          "Snapshot Data Cepat (Tiap 15 Menit)",
          "Metrik Sales Velocity & Trending Score",
          "Pelacakan Toko Kompetitor",
          "Ekspor Data ke CSV/Excel",
        ],
        ctaText: "Akses Data Pro",
      },
      {
        id: "mkt-agency",
        name: "Enterprise Data Hub",
        billingCycle: "yearly",
        price: 3890000,
        features: [
          "Akses API Raw Data Langsung",
          "Multi-User Seat untuk Tim Riset",
          "Custom Alert Produk Viral via WhatsApp",
          "Dukungan Analis Data Khusus",
        ],
        ctaText: "Hubungi Sales",
      },
    ],
    stats: [
      { label: "Produk Terpantau", value: "250.000+" },
      { label: "Snapshot/Hari", value: "750.000+" },
      { label: "Seller & Marketer", value: "2.100+" },
    ],
  },
  {
    id: "kilex-wa-gateway",
    slug: "kilex-whatsapp-gateway",
    name: "Kilex WhatsApp Gateway",
    tagline: "API Gateway WhatsApp Handal & Cepat untuk Aplikasi Anda",
    description:
      "Kirim notifikasi transaksi, OTP, tagihan otomatis, dan pesan siaran marketing langsung dari sistem atau website Anda dengan REST API berkecepatan tinggi, webhook responsif, serta stabilitas multi-perangkat.",
    category: "gateway",
    categoryLabel: "API & Infrastruktur",
    badge: "High Performance",
    iconName: "MessageSquare",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accentColor: "text-emerald-500",
    highlights: [
      "RESTful API Mudah Diintegrasikan (CURL, JS, PHP, Python)",
      "Kirim Pesan Teks, Gambar, Dokumen, & Tombol",
      "Webhook Instan untuk Menerima Pesan Balasan",
      "Auto-Reconnect & Proteksi Sesi Stabil",
    ],
    features: [
      {
        title: "Integrasi Mudah dalam 5 Menit",
        description: "Cukup panggil endpoint POST JSON dengan API Key Anda, pesan terkirim dalam hitungan detik.",
      },
      {
        title: "Koneksi Multi-Device Stabil",
        description: "Didukung mekanisme heartbeat pintar yang menjaga sesi WhatsApp Web Anda tetap tersambung tanpa logout tiba-tiba.",
      },
      {
        title: "Penerimaan Pesan via Webhook",
        description: "Terima pesan masuk pelanggan dan respons secara otomatis memakai bot atau sistem AI Anda.",
      },
      {
        title: "Tanpa Biaya Per-Pesan Mahal",
        description: "Gunakan kuota pengiriman fleksibel tanpa biaya tarif per-pesan resmi yang membebani margin bisnis Anda.",
      },
    ],
    plans: [
      {
        id: "wa-dev",
        name: "Developer Starter",
        billingCycle: "monthly",
        price: 79000,
        features: [
          "1 Nomor WhatsApp Terhubung",
          "Kapasitas 10.000 Pesan / Bulan",
          "REST API Lengkap & Webhook",
          "Dokumentasi Kode Komprehensif",
        ],
        ctaText: "Mulai Hubungkan",
      },
      {
        id: "wa-biz",
        name: "Business Gateway",
        billingCycle: "monthly",
        price: 179000,
        discountPrice: 139000,
        badge: "Pilihan Bisnis",
        isPopular: true,
        features: [
          "Hingga 3 Nomor WhatsApp Aktif",
          "Pesan Tanpa Batas (*Fair Usage*)",
          "Kirim Media Gambar, PDF, & File",
          "Anti-Banned Delay & Queue Engine",
          "Prioritas Bandwidth Tinggi",
        ],
        ctaText: "Pilih Business",
      },
      {
        id: "wa-source",
        name: "Lisensi Server Mandiri",
        billingCycle: "lifetime",
        price: 890000,
        features: [
          "Full Source Code Backend & Frontend",
          "Pasang di VPS / Server Sendiri",
          "Nomor WhatsApp Tak Terbatas",
          "Bebas Biaya Bulanan Selamanya",
          "Gratis Pembaruan Script 1 Tahun",
        ],
        ctaText: "Beli Source Code",
      },
    ],
    stats: [
      { label: "Pesan Terkirim", value: "18 Juta+" },
      { label: "Uptime Gateway", value: "99.95%" },
      { label: "Waktu Kirim Rata-rata", value: "< 1.2s" },
    ],
  },
  {
    id: "mituni-ai-tools",
    slug: "mituni-ai-assistant-tools",
    name: "Mituni AI & Automation Tools",
    tagline: "Agen Cerdas Customer Support 24/7 & Browser Task Automator",
    description:
      "Kombinasi asisten kecerdasan buatan berbasis LLM untuk menjawab pertanyaan pelanggan secara natural 24/7 di WhatsApp, dipadukan dengan ekstensi browser Auto-Click untuk otomatisasi tugas rutin marketplace dan live streaming.",
    category: "ai",
    categoryLabel: "Kecerdasan Buatan & Tools",
    badge: "AI Powered",
    iconName: "Cpu",
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
    accentColor: "text-indigo-500",
    highlights: [
      "Asisten AI Pintar Berbasis Knowledge Base Produk",
      "Integrasi Langsung ke WhatsApp & Live Chat Web",
      "Auto-Click Browser Extension untuk Otomasi Tugas",
      "Tanpa Perlu Coding untuk Melatih AI Anda",
    ],
    features: [
      {
        title: "Customer Support Tanpa Libur",
        description: "Layani pertanyaan harga, cek stok, dan panduan produk secara ramah dalam Bahasa Indonesia yang luwes.",
      },
      {
        title: "Pelatihan Cepat dengan Dokumen PDF/Teks",
        description: "Unggah katalog atau SOP bisnis Anda; AI akan langsung memahami informasi bisnis dalam hitungan menit.",
      },
      {
        title: "Ekstensi Browser Auto-Click",
        description: "Otomasi tindakan berulang seperti pin produk saat live stream, konfirmasi pesanan, dan klik otomatis.",
      },
      {
        title: "Eskalasi ke Operator Manusia",
        description: "Jika calon pembeli meminta berbicara dengan tim penjualan, AI otomatis meneruskan kontak ke tim Anda.",
      },
    ],
    plans: [
      {
        id: "ai-starter",
        name: "Auto-Clicker Tool",
        billingCycle: "lifetime",
        price: 99000,
        features: [
          "Lisensi Ekstensi Chrome (.crx)",
          "Fitur Auto Click & Interval Scheduler",
          "Pembaruan Script Seumur Hidup",
          "Panduan Pemasangan Video",
        ],
        ctaText: "Beli Lisensi",
      },
      {
        id: "ai-cs-agent",
        name: "AI CS WhatsApp",
        billingCycle: "monthly",
        price: 249000,
        discountPrice: 199000,
        badge: "Paling Produktif",
        isPopular: true,
        features: [
          "Agen AI Terintegrasi WhatsApp",
          "Kapasitas 3.000 Percakapan / Bulan",
          "Kustomisasi Pengetahuan Bisnis",
          "Termasuk Lisensi Auto-Clicker",
          "Dukungan Setup Awal",
        ],
        ctaText: "Pilih AI CS",
      },
      {
        id: "ai-custom",
        name: "Enterprise Custom AI",
        billingCycle: "yearly",
        price: 2490000,
        features: [
          "Percakapan Unlimited",
          "Fine-Tuned Model Khusus Bisnis",
          "Integrasi Database Produk & CRM",
          "Private Hosting & Dedicated Support",
        ],
        ctaText: "Konsultasi AI",
      },
    ],
    stats: [
      { label: "Percakapan Dilayani", value: "450.000+" },
      { label: "Respon Chat", value: "< 2 Detik" },
      { label: "Penghematan Jam Kerja", value: "70%" },
    ],
  },
];

export const TESTIMONIALS = [
  {
    name: "H. Sudirman",
    role: "Pemilik Berkah Laundry (4 Cabang)",
    city: "Surabaya",
    product: "Mituni Laundry SaaS",
    quote:
      "Dulu sering sekali nota hilang atau cucian pelanggan tertukar saat jam sibuk. Sejak pakai Mituni Laundry SaaS, semua status cucian dan penempatan rak jadi rapi. Pelanggan juga senang karena dapat WhatsApp otomatis saat cucian siap diambil!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Clara Salsabila",
    role: "Founder Veloce Streamer Agency",
    city: "Jakarta Barat",
    product: "Mituni Live Stream Suite",
    quote:
      "Mengelola 14 host live streaming dengan 3 shift harian tadinya makan waktu 3 jam tiap malam hanya untuk rekap Excel TikTok. Dengan Mituni Live Suite, cukup drag and drop file ekspor, GMV dan komisi tiap streamer langsung terhitung otomatis. Sangat menghemat waktu tim kami!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Rian Hidayat",
    role: "Top Affiliate & Brand Owner",
    city: "Bandung",
    product: "Mituni Marketing Analytics",
    quote:
      "Data trending score dan sales velocity-nya sangat presisi. Saya bisa mengetahui produk mana yang mulai naik daun 3 hari sebelum menjadi viral di FYP. Return of Investment (ROI) dari belanja iklan saya naik lebih dari 2.5 kali lipat.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Edwin Pradana",
    role: "Lead Software Engineer",
    city: "Yogyakarta",
    product: "Kilex WhatsApp Gateway",
    quote:
      "API-nya sangat bersih dan dokumentasinya ramah pengembang. Kami mengintegrasikannya dengan aplikasi internal perusahaan untuk notifikasi invoice. Uptime-nya konsisten di atas 99.9% tanpa perlu sering re-login QR code.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
  },
];

export const FAQS = [
  {
    question: "Apakah saya bisa mencoba produk Mituni terlebih dahulu sebelum membeli?",
    answer:
      "Tentu saja! Kami menyediakan sesi demonstrasi langsung (live demo) untuk Mituni Laundry SaaS dan Mituni Live Stream Suite. Anda juga dapat berkonsultasi langsung dengan tim spesialis kami melalui WhatsApp untuk mendapatkan uji coba akun.",
  },
  {
    question: "Metode pembayaran apa saja yang didukung di Store Mituni?",
    answer:
      "Store Mituni mendukung pembayaran otomatis melalui QRIS (GoPay, OVO, Dana, ShopeePay, LinkAja, BCA Mobile), Transfer Virtual Account Bank (BCA, Mandiri, BRI, BNI, Permata), serta transfer bank manual dan kartu kredit terverifikasi via Midtrans.",
  },
  {
    question: "Bagaimana cara pengiriman lisensi setelah saya menyelesaikan pembayaran?",
    answer:
      "Pengiriman lisensi berlangsung otomatis dan instan. Begitu pembayaran Anda terverifikasi (status settlement), sistem kami langsung menerbitkan Kunci Lisensi (License Key) resmi dan tautan akses yang dikirimkan secara bersamaan ke nomor WhatsApp dan email Anda.",
  },
  {
    question: "Apakah aman menghubungkan WhatsApp saya ke Kilex WA Gateway?",
    answer:
      "Kilex WA Gateway dilengkapi dengan sistem proteksi interval jeda pintar (queue & anti-banned delay) untuk meniru perilaku pengiriman manusia yang wajar. Kami juga menyertakan panduan praktik terbaik (best practices) agar nomor bisnis Anda tetap aman.",
  },
  {
    question: "Bagaimana jika saya memerlukan kustomisasi fitur untuk skala perusahaan (Enterprise)?",
    answer:
      "Seluruh produk digital Mituni dirancang dengan arsitektur modular yang dapat disesuaikan dengan kebutuhan khusus korporasi Anda. Silakan klik tombol 'Konsultasi Tim Ahli' di bagian atas untuk mendiskusikan integrasi sistem atau paket server mandiri.",
  },
];
