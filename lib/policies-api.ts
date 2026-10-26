export interface PolicySection {
  id: string;
  title: string;
  icon?: string;
  content: string;
}

export interface PolicyMeta {
  company_name?: string;
  contact_email?: string;
  contact_whatsapp?: string;
  office_address?: string;
  app_mode?: string;
  data_storage?: string;
  regulation_reference?: string;
  [key: string]: unknown;
}

export interface PolicyItem {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  content: string;
  sections: PolicySection[];
  version: string;
  effective_date: string | null;
  is_active: boolean;
  meta?: PolicyMeta;
  created_at?: string;
  updated_at?: string;
}

const apiBackendUrl =
  process.env.API_SERVICE_URL ||
  process.env.NEXT_PUBLIC_API_SERVCE_URL ||
  "http://127.0.0.1:8000";

export const FALLBACK_PRIVACY_POLICY: PolicyItem = {
  id: 1,
  slug: "kebijakan-privasi",
  title: "Kebijakan Privasi Aplikasi Offline Store Mituni",
  summary:
    "Kebijakan privasi resmi aplikasi Android UMKM Store Mituni: 100% beroperasi offline di perangkat lokal, tanpa pengambilan data transaksi kasir/toko pengguna, dan kepatuhan penuh terhadap UU PDP No. 27 Tahun 2022.",
  content:
    "Kebijakan Privasi ini menegaskan komitmen PT Mituni Digital Indonesia bahwa seluruh aplikasi kasir Android UMKM yang dipasarkan beroperasi 100% secara offline tanpa pengambilan data bisnis maupun pelanggan toko Anda.",
  version: "2.2",
  effective_date: "2026-10-27",
  is_active: true,
  meta: {
    company_name: "PT Mituni Digital Indonesia",
    contact_email: "support@mituni.com",
    contact_whatsapp: "+62 812-3456-7890",
    office_address: "Jakarta & Padang, Indonesia",
    app_mode: "100% Offline Android App",
    data_storage: "Local Device Only",
    regulation_reference: "UU PDP No. 27 Tahun 2022",
  },
  sections: [
    {
      id: "prinsip-offline",
      title: "1. Prinsip Utama: Aplikasi 100% Offline Tanpa Pengambilan Data",
      icon: "ShieldCheck",
      content:
        "Platform Store Mituni (PT Mituni Digital Indonesia) merupakan penyedia lisensi perangkat lunak dan aplikasi kasir Android yang dirancang khusus untuk memajukan usaha UMKM (seperti laundry, retail, dan toko kelontong) di Indonesia.\n\n**Prinsip Privasi Mutlak Kami:**\n• Seluruh aplikasi Android yang dipasarkan di platform Store Mituni beroperasi secara **100% OFFLINE (Lokal)** di perangkat HP, tablet, maupun mesin kasir Android POS milik Anda.\n• **TIDAK ADA PENGAMBILAN DATA PENGGUNA**: Sistem kami tidak pernah menyedot, mengunggah, memantau, ataupun menyimpan data operasional toko Anda ke server cloud mana pun.\n• Seluruh data transaksi, nota kasir, daftar pelanggan laundry/toko, inventaris barang, dan laporan omzet keuangan tersimpan murni di dalam memori penyimpanan internal perangkat Android Anda sendiri.",
    },
    {
      id: "kedaulatan-data",
      title: "2. Kedaulatan & Keamanan Penuh Data Bisnis UMKM",
      icon: "Lock",
      content:
        "Kami meyakini bahwa data bisnis UMKM adalah aset rahasia dan milik penuh pengusaha:\n\n• **Bebas Risiko Kebocoran Cloud**: Karena database aplikasi kasir tersimpan lokal di perangkat Android dan tidak tersinkronisasi ke server internet luar, bisnis Anda bebas dari risiko kebocoran data pihak ketiga.\n• **Dapat Digunakan Tanpa Internet**: Aplikasi kasir dapat terus berjalan dengan lancar saat mati lampu, kuota habis, atau di daerah pelosok tanpa koneksi internet sama sekali.\n• **Pencadangan (Backup) Mandiri**: Pengguna memiliki kontrol penuh untuk mengekspor atau mencadangkan (*backup*) database ke penyimpanan internal HP, kartu MicroSD, atau flashdisk USB secara mandiri tanpa campur tangan server Mituni.",
    },
    {
      id: "data-transaksi-lisensi",
      title: "3. Data yang Diproses Pada Saat Pembelian Lisensi",
      icon: "Database",
      content:
        "Pengambilan data oleh Mituni **hanya terjadi secara terbatas pada saat Anda melakukan pembelian lisensi perangkat lunak di situs Store Mituni**, yang mencakup:\n\n• **Kontak Pembeli**: Nama pembeli dan nomor WhatsApp aktif, semata-mata digunakan untuk mengirimkan link unduhan installer APK resmi, kode lisensi (*license key*), serta nota bukti pembayaran.\n• **Transaksi Pembayaran**: Pembayaran diproses melalui payment gateway resmi terlisensi Bank Indonesia (QRIS, Virtual Account, E-Wallet). Mituni tidak pernah melihat atau menyimpan nomor kartu debit/kredit, PIN, atau kredensial rahasia perbankan Anda.\n• **Verifikasi Lisensi Perangkat**: Saat pertama kali mengaktifkan aplikasi, sistem hanya mencocokkan Device Identifier / Hardware ID perangkat Android Anda dengan kuota lisensi yang dibeli guna mencegah pembajakan perangkat lunak, tanpa mengakses file atau data pribadi apa pun di dalam HP Anda.",
    },
    {
      id: "izin-aplikasi-android",
      title: "4. Kebijakan Izin Aplikasi Android (App Permissions)",
      icon: "Cpu",
      content:
        "Aplikasi Android Mituni hanya meminta izin teknis yang benar-benar esensial untuk operasional kasir:\n\n• **Bluetooth**: Diperlukan semata-mata untuk menghubungkan aplikasi dengan printer thermal mini bluetooth guna mencetak struk kasir.\n• **Penyimpanan Lokal (Storage)**: Diperlukan untuk menyimpan file backup database kasir dan file PDF struk langsung di folder lokal perangkat Anda.\n• **Kamera (Opsional)**: Hanya digunakan apabila aplikasi memerlukan pemindaian barcode produk atau kode QR nota.\n\nKami **TIDAK PERNAH** meminta izin akses ke kontak telepon pribadi Anda, SMS, riwayat panggilan, lokasi GPS, rekaman audio, maupun galeri foto pribadi Anda.",
    },
    {
      id: "tanpa-penjualan-data",
      title: "5. Komitmen Tanpa Iklan Pihak Ketiga & Tanpa Penjualan Data",
      icon: "Share2",
      content:
        "Mituni memegang teguh etika bisnis software terpercaya:\n\n• Aplikasi kasir Android kami **bebas dari iklan spam atau pelacak iklan pihak ketiga** (*no third-party ads/trackers*).\n• Kami **tidak pernah menjual, menyewakan, membagikan, atau memonetisasi** data identitas pembeli kepada pihak mana pun.\n• Komunikasi via WhatsApp hanya dilakukan sehubungan dengan pengiriman lisensi produk yang Anda beli atau bantuan purna jual resmi jika Anda mengajukan permohonan bantuan teknis.",
    },
    {
      id: "hak-pembeli",
      title: "6. Hak Anda sebagai Pemilik Data & Pembeli",
      icon: "UserCheck",
      content:
        "Sesuai dengan ketentuan Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27 Tahun 2022):\n\n• Anda berhak meminta pembaruan data kontak WhatsApp atau alamat email terdaftar pada lisensi Anda.\n• Anda berhak meminta penghapusan riwayat kontak Anda dari database support kami sepanjang lisensi Anda tidak lagi aktif.\n• Anda memiliki hak mutlak untuk memindahkan (*export*), mengganti perangkat kasir (*device reset request*), atau menghapus total seluruh data kasir di perangkat Android Anda kapan saja tanpa pembatasan.",
    },
    {
      id: "kontak-resmi",
      title: "7. Layanan Bantuan & Kontak Pengembang",
      icon: "Mail",
      content:
        "Apabila Anda memiliki pertanyaan mengenai privasi atau kendala aktivasi lisensi aplikasi kasir Android UMKM Anda, silakan hubungi saluran pengembang resmi kami:\n\n• **Pengembang / Perusahaan**: PT Mituni Digital Indonesia\n• **Email Bantuan**: support@mituni.com\n• **WhatsApp Layanan Resmi**: +62 812-3456-7890\n• **Situs Resmi**: https://store.mituni.com\n• **Lokasi Kantor**: Jakarta & Padang, Indonesia",
    },
  ],
};

