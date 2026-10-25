"use client";

import * as React from "react";
import Link from "next/link";
import {
  Shirt,
  Radio,
  TrendingUp,
  MessageSquare,
  Cpu,
  Check,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Calculator,
  Clock,
  Coins,
  Users,
  ShieldCheck,
  Star,
  ChevronRight,
  PhoneCall,
  Terminal,
  Activity,
  Layers,
  Zap,
  Copy,
  ExternalLink,
  Flame,
  ArrowUpRight,
  X,
  Send,
  Eye,
  BarChart3,
  FileSpreadsheet,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRODUCTS, TESTIMONIALS, FAQS, ProductItem } from "@/lib/products-data";
import { cn } from "@/lib/utils";

const PRODUCT_ICONS: Record<string, React.ReactNode> = {
  Shirt: <Shirt className="size-5 text-cyan-400" />,
  Radio: <Radio className="size-5 text-rose-400" />,
  TrendingUp: <TrendingUp className="size-5 text-amber-400" />,
  MessageSquare: <MessageSquare className="size-5 text-emerald-400" />,
  Cpu: <Cpu className="size-5 text-violet-400" />,
};

export default function IndexPage() {
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [activeModalProduct, setActiveModalProduct] = React.useState<ProductItem | null>(null);

  // API Data state (proxied to Laravel backend)
  const [apiApplications, setApiApplications] = React.useState<ProductItem[]>([]);
  const [isLoadingApi, setIsLoadingApi] = React.useState<boolean>(true);
  const [csWhatsapp, setCsWhatsapp] = React.useState<string>("6282386825834");

  // Fetch applications and customer support via Next.js proxy
  React.useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setIsLoadingApi(true);
      try {
        const appRes = await fetch("/api/v1/applications?per_page=50");
        if (appRes.ok) {
          const appJson = await appRes.json();
          if (appJson.success && Array.isArray(appJson.data) && appJson.data.length > 0) {
            const mapped: ProductItem[] = appJson.data.map((app: any): ProductItem => {
              const iconUrl = app.icon
                ? (app.icon.startsWith("http") ? app.icon : `/storage/${app.icon.replace(/^\/+/, "")}`)
                : null;

              const features = Array.isArray(app.features) && app.features.length > 0
                ? app.features.map((f: any) => ({
                  title: f.name || f.title || "Fitur Unggulan",
                  description: f.description || "",
                }))
                : [
                  { title: "Fitur Manajemen Lengkap", description: "Otomasi sistem untuk efisiensi bisnis dan kemudahan operasional." },
                  { title: "Dukungan Teknis & Update", description: "Pembaruan berkala serta panduan teknis langsung dari tim Store Mituni." },
                ];

              const highlights = Array.isArray(app.features) && app.features.length > 0
                ? app.features.map((f: any) => f.name || f.title)
                : ["Lisensi Resmi Mituni", "Pembaruan Berkala", "Dukungan CS Langsung"];

              const plans = Array.isArray(app.products) && app.products.length > 0
                ? app.products.map((p: any) => ({
                  id: String(p.id),
                  name: p.name,
                  billingCycle: (p.license_type === "subscription" ? "monthly" : "lifetime") as any,
                  price: Number(p.price) || 0,
                  features: [
                    p.stock > 0 ? `Tersedia ${p.stock} lisensi` : "Stok siap aktivasi",
                    p.ecommerce ? `Platform: ${p.ecommerce}` : "Pembelian Langsung",
                    "Aktivasi lisensi instan",
                    "Dukungan teknis Mituni",
                  ],
                  ctaText: "Pesan Lisensi",
                }))
                : [];

              let badge = "Siap Pakai";
              if (app.status === "coming_soon") {
                badge = "Coming Soon";
              } else if (app.status === "maintenance") {
                badge = "Maintenance";
              } else if (app.license_type === "lifetime") {
                badge = "Lisensi Lifetime";
              }

              return {
                id: `app-${app.id}`,
                slug: app.slug || (app.code || `app-${app.id}`).toLowerCase(),
                name: app.name,
                tagline: app.description || "Solusi perangkat lunak terintegrasi untuk bisnis digital.",
                description: app.description || "Solusi perangkat lunak terintegrasi untuk efisiensi bisnis dan operasional harian.",
                category: app.status === "coming_soon" ? "coming_soon" : (app.license_type === "lifetime" ? "lifetime" : "active"),
                categoryLabel: app.status === "coming_soon" ? "Segera Hadir" : (app.license_type === "lifetime" ? "Lisensi Lifetime" : "Aplikasi Mituni"),
                badge,
                iconName: "Cpu",
                iconUrl,
                status: app.status || "active",
                highlights,
                features,
                plans,
                isApi: true,
              };
            });

            if (isMounted) {
              setApiApplications(mapped);
            }
          }
        }
      } catch (err) {
        console.error("Gagal memuat katalog aplikasi via proxy:", err);
      } finally {
        if (isMounted) {
          setIsLoadingApi(false);
        }
      }

      try {
        const csRes = await fetch("/api/v1/customer-supports");
        if (csRes.ok) {
          const csJson = await csRes.json();
          if (csJson.success && Array.isArray(csJson.data) && csJson.data.length > 0) {
            const firstCs = csJson.data[0];
            if (firstCs.whatsapp && isMounted) {
              setCsWhatsapp(String(firstCs.whatsapp).replace(/[^0-9]/g, ""));
            }
          }
        }
      } catch (err) {
        console.error("Gagal memuat customer support via proxy:", err);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  // ROI Calculator inputs
  const [roiTransactions, setRoiTransactions] = React.useState<number>(150);
  const [roiBranches, setRoiBranches] = React.useState<number>(3);

  // Pricing filter & tab
  const [pricingCycle, setPricingCycle] = React.useState<"monthly" | "yearly">("monthly");
  const [pricingProductTab, setPricingProductTab] = React.useState<string>("mituni-laundry");

  // FAQ accordion
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  // Live code tab for WA Gateway
  const [codeLang, setCodeLang] = React.useState<"curl" | "node" | "php">("curl");

  // Calculations for ROI
  const calculatedSavings = React.useMemo(() => {
    const hoursSaved = Math.round((roiTransactions * 0.04 * 30) + (roiBranches * 12));
    const moneySaved = Math.round((hoursSaved * 40000) + (roiTransactions * 30 * 450));
    const extraRevenue = Math.round(roiTransactions * 30 * 28000 * 0.08);

    return {
      hoursSaved,
      moneySavedFormatted: new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(moneySaved),
      extraRevenueFormatted: new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(extraRevenue),
    };
  }, [roiTransactions, roiBranches]);

  // Dynamic categories for Bento Grid
  const catalogCategories = React.useMemo(() => {
    if (apiApplications.length === 0) {
      return [
        { id: "all", label: `Semua Solusi (${PRODUCTS.length})` },
        { id: "saas", label: "Kasir Laundry" },
        { id: "live-stream", label: "TikTok Live Stream" },
        { id: "marketing", label: "Marketing Analytics" },
        { id: "gateway", label: "WhatsApp Gateway" },
        { id: "ai", label: "AI & Tools" },
      ];
    }

    const categories: { id: string; label: string }[] = [
      { id: "all", label: `Semua Aplikasi (${apiApplications.length})` },
    ];

    const activeCount = apiApplications.filter((p) => p.status === "active" || (!p.status && p.status !== "coming_soon" && p.status !== "maintenance")).length;
    if (activeCount > 0) {
      categories.push({ id: "active", label: `Siap Pakai (${activeCount})` });
    }

    const comingSoonCount = apiApplications.filter((p) => p.status === "coming_soon").length;
    if (comingSoonCount > 0) {
      categories.push({ id: "coming_soon", label: `Coming Soon (${comingSoonCount})` });
    }

    const lifetimeCount = apiApplications.filter((p) => p.plans.some((pl) => pl.billingCycle === "lifetime") || p.category === "lifetime" || p.badge.includes("Lifetime")).length;
    if (lifetimeCount > 0) {
      categories.push({ id: "lifetime", label: `Lisensi Lifetime (${lifetimeCount})` });
    }

    const maintenanceCount = apiApplications.filter((p) => p.status === "maintenance").length;
    if (maintenanceCount > 0) {
      categories.push({ id: "maintenance", label: `Maintenance (${maintenanceCount})` });
    }

    return categories;
  }, [apiApplications]);

  const filteredCatalogProducts = React.useMemo(() => {
    const list = apiApplications.length > 0 ? apiApplications : PRODUCTS;
    if (selectedCategory === "all") return list;

    if (apiApplications.length > 0) {
      if (selectedCategory === "coming_soon") {
        return list.filter((p) => p.status === "coming_soon");
      }
      if (selectedCategory === "active") {
        return list.filter((p) => p.status === "active" || (!p.status && p.status !== "coming_soon" && p.status !== "maintenance"));
      }
      if (selectedCategory === "maintenance") {
        return list.filter((p) => p.status === "maintenance");
      }
      if (selectedCategory === "lifetime") {
        return list.filter((p) => p.plans.some((pl) => pl.billingCycle === "lifetime") || p.category === "lifetime" || p.badge.includes("Lifetime"));
      }
      return list.filter((p) => p.category === selectedCategory);
    }

    return list.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, apiApplications]);

  const currentHeroProduct = PRODUCTS[activeTab];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. HERO SECTION (Linear & Stripe Inspired Canvas) */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden border-b border-border/40 bg-grid-dots">
        {/* Ambient Top Spotlight Beams */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-112.5 bg-linear-to-b from-cyan-500/15 via-teal-500/5 to-transparent blur-[120px] pointer-events-none -z-10" />
        <div className="absolute -top-32 -right-20 size-125 bg-rose-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-48 -left-32 size-112.5 bg-violet-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* High-Tech Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-3.5 py-1 text-xs font-mono text-muted-foreground backdrop-blur-xl shadow-xs mb-8 transition-all hover:border-cyan-500/40">
              <span className="flex size-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-semibold text-foreground">MITUNI SUITE 2026</span>
              <span className="text-border">/</span>
              <span className="text-cyan-600 dark:text-cyan-400">Platform Resmi Terintegrasi</span>
            </div>

            {/* Display Headline with Strict Tight Tracking */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-foreground leading-[1.08] mb-6">
              Infrastruktur & Perangkat Lunak{" "}
              <span className="bg-linear-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Bisnis Digital Indonesia
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl font-normal leading-relaxed mb-10 tracking-[-0.01em]">
              Katalog lengkap solusi perangkat lunak terpadu: dari operasional kasir laundry, intelijen analitik TikTok Shop, otomasi live stream, hingga API WhatsApp Gateway berkecepatan tinggi.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-16">
              <a href="#katalog" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-12 px-7 gap-2 bg-foreground text-background font-semibold shadow-lg shadow-black/10 hover:bg-foreground/90 transition-all hover:scale-[1.02]">
                  <span>Jelajahi 5 Solusi Digital</span>
                  <ArrowRight className="size-4" />
                </Button>
              </a>

              <a
                href={`https://wa.me/${csWhatsapp}?text=Halo%20Tim%20Store%20Mituni,%20saya%20tertarik%20dengan%20produk%20digital%20Mituni%20dan%20ingin%20berkonsultasi.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-7 gap-2 border-border/80 bg-background/60 backdrop-blur-md text-foreground font-semibold hover:bg-muted/80">
                  <PhoneCall className="size-4 text-emerald-500" />
                  <span>Konsultasi Langsung via WA</span>
                </Button>
              </a>
            </div>

            {/* Trust Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl pt-8 border-t border-border/50 text-left">
              <div className="flex flex-col p-3 rounded-xl bg-card/60 border border-border/50 backdrop-blur-sm">
                <span className="font-mono text-2xl font-black tracking-tight text-foreground">1.500+</span>
                <span className="text-[11px] text-muted-foreground font-medium mt-0.5">Bisnis & Agensi Aktif</span>
              </div>
              <div className="flex flex-col p-3 rounded-xl bg-card/60 border border-border/50 backdrop-blur-sm">
                <span className="font-mono text-2xl font-black tracking-tight text-foreground">18 Juta+</span>
                <span className="text-[11px] text-muted-foreground font-medium mt-0.5">Pesan WA Terkirim</span>
              </div>
              <div className="flex flex-col p-3 rounded-xl bg-card/60 border border-border/50 backdrop-blur-sm">
                <span className="font-mono text-2xl font-black tracking-tight text-foreground">120.000+</span>
                <span className="text-[11px] text-muted-foreground font-medium mt-0.5">Sesi Live TikTok</span>
              </div>
              <div className="flex flex-col p-3 rounded-xl bg-card/60 border border-border/50 backdrop-blur-sm">
                <span className="font-mono text-2xl font-black tracking-tight text-foreground">99.95%</span>
                <span className="text-[11px] text-muted-foreground font-medium mt-0.5">Uptime Server API</span>
              </div>
            </div>
          </div>

          {/* Interactive Software Cockpit (Centerpiece Showcase) */}
          <div className="mt-14 max-w-5xl mx-auto rounded-3xl border border-border/80 bg-card/85 backdrop-blur-2xl p-4 sm:p-6 shadow-2xl shadow-black/20">
            {/* Cockpit Window Header */}
            <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-rose-500/80" />
                <span className="size-3 rounded-full bg-amber-500/80" />
                <span className="size-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-[11px] text-muted-foreground hidden sm:inline">
                  mituni-suite-hub / {currentHeroProduct.slug}
                </span>
              </div>

              {/* Product Switcher Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {PRODUCTS.map((prod, idx) => (
                  <button
                    key={prod.id}
                    onClick={() => setActiveTab(idx)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium shrink-0 transition-all cursor-pointer",
                      activeTab === idx
                        ? "bg-foreground text-background shadow-xs font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <span>{prod.name.split(" ")[1] || prod.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Cockpit Content according to selected product */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column: Product Info & Value Prop */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10">
                      {currentHeroProduct.categoryLabel}
                    </Badge>
                    <span className="text-[10px] font-mono text-emerald-500 flex items-center gap-1 font-semibold">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" /> Siap Dipakai
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-foreground mb-2">
                    {currentHeroProduct.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                    {currentHeroProduct.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {currentHeroProduct.highlights.map((hl, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-foreground/90 font-medium">
                        <CheckCircle2 className="size-4 text-cyan-500 shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/60">
                  <Link href={`/${currentHeroProduct.slug}`}>
                    <Button
                      size="sm"
                      className="gap-1.5 bg-foreground text-background hover:bg-foreground/90 font-medium text-xs h-9 cursor-pointer"
                    >
                      <span>Spesifikasi Lengkap</span>
                      <ArrowRight className="size-3.5" />
                    </Button>
                  </Link>

                  <a
                    href={`https://wa.me/${csWhatsapp}?text=Halo%20Tim%20Store%20Mituni,%20saya%20ingin%20memesan%20lisensi%20${encodeURIComponent(currentHeroProduct.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="outline" className="gap-1.5 text-xs h-9 font-medium border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                      <PhoneCall className="size-3.5" />
                      <span>Pesan Lisensi</span>
                    </Button>
                  </a>
                </div>
              </div>

              {/* Right Column: High-Fidelity Interactive Cockpit Preview */}
              <div className="lg:col-span-7 rounded-2xl border border-border/80 bg-background/95 p-4 sm:p-5 shadow-inner">
                {/* 1. Mituni Laundry Cockpit */}
                {currentHeroProduct.id === "mituni-laundry" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-border/60 text-xs">
                      <span className="font-semibold text-foreground flex items-center gap-1.5">
                        <Shirt className="size-4 text-cyan-400" /> POS Kasir & Rak Cucian
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground">Cabang: Sukajadi Utama</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                      <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                        <span className="text-[10px] text-muted-foreground block">Cucian Masuk</span>
                        <span className="font-mono font-bold text-sm text-cyan-400">18 Nota</span>
                      </div>
                      <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <span className="text-[10px] text-muted-foreground block">Proses Cuci</span>
                        <span className="font-mono font-bold text-sm text-amber-400">12 Nota</span>
                      </div>
                      <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <span className="text-[10px] text-muted-foreground block">Rak A-08 (Siap)</span>
                        <span className="font-mono font-bold text-sm text-emerald-400">24 Nota</span>
                      </div>
                      <div className="p-2 rounded-xl bg-muted border border-border/60">
                        <span className="text-[10px] text-muted-foreground block">Omzet Hari Ini</span>
                        <span className="font-mono font-bold text-sm text-foreground">Rp 1.480k</span>
                      </div>
                    </div>

                    {/* Simulated Live WA Notification Bubble */}
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/15 p-3 flex items-start gap-3">
                      <div className="size-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 font-bold text-xs">
                        WA
                      </div>
                      <div className="flex-1 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-emerald-500">Notifikasi Otomatis Terkirim</span>
                          <span className="font-mono text-[10px] text-muted-foreground">Baru saja</span>
                        </div>
                        <p className="text-muted-foreground text-[11px] leading-relaxed">
                          &quot;Halo Kak Cindy, cucian 4.2 Kg Anda (Nota #LND-901) telah selesai disetrika dengan parfum Lavender & tersimpan aman di <strong className="text-foreground">Rak B-04</strong>. Silakan diambil ya!&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Mituni Live Stream Cockpit */}
                {currentHeroProduct.id === "mituni-livestream" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-border/60 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="flex size-2 rounded-full bg-rose-500 animate-pulse" />
                        <span className="font-semibold text-foreground">TikTok Live Monitor • Shift 2</span>
                      </div>
                      <Badge variant="secondary" className="text-[9px] font-mono bg-rose-500/10 text-rose-400 border-rose-500/20">
                        ROAS: 8.4x
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2.5 rounded-xl bg-muted/50 border border-border/50">
                        <span className="text-[10px] text-muted-foreground block">GMV Terpantau</span>
                        <span className="font-mono font-black text-sm text-foreground">Rp 18.450.000</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-muted/50 border border-border/50">
                        <span className="text-[10px] text-muted-foreground block">Penonton Aktif</span>
                        <span className="font-mono font-black text-sm text-foreground">1.820 Live</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-muted/50 border border-border/50">
                        <span className="text-[10px] text-muted-foreground block">Produk Terjual</span>
                        <span className="font-mono font-black text-sm text-emerald-400">492 Pcs</span>
                      </div>
                    </div>

                    {/* Simulated SVG Graph */}
                    <div className="rounded-xl border border-border/50 bg-card p-3">
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-2">
                        <span>Grafik Fluktuasi Penjualan per 15 Menit</span>
                        <span className="text-rose-400 font-mono font-semibold">+42% Peak</span>
                      </div>
                      <div className="h-16 w-full flex items-end gap-1.5 pt-2">
                        {[35, 45, 60, 40, 75, 90, 85, 100, 95, 110, 80, 105].map((h, i) => (
                          <div
                            key={i}
                            style={{ height: `${h}%` }}
                            className="flex-1 rounded-xs bg-linear-to-t from-rose-500/20 to-rose-500 hover:brightness-125 transition-all"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Mituni Marketing Analytics Cockpit */}
                {currentHeroProduct.id === "mituni-marketing" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-border/60 text-xs">
                      <span className="font-semibold text-foreground flex items-center gap-1.5">
                        <Flame className="size-4 text-amber-500" /> Radar Produk Viral TikTok Shop
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground">Snapshot: 15m Terakhir</span>
                    </div>

                    <div className="space-y-1.5">
                      {[
                        { name: "Serum Pencerah Kulit Niacinamide 10%", velocity: "+580 pcs/jam", score: "99.2", gmv: "Rp 142.5M" },
                        { name: "Cushion Matte Flawless SPF 50+", velocity: "+340 pcs/jam", score: "96.8", gmv: "Rp 88.2M" },
                        { name: "Parfum Pria Luxury Eau De Parfum", velocity: "+220 pcs/jam", score: "94.5", gmv: "Rp 64.0M" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-muted/40 border border-border/40 text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="font-mono font-bold text-amber-500 text-xs shrink-0">#{i + 1}</span>
                            <span className="font-medium text-foreground truncate max-w-50 sm:max-w-xs">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-3 shrink-0 font-mono text-[11px]">
                            <span className="text-emerald-500 font-semibold">{item.velocity}</span>
                            <span className="hidden sm:inline text-muted-foreground">{item.gmv}</span>
                            <Badge variant="outline" className="text-[9px] border-amber-500/30 text-amber-400 bg-amber-500/10">
                              Skor {item.score}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Kilex WA Gateway Cockpit */}
                {currentHeroProduct.id === "kilex-wa-gateway" && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-border/60">
                      <div className="flex items-center gap-2">
                        <Terminal className="size-4 text-emerald-400" />
                        <span className="font-bold text-foreground">REST API Tester</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {(["curl", "node", "php"] as const).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => setCodeLang(lang)}
                            className={cn(
                              "px-2 py-0.5 rounded text-[10px] uppercase font-semibold cursor-pointer",
                              codeLang === lang ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-muted-foreground"
                            )}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl bg-black/80 p-3 text-[11px] leading-relaxed text-zinc-300 overflow-x-auto border border-zinc-800">
                      {codeLang === "curl" && (
                        <pre className="font-mono">
                          {`curl -X POST "https://api.mituni.com/wa/v3/send" \\
  -H "Authorization: Bearer kx_live_79a8bc4..." \\
  -d '{"target": "08123456789", "message": "Pesanan Anda terkonfirmasi!"}'`}
                        </pre>
                      )}
                      {codeLang === "node" && (
                        <pre className="font-mono">
                          {`await fetch('https://api.mituni.com/wa/v3/send', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer kx_live_79a8bc4...' },
  body: JSON.stringify({ target: '08123456789', message: 'Hello World' })
});`}
                        </pre>
                      )}
                      {codeLang === "php" && (
                        <pre className="font-mono">
                          {`$res = Http::withToken('kx_live_79a8bc4...')
  ->post('https://api.mituni.com/wa/v3/send', [
    'target' => '08123456789',
    'message' => 'Pesanan Siap'
]);`}
                        </pre>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1">
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="size-3" /> Status: 200 OK (Latency: 18ms)
                      </span>
                      <span>Webhook Status: Active</span>
                    </div>
                  </div>
                )}

                {/* 5. Mituni AI & Automation Cockpit */}
                {currentHeroProduct.id === "mituni-ai-tools" && (
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-border/60">
                      <span className="font-semibold text-foreground flex items-center gap-1.5">
                        <Cpu className="size-4 text-violet-400" /> AI Customer Service 24/7 Simulator
                      </span>
                      <span className="font-mono text-[10px] text-violet-400">LLM Mode: Active</span>
                    </div>

                    <div className="space-y-2 bg-muted/30 p-3 rounded-xl border border-border/50">
                      {/* Customer Msg */}
                      <div className="flex items-start gap-2 justify-end">
                        <div className="rounded-2xl rounded-tr-xs bg-muted px-3 py-1.5 text-foreground max-w-[80%] text-[11px]">
                          Kak, untuk paket laundry kiloan 5kg bisa selesai besok sore nggak ya?
                        </div>
                      </div>

                      {/* AI Agent Msg */}
                      <div className="flex items-start gap-2">
                        <div className="size-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center shrink-0 font-bold text-[10px]">
                          AI
                        </div>
                        <div className="rounded-2xl rounded-tl-xs bg-card border border-border px-3 py-2 text-foreground max-w-[85%] text-[11px] leading-relaxed shadow-xs">
                          Bisa banget, Kak! Jika diantar sebelum jam 10 pagi, paket Express kami siap diambil besok jam 4 sore di Rak A. Mau kami buatkan nomor antrian sekarang? 😊
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1">
                      <span>Kecepatan Balas: 0.8 Detik</span>
                      <span className="text-violet-400 font-semibold">+ Termasuk Auto-Clicker Tool</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BENTO GRID PRODUCT SHOWCASE */}
      <section id="katalog" className="py-24 border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-[11px] font-semibold mb-3 border border-cyan-500/20">
              <Layers className="size-3.5" />
              <span>KATALOG PRODUK LENGKAP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-foreground mb-4">
              Didesain Khusus untuk Efisiensi & Laba Tinggi
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Pilih solusi perangkat lunak yang tepat untuk menyelesaikan kendala operasional Anda secara instan.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {catalogCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                    selectedCategory === cat.id
                      ? "bg-foreground text-background shadow-xs"
                      : "bg-muted/70 text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loading Skeleton */}
          {isLoadingApi ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-border/60 bg-card/60 p-6 flex flex-col justify-between animate-pulse min-h-95"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <div className="size-11 rounded-2xl bg-muted" />
                      <div className="w-20 h-5 rounded-full bg-muted" />
                    </div>
                    <div className="w-24 h-3 rounded bg-muted/70 mb-2" />
                    <div className="w-3/4 h-6 rounded bg-muted mb-3" />
                    <div className="w-full h-8 rounded bg-muted/60 mb-5" />
                    <div className="space-y-2 py-4 border-t border-border/40">
                      <div className="w-full h-3 rounded bg-muted/60" />
                      <div className="w-5/6 h-3 rounded bg-muted/50" />
                    </div>
                  </div>
                  <div className="pt-5 border-t border-border/40 flex flex-col gap-3">
                    <div className="w-28 h-6 rounded bg-muted" />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-9 rounded-xl bg-muted" />
                      <div className="h-9 rounded-xl bg-muted" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCatalogProducts.length === 0 ? (
            <div className="text-center py-16 rounded-3xl border border-border/40 bg-card/50">
              <p className="text-sm text-muted-foreground">Tidak ada produk dalam kategori yang dipilih.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className="mt-4 text-xs"
              >
                Tampilkan Semua Solusi
              </Button>
            </div>
          ) : (
            /* Cards Grid with Linear/Stripe Bento Polish */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCatalogProducts.map((product) => {
                const validPrices = product.plans
                  .map((p) => p.discountPrice || p.price)
                  .filter((p) => p > 0);
                const lowestPrice = validPrices.length > 0 ? Math.min(...validPrices) : 0;
                const formattedPrice = lowestPrice > 0
                  ? new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(lowestPrice)
                  : null;

                const isComingSoon = product.status === "coming_soon";
                const isMaintenance = product.status === "maintenance";

                const waMessage = isComingSoon
                  ? `Halo Tim Store Mituni, saya tertarik dengan produk ${product.name} yang berstatus Coming Soon dan ingin mendapatkan info awal saat rilis.`
                  : `Halo Tim Store Mituni, saya tertarik dengan produk ${product.name} dan ingin memesan lisensi.`;

                return (
                  <div
                    key={product.id}
                    id={product.id}
                    className="rounded-3xl border border-border/80 bg-card p-6 flex flex-col justify-between hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-black/10 transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Subtle Top Gradient Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div>
                      <div className="flex items-start justify-between gap-2 mb-4">
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-muted border border-border/50 group-hover:scale-105 transition-transform overflow-hidden">
                          {product.iconUrl ? (
                            <img
                              src={product.iconUrl}
                              alt={product.name}
                              className="size-7 object-contain"
                              onError={(e) => {
                                (e.currentTarget as HTMLElement).style.display = "none";
                              }}
                            />
                          ) : (
                            PRODUCT_ICONS[product.iconName] || <Layers className="size-5 text-cyan-400" />
                          )}
                        </div>

                        {isComingSoon ? (
                          <span className="font-mono text-[10px] font-semibold text-amber-500 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                            Coming Soon
                          </span>
                        ) : isMaintenance ? (
                          <span className="font-mono text-[10px] font-semibold text-rose-500 dark:text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                            Maintenance
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
                        {product.categoryLabel}
                      </span>
                      <Link href={`/${product.slug}`} className="hover:text-cyan-500 transition-colors">
                        <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-cyan-500 transition-colors mb-2">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-5">
                        {product.tagline}
                      </p>

                      <div className="space-y-2 py-4 border-t border-border/60">
                        {product.highlights.map((hl, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-foreground/90">
                            <Check className="size-3.5 text-cyan-500 shrink-0" />
                            <span className="line-clamp-1">{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-5 border-t border-border/60 flex flex-col gap-3">
                      {isComingSoon ? (
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-[10px] font-mono text-amber-500/90 dark:text-amber-400 block font-medium">Status Rilis</span>
                            <span className="font-mono text-xl font-black text-amber-500 dark:text-amber-400">Segera Hadir</span>
                          </div>
                          <span className="text-xs font-mono text-muted-foreground">/ coming soon</span>
                        </div>
                      ) : isMaintenance ? (
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-[10px] font-mono text-rose-500/90 dark:text-rose-400 block font-medium">Status Aplikasi</span>
                            <span className="font-mono text-xl font-black text-rose-500 dark:text-rose-400">Maintenance</span>
                          </div>
                          <span className="text-xs font-mono text-muted-foreground">/ pemeliharaan</span>
                        </div>
                      ) : formattedPrice ? (
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-[10px] font-mono text-muted-foreground block">Mulai dari</span>
                            <span className="font-mono text-xl font-black text-foreground">{formattedPrice}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {product.plans[0]?.billingCycle === "lifetime" ? "/ lisensi" : "/ paket"}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-[10px] font-mono text-muted-foreground block">Harga Lisensi</span>
                            <span className="font-mono text-lg font-bold text-foreground">Hubungi Tim</span>
                          </div>
                          <span className="text-xs text-muted-foreground">/ konsultasi</span>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2">
                        <Link href={`/${product.slug}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs font-medium h-9 cursor-pointer"
                          >
                            Detail & Fitur
                          </Button>
                        </Link>

                        <a
                          href={`https://wa.me/${csWhatsapp}?text=${encodeURIComponent(waMessage)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="sm"
                            className={cn(
                              "w-full text-xs font-semibold h-9 shadow-xs",
                              isComingSoon
                                ? "bg-amber-500 hover:bg-amber-600 text-white"
                                : "bg-foreground text-background hover:bg-foreground/90"
                            )}
                          >
                            {isComingSoon ? "Nantikan Rilis" : "Pesan Lisensi"}
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 3. INTERACTIVE ROI & COST SAVINGS CALCULATOR */}
      <section id="kalkulator-roi" className="py-24 border-b border-border/40 bg-muted/15">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto rounded-3xl border border-border/80 bg-card p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 size-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-[11px] font-semibold mb-2 border border-cyan-500/20">
                <Calculator className="size-3.5" />
                <span>KALKULATOR EFISIENSI BISNIS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[-0.03em] text-foreground mb-3">
                Hitung Penghematan Nyata Bisnis Anda
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Sesuaikan angka operasional harian Anda di bawah untuk melihat estimasi jam kerja yang berhasil dihemat dan penambahan potensi omzet.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Sliders Input */}
              <div className="space-y-6 bg-muted/40 p-6 rounded-2xl border border-border/60">
                {/* Slider 1 */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-2">
                    <span className="text-foreground">Transaksi Harian Rata-rata:</span>
                    <span className="font-mono text-cyan-600 dark:text-cyan-400 text-sm font-bold">{roiTransactions} Transaksi/hari</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="600"
                    step="10"
                    value={roiTransactions}
                    onChange={(e) => setRoiTransactions(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer h-2 bg-muted rounded-lg"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-muted-foreground mt-1">
                    <span>30</span>
                    <span>300</span>
                    <span>600+</span>
                  </div>
                </div>

                {/* Slider 2 */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-2">
                    <span className="text-foreground">Jumlah Cabang / Streamer:</span>
                    <span className="font-mono text-cyan-600 dark:text-cyan-400 text-sm font-bold">{roiBranches} Unit / Shift</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={roiBranches}
                    onChange={(e) => setRoiBranches(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer h-2 bg-muted rounded-lg"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-muted-foreground mt-1">
                    <span>1</span>
                    <span>8</span>
                    <span>15+</span>
                  </div>
                </div>

                <div className="rounded-xl bg-background/80 p-3 text-[11px] text-muted-foreground border border-border/50">
                  <span className="font-semibold text-foreground">Formula Efisiensi:</span> Berdasarkan eliminasi salah nota manual, percepatan pencatatan kasir, rekap otomatis Excel TikTok, dan notifikasi WA instan.
                </div>
              </div>

              {/* Calculated Results */}
              <div className="flex flex-col gap-3.5">
                <div className="rounded-2xl border border-border/80 bg-background/80 p-5 shadow-xs">
                  <div className="flex items-center gap-3.5">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Clock className="size-5" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block font-medium">Jam Kerja Operasional Dihemat:</span>
                      <span className="font-mono text-2xl font-black text-foreground">~{calculatedSavings.hoursSaved} Jam / Bulan</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/80 bg-background/80 p-5 shadow-xs">
                  <div className="flex items-center gap-3.5">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Coins className="size-5" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block font-medium">Pengeluaran Operasional Terpangkas:</span>
                      <span className="font-mono text-2xl font-black text-emerald-500">{calculatedSavings.moneySavedFormatted}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/80 bg-background/80 p-5 shadow-xs">
                  <div className="flex items-center gap-3.5">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <TrendingUp className="size-5" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block font-medium">Potensi Tambahan Omzet (Retensi Pelanggan):</span>
                      <span className="font-mono text-2xl font-black text-amber-500">+{calculatedSavings.extraRevenueFormatted}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INDUSTRY SOLUTIONS SECTION */}
      <section id="solusi" className="py-24 border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-[11px] font-semibold mb-3 border border-cyan-500/20">
              <Zap className="size-3.5" />
              <span>SOLUSI SESUAI INDUSTRI</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-foreground mb-4">
              Dibangun Khusus untuk Tantangan Bisnis Anda
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Solusi yang langsung siap menjawab kendala harian pemilik bisnis, agensi, dan penjual di Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-3xl border border-border/80 bg-card p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all hover:shadow-xl">
              <div>
                <div className="size-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5 text-cyan-400">
                  <Shirt className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Pengusaha Laundry</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                  Cegah cucian tertukar dengan kode rak dan parfum, pantau operasional kasir multi-cabang, serta buat pelanggan senang lewat WhatsApp otomatis.
                </p>
              </div>
              <a href="#mituni-laundry" className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-1 hover:underline">
                Pelajari Mituni Laundry <ChevronRight className="size-3.5" />
              </a>
            </div>

            <div className="rounded-3xl border border-border/80 bg-card p-6 flex flex-col justify-between hover:border-rose-500/40 transition-all hover:shadow-xl">
              <div>
                <div className="size-11 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-5 text-rose-400">
                  <Radio className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Agensi & Streamer Live</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                  Rekap performa live TikTok dalam hitungan detik dari file Excel, hitung komisi per shift secara transparan, dan pantau efisiensi belanja iklan.
                </p>
              </div>
              <a href="#mituni-livestream" className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1 hover:underline">
                Pelajari Live Stream Suite <ChevronRight className="size-3.5" />
              </a>
            </div>

            <div className="rounded-3xl border border-border/80 bg-card p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all hover:shadow-xl">
              <div>
                <div className="size-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 text-amber-400">
                  <TrendingUp className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Seller & Affiliate Toko</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                  Temukan produk yang mulai viral sebelum kompetitor menyadari. Lacak kecepatan unit terjual dan estimasi omzet dengan data akurat.
                </p>
              </div>
              <a href="#mituni-marketing" className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline">
                Pelajari Marketing Analytics <ChevronRight className="size-3.5" />
              </a>
            </div>

            <div className="rounded-3xl border border-border/80 bg-card p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all hover:shadow-xl">
              <div>
                <div className="size-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 text-emerald-400">
                  <MessageSquare className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Developer & IT Bisnis</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                  Integrasikan notifikasi transaksi, OTP, dan pesan pengingat tagihan dengan REST API berkecepatan tinggi tanpa tarif per-pesan yang mahal.
                </p>
              </div>
              <a href="#kilex-wa-gateway" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline">
                Pelajari Kilex WA Gateway <ChevronRight className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING & TIERED PLANS SECTION (Stripe-inspired) */}
      <section id="harga" className="py-24 border-b border-border/40 bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-[11px] font-semibold mb-3 border border-cyan-500/20">
              <Coins className="size-3.5" />
              <span>SKEMA HARGA TRANSPARAN</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-foreground mb-4">
              Investasi Terjangkau untuk Hasil Nyata
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Aktivasi instan dan otomatis melalui QRIS, Virtual Account Bank, dan e-wallet resmi.
            </p>

            {/* Product Tabs for Pricing */}
            <div className="flex items-center justify-center gap-2 mt-8 overflow-x-auto pb-2 no-scrollbar">
              {PRODUCTS.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => setPricingProductTab(prod.id)}
                  className={cn(
                    "rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap",
                    pricingProductTab === prod.id
                      ? "bg-foreground text-background shadow-xs font-bold"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  {prod.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active Product Pricing Cards */}
          {(() => {
            const currentProduct = PRODUCTS.find((p) => p.id === pricingProductTab) || PRODUCTS[0];

            return (
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentProduct.plans.map((plan) => {
                  const displayPrice = plan.discountPrice || plan.price;
                  const formatted = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(displayPrice);

                  return (
                    <div
                      key={plan.id}
                      className={cn(
                        "rounded-3xl border p-7 flex flex-col justify-between transition-all duration-300 relative bg-card",
                        plan.isPopular
                          ? "border-cyan-500 ring-2 ring-cyan-500/20 shadow-2xl shadow-cyan-900/15"
                          : "border-border/80"
                      )}
                    >
                      {plan.badge && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan-600 text-white font-mono text-[9px] font-bold px-3 py-0.5 uppercase tracking-wider shadow-sm">
                          {plan.badge}
                        </div>
                      )}

                      <div>
                        <div className="mb-4">
                          <h4 className="text-lg font-bold text-foreground">{plan.name}</h4>
                          <span className="font-mono text-[11px] text-muted-foreground capitalize">
                            Siklus: {plan.billingCycle === "monthly" ? "Bulanan" : plan.billingCycle === "yearly" ? "Tahunan" : "Lisensi Seumur Hidup"}
                          </span>
                        </div>

                        <div className="mb-6 flex items-baseline gap-1.5">
                          <span className="font-mono text-3xl font-black text-foreground">{formatted}</span>
                          <span className="text-xs text-muted-foreground">
                            {plan.billingCycle === "monthly" ? "/ bln" : plan.billingCycle === "yearly" ? "/ thn" : ""}
                          </span>
                        </div>

                        <div className="space-y-2.5 pt-5 border-t border-border/60">
                          <span className="font-mono text-[11px] font-semibold text-foreground uppercase tracking-wider block">
                            Fitur Termasuk:
                          </span>
                          {plan.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-xs text-foreground/90 font-medium">
                              <CheckCircle2 className="size-4 text-cyan-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 pt-5 border-t border-border/60">
                        <a
                          href={`https://wa.me/${csWhatsapp}?text=Halo%20Tim%20Store%20Mituni,%20saya%20ingin%20memesan%20paket%20${encodeURIComponent(plan.name)}%20untuk%20produk%20${encodeURIComponent(currentProduct.name)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full block"
                        >
                          <Button
                            className={cn(
                              "w-full text-xs font-semibold h-10",
                              plan.isPopular
                                ? "bg-linear-to-r from-cyan-600 to-teal-600 text-white hover:from-cyan-500 hover:to-teal-500 shadow-lg shadow-cyan-600/20"
                                : ""
                            )}
                            variant={plan.isPopular ? "default" : "outline"}
                          >
                            {plan.ctaText}
                          </Button>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </section>

      {/* 6. VERIFIED TESTIMONIALS (Editorial Style) */}
      <section className="py-24 border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-[11px] font-semibold mb-2 border border-cyan-500/20">
              <Star className="size-3.5 fill-cyan-400 text-cyan-400" />
              <span>TESTIMONI & KEPUASAN PENGGUNA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-foreground mb-3">
              Dipercaya Ratusan Pemilik Bisnis & Agensi
            </h2>
            <p className="text-sm text-muted-foreground">
              Ulasan nyata dari para profesional yang merasakan peningkatan efisiensi bersama ekosistem Mituni.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-border/80 bg-card p-6 flex flex-col justify-between shadow-xs hover:border-cyan-500/30 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-border/60">
                  <span className="block font-bold text-sm text-foreground">{t.name}</span>
                  <span className="block text-[11px] text-muted-foreground mt-0.5">{t.role}</span>
                  <span className="inline-block text-[10px] font-mono font-semibold text-cyan-600 dark:text-cyan-400 mt-2 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                    {t.product}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section id="faq" className="py-24 border-b border-border/40 bg-muted/15">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-[11px] font-semibold mb-2 border border-cyan-500/20">
              <CheckCircle className="size-3.5" />
              <span>TANYA JAWAB</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-foreground mb-3">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-sm text-muted-foreground">
              Semua yang perlu Anda ketahui mengenai sistem lisensi, pembayaran, dan aktivasi.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border/80 bg-card overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-foreground hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronRight
                    className={cn("size-4 text-muted-foreground transition-transform duration-200 shrink-0 ml-2", openFaq === i && "rotate-90 text-cyan-500")}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-xs text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            Ada pertanyaan teknis yang spesifik?{" "}
            <a
              href={`https://wa.me/${csWhatsapp}?text=Halo%20Tim%20Store%20Mituni,%20saya%20ingin%20bertanya...`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              Hubungi Tim Spesialis via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 8. FINAL CONVERSION BANNER (Linear High-Impact) */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl border border-border/80 bg-linear-to-b from-card to-background p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-1/2 translate-x-1/2 -mt-24 size-96 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <span className="size-11 rounded-2xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center mb-4 border border-cyan-500/20">
                <Sparkles className="size-5" />
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-[-0.03em] mb-4">
                Siap Mengakselerasi Bisnis Anda Hari Ini?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed">
                Tingkatkan efisiensi kerja, hilangkan kesalahan manual, dan maksimalkan keuntungan bisnis Anda bersama ekosistem teknologi Mituni.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
                <a
                  href={`https://wa.me/${csWhatsapp}?text=Halo%20Tim%20Store%20Mituni,%20saya%20siap%20mengembangkan%20bisnis%20saya%20dengan%20produk%20Mituni.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button size="lg" className="w-full sm:w-auto h-12 px-8 gap-2 bg-foreground text-background font-semibold shadow-xl hover:bg-foreground/90 transition-all hover:scale-105">
                    <PhoneCall className="size-4" />
                    <span>Konsultasi & Pesan via WhatsApp</span>
                  </Button>
                </a>
                <a href="#katalog" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-6">
                    Lihat Pilihan Produk
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PRODUCT DETAIL & DEMO MODAL */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in-0 duration-150">
          <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-popover p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="size-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-muted border border-border/50 overflow-hidden">
                {activeModalProduct.iconUrl ? (
                  <img
                    src={activeModalProduct.iconUrl}
                    alt={activeModalProduct.name}
                    className="size-7 object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  PRODUCT_ICONS[activeModalProduct.iconName] || <Layers className="size-5 text-cyan-400" />
                )}
              </div>
              <div>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] font-mono font-semibold mb-1",
                    activeModalProduct.status === "coming_soon"
                      ? "border-amber-500/30 text-amber-500 bg-amber-500/10"
                      : activeModalProduct.status === "maintenance"
                        ? "border-rose-500/30 text-rose-500 bg-rose-500/10"
                        : "border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10"
                  )}
                >
                  {activeModalProduct.badge || activeModalProduct.categoryLabel}
                </Badge>
                <h3 className="text-xl font-bold text-foreground">{activeModalProduct.name}</h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
              {activeModalProduct.description}
            </p>

            <div className="space-y-3 mb-6">
              <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/60 pb-2">
                Spesifikasi & Modul Fitur
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeModalProduct.features.map((f, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-muted/40 border border-border/50">
                    <span className="font-semibold text-xs text-foreground block mb-1">{f.title}</span>
                    <span className="text-[11px] text-muted-foreground leading-relaxed block">{f.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {(() => {
              const validPrices = (activeModalProduct.plans || [])
                .map((p) => p.discountPrice || p.price)
                .filter((p) => p > 0);
              const modalLowestPrice = validPrices.length > 0 ? Math.min(...validPrices) : 0;
              const formattedModalPrice = modalLowestPrice > 0
                ? new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(modalLowestPrice)
                : null;

              return (
                <div className="rounded-2xl bg-cyan-500/10 border border-cyan-500/20 p-4 mb-6 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-muted-foreground uppercase block">
                      {activeModalProduct.status === "coming_soon"
                        ? "Status Peluncuran"
                        : activeModalProduct.plans?.length > 0
                          ? `Tersedia ${activeModalProduct.plans.length} Pilihan Paket`
                          : "Status Lisensi"}
                    </span>
                    <span className="font-mono text-sm font-bold text-foreground">
                      {activeModalProduct.status === "coming_soon"
                        ? "Segera Diluncurkan"
                        : formattedModalPrice
                          ? `Mulai dari ${formattedModalPrice}`
                          : "Hubungi Tim Mituni"}
                    </span>
                  </div>
                  {activeModalProduct.isApi ? (
                    <a
                      href={`https://wa.me/${csWhatsapp}?text=${encodeURIComponent(
                        `Halo Tim Store Mituni, saya ingin konsultasi dan pesan produk ${activeModalProduct.name}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="outline" className="text-xs h-8">
                        Hubungi Sales
                      </Button>
                    </a>
                  ) : (
                    <a
                      href="#harga"
                      onClick={() => {
                        setPricingProductTab(activeModalProduct.id);
                        setActiveModalProduct(null);
                      }}
                    >
                      <Button size="sm" variant="outline" className="text-xs h-8">
                        Pilih Paket
                      </Button>
                    </a>
                  )}
                </div>
              );
            })()}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
              <Button variant="ghost" size="sm" onClick={() => setActiveModalProduct(null)}>
                Tutup
              </Button>
              <a
                href={`https://wa.me/${csWhatsapp}?text=${encodeURIComponent(
                  `Halo Tim Store Mituni, saya ingin tanya lebih lanjut mengenai produk ${activeModalProduct.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" className="gap-1.5 bg-foreground text-background hover:bg-foreground/90 font-medium text-xs h-9">
                  <PhoneCall className="size-3.5" />
                  <span>Konsultasikan via WhatsApp</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}