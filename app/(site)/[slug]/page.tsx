import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cpu,
  Download,
  ExternalLink,
  Flame,
  HardDrive,
  HelpCircle,
  Layers,
  MessageCircle,
  Package,
  PhoneCall,
  Printer,
  QrCode,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Terminal,
  Wifi,
  WifiOff,
  Wrench,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PRODUCTS, ProductItem } from "@/lib/products-data";
import { cn } from "@/lib/utils";
import { ScreenshotGallery } from "./_components/screenshot-gallery";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface AppFeature {
  name: string;
  description: string;
}

interface EcommerceLink {
  name: string;
  url: string;
  price?: number | string | null;
  stock?: number | string | null;
  code?: string | null;
}

interface AppProductOption {
  id: string | number;
  name: string;
  code?: string;
  price: number;
  stock?: number;
  ecommerce?: string | null;
  product_url?: string | null;
  ecommerces?: EcommerceLink[];
  license_type?: string;
  features?: string[];
}

interface UnifiedAppDetail {
  id: string | number;
  name: string;
  slug: string;
  code: string;
  version?: string | null;
  status: "active" | "coming_soon" | "maintenance";
  badge: string;
  description: string;
  license_type: string;
  download_url?: string | null;
  website?: string | null;
  apk_path?: string | null;
  iconUrl?: string | null;
  screenshots: string[];
  features: AppFeature[];
  products: AppProductOption[];
  categoryLabel: string;
  isFromApi: boolean;
}

const apiBackendUrl =
  process.env.API_SERVICE_URL ||
  process.env.NEXT_PUBLIC_API_SERVCE_URL ||
  "http://127.0.0.1:8000";

// Resolusi path aset media dari backend storage
const resolveStorageUrl = (path: string | null | undefined): string | null => {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
    return path;
  }
  return `/storage/${path}`;
};

// Format mata uang Rupiah
const formatRupiah = (value: number | string | null | undefined): string => {
  const num = typeof value === "number" ? value : Number(value);
  if (isNaN(num)) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

// Helper warna dan badge tematik sesuai toko e-commerce / marketplace
function getStoreTheme(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("shopee")) {
    return {
      bg: "bg-orange-500/10 hover:bg-orange-500/15",
      text: "text-orange-600 dark:text-orange-400",
      border: "border-orange-500/30 hover:border-orange-500/50",
      badge: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30",
      dot: "bg-orange-500",
    };
  }
  if (lower.includes("tokopedia")) {
    return {
      bg: "bg-emerald-500/10 hover:bg-emerald-500/15",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-500/30 hover:border-emerald-500/50",
      badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
      dot: "bg-emerald-500",
    };
  }
  if (lower.includes("tiktok")) {
    return {
      bg: "bg-rose-500/10 hover:bg-rose-500/15",
      text: "text-rose-600 dark:text-rose-400",
      border: "border-rose-500/30 hover:border-rose-500/50",
      badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
      dot: "bg-rose-500",
    };
  }
  if (lower.includes("lazada")) {
    return {
      bg: "bg-blue-500/10 hover:bg-blue-500/15",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-500/30 hover:border-blue-500/50",
      badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
      dot: "bg-blue-500",
    };
  }
  if (lower.includes("web") || lower.includes("mituni")) {
    return {
      bg: "bg-indigo-500/10 hover:bg-indigo-500/15",
      text: "text-indigo-600 dark:text-indigo-400",
      border: "border-indigo-500/30 hover:border-indigo-500/50",
      badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
      dot: "bg-indigo-500",
    };
  }
  return {
    bg: "bg-secondary/60 hover:bg-secondary",
    text: "text-foreground",
    border: "border-border hover:border-muted-foreground/40",
    badge: "bg-secondary text-secondary-foreground border-border",
    dot: "bg-muted-foreground",
  };
}

// Ambil kontak WhatsApp Customer Support
async function getCsWhatsapp(): Promise<string> {
  try {
    const res = await fetch(`${apiBackendUrl}/api/v1/customer-supports`, {
      next: { revalidate: 300 },
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const first = json.data[0];
        if (first.whatsapp) {
          return String(first.whatsapp).replace(/[^0-9]/g, "");
        }
      }
    }
  } catch (error) {
    // Abaikan jika service belum aktif
  }
  return "6281234567890";
}