export const FALLBACK_TERMS_POLICY: PolicyItem = {
  id: 2,
  slug: "syarat-ketentuan",
  title: "Syarat & Ketentuan Lisensi Aplikasi Kasir UMKM",
  summary:
    "Ketentuan lisensi penggunaan perangkat lunak kasir Android offline, aktivasi perangkat, dan layanan purna jual PT Mituni Digital Indonesia.",
  content:
    "Syarat dan Ketentuan Layanan ini mengatur penggunaan lisensi aplikasi kasir Android offline dan layanan purna jual yang disediakan oleh PT Mituni Digital Indonesia.",
  version: "2.0",
  effective_date: "2026-10-27",
  is_active: true,
  meta: {
    company_name: "PT Mituni Digital Indonesia",
    contact_email: "support@mituni.com",
    contact_whatsapp: "+62 812-3456-7890",
  },
  sections: [
    {
      id: "ruang-lingkup-layanan",
      title: "1. Ruang Lingkup Lisensi Aplikasi Kasir Offline",
      icon: "FileText",
      content:
        "Mituni menyediakan lisensi perangkat lunak kasir Android yang dapat digunakan secara offline tanpa batas waktu atau sesuai masa aktif paket (misal: 1 Bulan, 1 Tahun, atau Lifetime). Seluruh fitur inti kasir (input transaksi, cetak nota thermal, laporan kas masuk) dapat berjalan 100% tanpa internet.",
    },
    {
      id: "aktivasi-perangkat",
      title: "2. Ketentuan Aktivasi & Reset Perangkat Kasir",
      icon: "Cpu",
      content:
        "1 lisensi kasir Android terikat pada identitas perangkat keras (*Hardware Fingerprint*). Apabila terjadi kerusakan HP/tablet kasir atau pergantian perangkat kasir fisik di gerai outlet Anda, Anda dapat mengajukan reset perangkat kepada tim support Mituni dengan verifikasi nomor WhatsApp pembeli yang sah.",
    },
    {
      id: "pembayaran-pengembalian",
      title: "3. Transaksi Lisensi Digital",
      icon: "CreditCard",
      content:
        "Seluruh transaksi lisensi perangkat lunak digital diproses secara aman melalui payment gateway resmi. Kami menyediakan video tutorial, panduan, dan konsultasi pra-pembelian untuk memastikan aplikasi kasir Android sesuai dengan alur bisnis UMKM Anda.",
    },
    {
      id: "dukungan-purna-jual",
      title: "4. Dukungan Purna Jual & Pembaruan Aplikasi",
      icon: "Headphones",
      content:
        "Tim dukungan teknis Mituni siap membantu kendala instalasi APK, koneksi printer bluetooth, serta panduan operasional kasir melalui WhatsApp Customer Service pada jam kerja.",
    },
  ],
};

export async function fetchPolicyFromApi(slug: string): Promise<{ data: PolicyItem; isFromApi: boolean }> {
  try {
    const res = await fetch(`${apiBackendUrl}/api/v1/policies/${slug}`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return {
          data: json.data as PolicyItem,
          isFromApi: true,
        };
      }
    }
  } catch {
    // API backend unreachable or error, gracefully fallback
  }

  if (slug === "syarat-ketentuan" || slug === "terms" || slug === "terms-of-service") {
    return { data: FALLBACK_TERMS_POLICY, isFromApi: false };
  }

  return { data: FALLBACK_PRIVACY_POLICY, isFromApi: false };
}

export async function fetchAllPolicies(): Promise<PolicyItem[]> {
  try {
    const res = await fetch(`${apiBackendUrl}/api/v1/policies`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        return json.data as PolicyItem[];
      }
    }
  } catch {
    // Graceful fallback
  }

  return [FALLBACK_PRIVACY_POLICY, FALLBACK_TERMS_POLICY];
}