// Fetch data aplikasi berdasarkan slug (API atau fallback data statis)
async function getApplication(slug: string): Promise<UnifiedAppDetail | null> {
  // 1. Coba ambil dari Backend API Service
  try {
    const res = await fetch(`${apiBackendUrl}/api/v1/applications/${slug}`, {
      next: { revalidate: 30 },
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const d = json.data;
        const status = (d.status || "active") as "active" | "coming_soon" | "maintenance";

        let badge = "Siap Digunakan";
        if (status === "coming_soon") {
          badge = "Segera Hadir";
        } else if (status === "maintenance") {
          badge = "Pemeliharaan";
        } else if (d.license_type === "lifetime") {
          badge = "Lisensi Seumur Hidup";
        }

        const features: AppFeature[] = Array.isArray(d.features)
          ? d.features.map((f: { name?: string; description?: string }) => ({
              name: f.name || "Fitur Unggulan",
              description: f.description || "",
            }))
          : [];

        const products: AppProductOption[] = Array.isArray(d.products)
          ? d.products.map(
              (p: {
                id: number;
                name: string;
                code?: string;
                price: number | string;
                stock?: number;
                ecommerce?: string;
                product_url?: string;
                ecommerces?: Array<{
                  name: string;
                  url: string;
                  price?: number | string | null;
                  stock?: number | string | null;
                  code?: string | null;
                }>;
                license_type?: string;
              }) => {
                const ecomList: EcommerceLink[] =
                  Array.isArray(p.ecommerces) && p.ecommerces.length > 0
                    ? p.ecommerces
                        .filter((item) => Boolean(item && item.url))
                        .map((item) => ({
                          name: item.name,
                          url: item.url,
                          price: item.price ?? p.price,
                          stock: item.stock ?? p.stock,
                          code: item.code ?? p.code,
                        }))
                    : p.product_url
                      ? [
                          {
                            name: p.ecommerce || "Marketplace",
                            url: p.product_url,
                            price: p.price,
                            stock: p.stock,
                            code: p.code,
                          },
                        ]
                      : [];

                return {
                  id: p.id,
                  name: p.name,
                  code: p.code,
                  price: Number(p.price) || 0,
                  stock: p.stock ?? 0,
                  ecommerce: p.ecommerce,
                  product_url: p.product_url,
                  ecommerces: ecomList,
                  license_type: p.license_type || d.license_type,
                };
              }
            )
          : [];

        const screenshots = Array.isArray(d.screenshots)
          ? d.screenshots.filter((s: unknown): s is string => typeof s === "string")
          : [];

        return {
          id: d.id,
          name: d.name,
          slug: d.slug || slug,
          code: d.code || "MTRN",
          version: d.version || null,
          status,
          badge,
          description:
            d.description ||
            "Aplikasi perangkat lunak terintegrasi dari ekosistem Store Mituni untuk mendukung efisiensi operasional dan pertumbuhan bisnis Anda.",
          license_type: d.license_type || "lifetime",
          download_url: d.download_url,
          website: d.website,
          apk_path: d.apk_path,
          iconUrl: resolveStorageUrl(d.icon),
          screenshots,
          features,
          products,
          categoryLabel: status === "coming_soon" ? "Segera Hadir" : "Aplikasi Resmi Mituni",
          isFromApi: true,
        };
      }
    }
  } catch (error) {
    // Lanjut fallback ke data lokal
  }

  // 2. Fallback ke data statis PRODUCTS
  const localMatch = PRODUCTS.find(
    (p) => p.slug === slug || p.id === slug || p.slug.toLowerCase() === slug.toLowerCase()
  );

  if (localMatch) {
    const status = (localMatch.status || "active") as "active" | "coming_soon" | "maintenance";
    const features: AppFeature[] = localMatch.features.map((f) => ({
      name: f.title,
      description: f.description,
    }));

    const products: AppProductOption[] = localMatch.plans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      price: plan.discountPrice || plan.price,
      license_type: plan.billingCycle,
      features: plan.features,
    }));

    return {
      id: localMatch.id,
      name: localMatch.name,
      slug: localMatch.slug,
      code: localMatch.id.toUpperCase().slice(0, 4),
      version: "1.0.0",
      status,
      badge: localMatch.badge || "Paling Diminati",
      description: localMatch.description,
      license_type: "lifetime",
      iconUrl: localMatch.iconUrl || null,
      screenshots: [],
      features,
      products,
      categoryLabel: localMatch.categoryLabel || "SaaS Bisnis",
      isFromApi: false,
    };
  }

  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = await getApplication(slug);

  if (!app) {
    return {
      title: "Aplikasi Tidak Ditemukan — Store Mituni",
    };
  }

  return {
    title: `${app.name} (${app.code}) — Detail & Lisensi | Store Mituni`,
    description: app.description.slice(0, 160),
    openGraph: {
      title: `${app.name} — Store Mituni`,
      description: app.description.slice(0, 160),
      images: app.iconUrl ? [app.iconUrl] : undefined,
    },
  };
}

export default async function ApplicationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [app, csWhatsapp] = await Promise.all([getApplication(slug), getCsWhatsapp()]);

  if (!app) {
    notFound();
  }

  const isComingSoon = app.status === "coming_soon";
  const isMaintenance = app.status === "maintenance";

  // Kumpulkan seluruh toko e-commerce unik yang menjual aplikasi ini
  const allEcommerceStores: Array<{
    name: string;
    url: string;
    price?: number | string | null;
    stock?: number | string | null;
    code?: string | null;
    productName?: string;
  }> = [];

  const seenStoreKeys = new Set<string>();

  for (const product of app.products) {
    if (product.ecommerces && product.ecommerces.length > 0) {
      for (const ecom of product.ecommerces) {
        if (ecom.url && !seenStoreKeys.has(ecom.name.toLowerCase() + ecom.url)) {
          seenStoreKeys.add(ecom.name.toLowerCase() + ecom.url);
          allEcommerceStores.push({
            name: ecom.name,
            url: ecom.url,
            price: ecom.price ?? product.price,
            stock: ecom.stock ?? product.stock,
            code: ecom.code ?? product.code,
            productName: product.name,
          });
        }
      }
    } else if (product.product_url) {
      const storeName = product.ecommerce || "Marketplace Resmi";
      if (!seenStoreKeys.has(storeName.toLowerCase() + product.product_url)) {
        seenStoreKeys.add(storeName.toLowerCase() + product.product_url);
        allEcommerceStores.push({
          name: storeName,
          url: product.product_url,
          price: product.price,
          stock: product.stock,
          code: product.code,
          productName: product.name,
        });
      }
    }
  }

  // Harga terendah aplikasi untuk ditampilkan di ringkasan
  const minPrice = app.products.reduce((acc, p) => {
    return p.price > 0 && (acc === 0 || p.price < acc) ? p.price : acc;
  }, 0);

  // Pesan WhatsApp otomatis
  const waOrderMessage = isComingSoon
    ? `Halo Tim Store Mituni, saya tertarik dengan aplikasi ${app.name} (${app.code}) yang berstatus Coming Soon. Mohon informasi jadwal peluncuran resminya.`
    : `Halo Tim Store Mituni, saya tertarik untuk memesan lisensi resmi aplikasi ${app.name} (${app.code}). Mohon informasi proses pembelian dan aktivasi.`;

  const waOrderUrl = `https://wa.me/${csWhatsapp}?text=${encodeURIComponent(waOrderMessage)}`;

  return (
    <div className="relative min-h-screen bg-background text-foreground pb-24 selection:bg-cyan-500/20 selection:text-cyan-400">
      {/* Background Decorative Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 size-162.5 rounded-full bg-linear-to-b from-cyan-500/10 via-teal-500/5 to-transparent blur-3xl" />
        <div className="absolute top-96 right-0 size-112.5 rounded-full bg-linear-to-b from-purple-500/5 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 pt-6 sm:pt-10 max-w-6xl">
        {/* Navigation Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-muted-foreground mb-6 sm:mb-8 font-mono flex-wrap"
        >
          <Link href="/" className="hover:text-foreground transition-colors">
            Beranda
          </Link>
          <ChevronRight className="size-3 text-muted-foreground/60" />
          <Link href="/#katalog" className="hover:text-foreground transition-colors">
            Katalog Aplikasi
          </Link>
          <ChevronRight className="size-3 text-muted-foreground/60" />
          <span className="text-foreground font-medium truncate max-w-50 sm:max-w-none">
            {app.name}
          </span>
        </nav>

        {/* Back Link Button */}
        <div className="mb-6">
          <Link href="/#katalog">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              <span>Kembali ke Katalog</span>
            </Button>
          </Link>
        </div>

        {/* HERO SECTION */}
        <section className="relative rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xl p-6 sm:p-10 shadow-2xl overflow-hidden mb-12">
          {/* Subtle Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-cyan-500 via-teal-400 to-purple-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: App Identity & Main Actions */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badges row */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide uppercase bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  <Terminal className="size-3" />
                  KODE: {app.code}
                </span>

                {isComingSoon ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <Sparkles className="size-3.5 text-amber-500" />
                    Coming Soon
                  </span>
                ) : isMaintenance ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                    <Wrench className="size-3.5 text-rose-500" />
                    Dalam Pemeliharaan
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="size-3.5 text-emerald-500" />
                    {app.badge}
                  </span>
                )}

                <span className="text-xs text-muted-foreground font-mono">
                  {app.categoryLabel}
                </span>
              </div>

              {/* Title & Icon Header */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="size-16 sm:size-20 rounded-2xl bg-muted border border-border/80 flex items-center justify-center shrink-0 shadow-md overflow-hidden">
                  {app.iconUrl ? (
                    <img
                      src={app.iconUrl}
                      alt={`Ikon ${app.name}`}
                      className="size-12 sm:size-14 object-contain"
                    />
                  ) : (
                    <Layers className="size-8 sm:size-10 text-cyan-400" />
                  )}
                </div>

                <div>
                  <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                    {app.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground font-mono mt-1">
                    Format Lisensi Resmi:{" "}
                    <span className="text-foreground font-semibold">
                      {app.code}-XXXX-XXXX-XXXX
                    </span>
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {app.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a href={waOrderUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className={cn(
                      "gap-2 font-semibold text-xs sm:text-sm h-11 px-6 shadow-md transition-all cursor-pointer",
                      isComingSoon
                        ? "bg-amber-500 hover:bg-amber-600 text-white"
                        : "bg-foreground text-background hover:bg-foreground/90"
                    )}
                  >
                    <PhoneCall className="size-4" />
                    <span>{isComingSoon ? "Nantikan Rilis (WhatsApp)" : "Pesan Lisensi Resmi"}</span>
                  </Button>
                </a>

                {app.download_url && (
                  <a href={app.download_url} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="lg"
                      className="gap-2 text-xs sm:text-sm h-11 px-5 border-cyan-500/40 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 cursor-pointer"
                    >
                      <Download className="size-4" />
                      <span>Unduh APK Rilis</span>
                    </Button>
                  </a>
                )}

                {app.website && (
                  <a href={app.website} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="lg"
                      className="gap-2 text-xs sm:text-sm h-11 px-4 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <ExternalLink className="size-4" />
                      <span>Kunjungi Website</span>
                    </Button>
                  </a>
                )}
              </div>

              {/* Quick Marketplace Access Banner (If ecommerce links exist) */}
              {allEcommerceStores.length > 0 && (
                <div className="pt-2 rounded-2xl bg-muted/30 border border-border/70 p-4">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Store className="size-4 text-primary" />
                    <span className="text-xs font-semibold text-foreground">
                      Beli Resmi di Lokapasar / Marketplace:
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {allEcommerceStores.map((store, sIdx) => {
                      const theme = getStoreTheme(store.name);
                      return (
                        <a
                          key={sIdx}
                          href={store.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer shadow-xs",
                              theme.bg,
                              theme.text,
                              theme.border
                            )}
                          >
                            <span className={cn("size-1.5 rounded-full", theme.dot)} />
                            <span>{store.name}</span>
                            {store.price ? (
                              <span className="font-mono text-[11px] opacity-80">
                                ({formatRupiah(store.price)})
                              </span>
                            ) : null}
                            <ExternalLink className="size-3 opacity-60 ml-0.5" />
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Col: Quick Technical Spec Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border/80 bg-background/80 backdrop-blur-md p-5 sm:p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                    Ringkasan Teknis & Lisensi
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-500">
                    <ShieldCheck className="size-3.5" /> Terverifikasi
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tipe Lisensi</span>
                    <span className="font-semibold text-foreground font-mono">
                      {app.license_type === "lifetime" ? "Seumur Hidup (Lifetime)" : "Berlangganan"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Kode SKU Lisensi</span>
                    <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">
                      {app.code}
                    </span>
                  </div>

                  {app.version && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Versi Aplikasi</span>
                      <span className="font-mono font-semibold text-foreground">
                        v{app.version}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Konektivitas</span>
                    <span className="inline-flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
                      <WifiOff className="size-3" /> 100% Offline Ready
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Distribusi Paket</span>
                    <span className="text-foreground">
                      {app.apk_path ? "File APK Mandiri" : "Unduhan Online / Cloud"}
                    </span>
                  </div>

                  {allEcommerceStores.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Lokapasar Resmi</span>
                      <span className="text-right font-medium text-foreground">
                        {allEcommerceStores.map((s) => s.name).join(", ")}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Penerbitan Kunci</span>
                    <span className="text-emerald-500 font-semibold font-mono">
                      Otomatis & Instan
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Garansi Sistem</span>
                    <span className="text-foreground">Dukungan Reset Resmi</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border/60">
                  <div className="rounded-xl bg-muted/40 p-3 text-[11px] text-muted-foreground leading-relaxed flex items-start gap-2">
                    <ShieldCheck className="size-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      Setiap lisensi yang diterbitkan terdaftar secara resmi pada basis data Store
                      Mituni untuk verifikasi keaslian dan proteksi hak guna.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TOKO & LOKAPASAR RESMI SECTION (If Ecommerce Stores Exist) */}
        {allEcommerceStores.length > 0 && (
          <section className="mb-14">
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block">
                  Saluran Belanja
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                  {allEcommerceStores.length} Toko Resmi
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1">
                Toko & Lokapasar Resmi Terpercaya
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
                Nikmati kenyamanan transaksi di marketplace favorit Anda: pembayaran aman, pilihan cicilan PayLater, proteksi pembeli, dan pengiriman kode lisensi cepat via chat toko.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allEcommerceStores.map((store, idx) => {
                const theme = getStoreTheme(store.name);
                return (
                  <div
                    key={idx}
                    className={cn(
                      "rounded-2xl border p-5 flex flex-col justify-between transition-all duration-200 group bg-card",
                      theme.border
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border",
                            theme.badge
                          )}
                        >
                          <Store className="size-3.5" />
                          {store.name}
                        </span>

                        {store.stock !== undefined && store.stock !== null && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground border">
                            {Number(store.stock) > 0 ? `${store.stock} stok` : "Stok siap"}
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-base text-foreground mb-1 group-hover:text-primary transition-colors">
                        Toko Resmi {store.name}
                      </h3>
                      {store.productName && (
                        <p className="text-xs text-muted-foreground mb-3 truncate">
                          {store.productName}
                        </p>
                      )}

                      <div className="my-3 py-2.5 px-3 rounded-xl bg-muted/30 border border-border/60 flex items-baseline justify-between">
                        <span className="text-xs text-muted-foreground">Harga Resmi:</span>
                        <span className="text-lg font-black font-mono text-foreground">
                          {formatRupiah(store.price)}
                        </span>
                      </div>

                      <ul className="space-y-1.5 mb-4 text-xs text-muted-foreground">
                        <li className="flex items-center gap-1.5">
                          <Check className="size-3.5 text-emerald-500 shrink-0" />
                          <span>Metode Bayar Terlengkap & PayLater</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="size-3.5 text-emerald-500 shrink-0" />
                          <span>Kode Lisensi Instan via Chat Toko</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="size-3.5 text-emerald-500 shrink-0" />
                          <span>Garansi Keaslian & Perlindungan Konsumen</span>
                        </li>
                      </ul>
                    </div>

                    <a
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-2"
                    >
                      <Button
                        size="sm"
                        className={cn(
                          "w-full text-xs font-semibold h-9 gap-1.5 cursor-pointer shadow-xs transition-all",
                          theme.bg,
                          theme.text,
                          theme.border
                        )}
                      >
                        <span>Beli di {store.name}</span>
                        <ExternalLink className="size-3.5" />
                      </Button>
                    </a>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SCREENSHOTS SHOWCASE */}
        {app.screenshots.length > 0 && (
          <section className="mb-14">
            <div className="flex items-end justify-between mb-6">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1">
                  Galeri Tampilan
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Antarmuka & Cuplikan Layar
                </h2>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                {app.screenshots.length} Gambar
              </span>
            </div>

            <ScreenshotGallery screenshots={app.screenshots} title={app.name} />
          </section>
        )}

        {/* FITUR UNGGULAN SECTION */}
        {app.features.length > 0 && (
          <section className="mb-14">
            <div className="mb-6">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1">
                Kemampuan Sistem
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Fitur Unggulan {app.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {app.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border/80 bg-card/60 p-5 space-y-2 hover:border-cyan-500/40 hover:shadow-lg transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="size-7 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-mono text-xs font-bold border border-cyan-500/20">
                      #{idx + 1}
                    </span>
                    <Check className="size-4 text-cyan-500" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-cyan-500 transition-colors">
                    {feature.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PAKET PRODUK & HARGA LISENSI */}
        {app.products.length > 0 && (
          <section className="mb-14">
            <div className="mb-6">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1">
                Katalog Pembelian
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Pilihan Paket & Edisi Lisensi
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Pilih edisi produk yang sesuai dengan kebutuhan operasional bisnis Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {app.products.map((product) => {
                const waProductMsg = `Halo Tim Store Mituni, saya ingin memesan lisensi ${product.name} (SKU: ${product.code || app.code}) seharga ${formatRupiah(product.price)}.`;
                const waProductUrl = `https://wa.me/${csWhatsapp}?text=${encodeURIComponent(waProductMsg)}`;

                return (
                  <div
                    key={product.id}
                    className="rounded-2xl border border-border/80 bg-card p-6 flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                          {product.code || app.code}
                        </span>

                        {product.stock !== undefined && (
                          <span
                            className={cn(
                              "text-[10px] font-mono px-2 py-0.5 rounded-full border",
                              product.stock > 0
                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                : "bg-muted text-muted-foreground border-border"
                            )}
                          >
                            {product.stock > 0 ? `${product.stock} stok` : "Stok siap"}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-foreground mb-2">{product.name}</h3>

                      <div className="my-4 pb-4 border-b border-border/60">
                        <span className="text-xs text-muted-foreground block font-mono">
                          Harga Lisensi
                        </span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-2xl font-black font-mono text-foreground">
                            {formatRupiah(product.price)}
                          </span>
                          <span className="text-xs text-muted-foreground">/ lisensi</span>
                        </div>
                      </div>

                      {product.features && product.features.length > 0 && (
                        <div className="space-y-2 mb-6">
                          {product.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2 text-xs">
                              <Check className="size-3.5 text-cyan-500 shrink-0" />
                              <span className="text-muted-foreground">{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 pt-2">
                      <a href={waProductUrl} target="_blank" rel="noopener noreferrer">
                        <Button
                          size="sm"
                          className="w-full text-xs font-semibold h-9 bg-foreground text-background hover:bg-foreground/90 cursor-pointer"
                        >
                          Pesan Lisensi Langsung (WhatsApp)
                        </Button>
                      </a>

                      {product.ecommerces && product.ecommerces.length > 0 ? (
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[11px] font-medium text-muted-foreground block">
                            Atau checkout lewat lokapasar:
                          </span>
                          {product.ecommerces.map((ecom, eIdx) => {
                            if (!ecom.url) return null;
                            const theme = getStoreTheme(ecom.name);
                            return (
                              <a
                                key={eIdx}
                                href={ecom.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                              >
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className={cn(
                                    "w-full text-xs h-8.5 cursor-pointer flex items-center justify-between border transition-all",
                                    theme.bg,
                                    theme.text,
                                    theme.border
                                  )}
                                >
                                  <span className="flex items-center gap-1.5 truncate font-medium">
                                    <ExternalLink className="size-3 shrink-0" />
                                    Beli di {ecom.name}
                                  </span>
                                  {ecom.price ? (
                                    <span className="font-mono font-bold text-[11px]">
                                      {formatRupiah(ecom.price)}
                                    </span>
                                  ) : null}
                                </Button>
                              </a>
                            );
                          })}
                        </div>
                      ) : product.product_url ? (
                        <a
                          href={product.product_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs h-8 text-muted-foreground hover:text-foreground cursor-pointer"
                          >
                            <ExternalLink className="size-3 mr-1" />
                            Beli via {product.ecommerce || "Marketplace"}
                          </Button>
                        </a>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* PERSYARATAN SISTEM & KOMPATIBILITAS SECTION */}
        <section className="mb-14">
          <div className="mb-6">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1">
              Spesifikasi Hardware
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Persyaratan Sistem & Kompatibilitas
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Dirancang ringan dan hemat daya agar dapat berjalan mulus pada berbagai jenis perangkat usaha Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2.5">
              <div className="size-9 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                <Smartphone className="size-4.5" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">Sistem Operasi</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Android 8.0 (Oreo) ke atas. Kompatibel penuh hingga Android 12, 13, 14, dan 15 terbaru.
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2.5">
              <div className="size-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <WifiOff className="size-4.5" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">Konektivitas Offline</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Hanya butuh internet 1x saat aktivasi lisensi. Setelah itu aplikasi beroperasi <strong>100% Offline tanpa kuota</strong>.
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2.5">
              <div className="size-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                <Cpu className="size-4.5" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">Perangkat Kasir & Mesin POS</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Mendukung Smartphone Android, Tablet Kasir, dan Mesin POS all-in-one (Sunmi, iMin, Telpo, dll.).
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2.5">
              <div className="size-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Printer className="size-4.5" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">Printer & Aksesoris</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Mendukung Printer Thermal Bluetooth 58mm & 80mm, Barcode Scanner, dan Laci Uang (Cash Drawer).
              </p>
            </div>
          </div>
        </section>

        {/* 3-STEP ACTIVATION GUIDE */}
        <section className="rounded-3xl border border-border/80 bg-muted/20 p-6 sm:p-10 mb-14">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1">
              Panduan Mudah
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              3 Langkah Memulai & Aktivasi Lisensi
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Proses aktivasi berlangsung instan tanpa proses verifikasi manual yang rumit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-3">
              <div className="size-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono font-bold text-sm flex items-center justify-center border border-cyan-500/20">
                01
              </div>
              <h3 className="font-semibold text-sm text-foreground">1. Dapatkan Lisensi</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Pesan lisensi resmi melalui kontak WhatsApp Store Mituni atau checkout melalui
                marketplace resmi kami (Shopee, Tokopedia, dll.).
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-3">
              <div className="size-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 font-mono font-bold text-sm flex items-center justify-center border border-teal-500/20">
                02
              </div>
              <h3 className="font-semibold text-sm text-foreground">2. Unduh & Pasang</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Unduh file aplikasi APK langsung dari tautan aman Store Mituni dan instal pada
                perangkat smartphone atau tablet kasir Anda.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-3">
              <div className="size-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono font-bold text-sm flex items-center justify-center border border-purple-500/20">
                03
              </div>
              <h3 className="font-semibold text-sm text-foreground">3. Masukkan Kunci Lisensi</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Buka aplikasi, masukkan kode lisensi unik yang diterima, dan nikmati seluruh fitur
                tanpa batasan waktu selamanya.
              </p>
            </div>
          </div>
        </section>

        {/* TANYA JAWAB / FAQ SEPUTAR PEMBELIAN */}
        <section className="mb-14">
          <div className="mb-6">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1">
              Bantuan Konsumen
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Jawaban lengkap seputar lisensi, pembayaran, dan instalasi aplikasi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2">
              <div className="flex items-center gap-2 text-cyan-500 font-semibold text-sm">
                <HelpCircle className="size-4 shrink-0" />
                <span>Bagaimana jika beli lewat Shopee atau Tokopedia?</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Setelah pembayaran terkonfirmasi di Shopee atau Tokopedia, kode lisensi unik beserta link download APK dan panduan instalasi akan langsung dikirimkan oleh admin kami melalui chat marketplace dalam hitungan menit.
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2">
              <div className="flex items-center gap-2 text-cyan-500 font-semibold text-sm">
                <HelpCircle className="size-4 shrink-0" />
                <span>Apakah ada biaya langganan bulanan tersembunyi?</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tidak ada! Untuk lisensi tipe Seumur Hidup (Lifetime), Anda hanya membayar 1x di awal dan aplikasi dapat digunakan selamanya tanpa perpanjangan biaya tahunan atau bulanan.
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2">
              <div className="flex items-center gap-2 text-cyan-500 font-semibold text-sm">
                <HelpCircle className="size-4 shrink-0" />
                <span>Bisa pindah perangkat jika ganti HP / tablet kasir?</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tentu bisa. Kami menyediakan fitur Reset Device resmi. Cukup hubungi customer support kami dengan nomor HP pembelian, dan sistem kami akan mengaktifkan kembali lisensi untuk perangkat baru Anda.
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-2">
              <div className="flex items-center gap-2 text-cyan-500 font-semibold text-sm">
                <HelpCircle className="size-4 shrink-0" />
                <span>Apakah dibantu proses instalasi sampai bisa digunakan?</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Ya! Tim Customer Support Store Mituni siap memandu Anda via WhatsApp jika mengalami kendala saat download APK, aktivasi kode, atau pengaturan printer thermal.
              </p>
            </div>
          </div>
        </section>

        {/* JAMINAN & KEASLIAN LISENSI */}
        <section className="mb-14 rounded-2xl border border-cyan-500/20 bg-linear-to-r from-cyan-500/5 via-teal-500/5 to-transparent p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center sm:items-start gap-3">
              <ShieldCheck className="size-8 text-cyan-500 shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-foreground">Lisensi 100% Asli</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Terdaftar langsung di server resmi Store Mituni.
                </p>
              </div>
            </div>

            <div className="flex items-center sm:items-start gap-3">
              <Zap className="size-8 text-teal-500 shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-foreground">Aktivasi Cepat & Mandiri</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Masukkan kode lisensi, aplikasi langsung aktif seketika.
                </p>
              </div>
            </div>

            <div className="flex items-center sm:items-start gap-3">
              <RefreshCw className="size-8 text-purple-500 shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-foreground">Garansi Reset Resmi</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Perangkat aman dipindah jika ganti HP kasir baru.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM WHATSAPP CALLOUT */}
        <section className="rounded-3xl border border-border/80 bg-linear-to-r from-cyan-500/10 via-teal-500/5 to-purple-500/10 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="size-12 rounded-2xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto">
              <PhoneCall className="size-6" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Butuh Konsultasi atau Uji Coba Demo {app.name}?
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Tim spesialis Store Mituni siap membantu Anda memilih solusi yang tepat, menjawab
              pertanyaan teknis, serta memandu proses aktivasi sampai siap beroperasi.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a href={waOrderUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="gap-2 font-semibold text-xs sm:text-sm h-11 px-8 bg-foreground text-background hover:bg-foreground/90 cursor-pointer shadow-lg"
                >
                  <PhoneCall className="size-4" />
                  <span>Hubungi Tim Ahli Mituni</span>
                </Button>
              </a>

              {allEcommerceStores.length > 0 && (
                <a href="#toko-resmi">
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 text-xs sm:text-sm h-11 px-6 border-cyan-500/40 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 cursor-pointer"
                  >
                    <ShoppingBag className="size-4" />
                    <span>Lihat Pilihan Lokapasar</span>
                  </Button>
                </a>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
