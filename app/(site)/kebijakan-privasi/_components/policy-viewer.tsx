"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Database,
  Cpu,
  Lock,
  Share2,
  UserCheck,
  Archive,
  RefreshCw,
  Mail,
  FileText,
  CreditCard,
  Headphones,
  Printer,
  Copy,
  Check,
  Search,
  ExternalLink,
  PhoneCall,
  Clock,
  ChevronRight,
  Shield,
  FileCheck,
  Smartphone,
  WifiOff,
} from "lucide-react";
import { PolicyItem } from "@/lib/policies-api";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PolicyViewerProps {
  initialPolicy: PolicyItem;
  otherPolicy?: PolicyItem | null;
  isFromApi: boolean;
}

// Icon mapper helper
const getSectionIcon = (iconName?: string) => {
  switch (iconName) {
    case "ShieldCheck":
      return <ShieldCheck className="size-5 text-cyan-500 shrink-0" />;
    case "Database":
      return <Database className="size-5 text-blue-500 shrink-0" />;
    case "Cpu":
      return <Cpu className="size-5 text-purple-500 shrink-0" />;
    case "Lock":
      return <Lock className="size-5 text-emerald-500 shrink-0" />;
    case "Share2":
      return <Share2 className="size-5 text-amber-500 shrink-0" />;
    case "UserCheck":
      return <UserCheck className="size-5 text-indigo-500 shrink-0" />;
    case "Archive":
      return <Archive className="size-5 text-rose-500 shrink-0" />;
    case "RefreshCw":
      return <RefreshCw className="size-5 text-teal-500 shrink-0" />;
    case "Mail":
      return <Mail className="size-5 text-cyan-500 shrink-0" />;
    case "FileText":
      return <FileText className="size-5 text-blue-500 shrink-0" />;
    case "CreditCard":
      return <CreditCard className="size-5 text-emerald-500 shrink-0" />;
    case "Headphones":
      return <Headphones className="size-5 text-violet-500 shrink-0" />;
    default:
      return <Shield className="size-5 text-cyan-500 shrink-0" />;
  }
};

// Simple text parser for bold, italics, bullets
function formatText(text: string) {
  const lines = text.split("\n");

  return lines.map((line, lineIdx) => {
    const trimmed = line.trim();

    if (!trimmed) {
      return <div key={lineIdx} className="h-3" />;
    }

    // Bullet point
    if (trimmed.startsWith("• ") || trimmed.startsWith("- ")) {
      const content = trimmed.substring(2);
      return (
        <li key={lineIdx} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
          <span className="text-cyan-500 font-bold mt-1 shrink-0">•</span>
          <div>{renderFormattedSpans(content)}</div>
        </li>
      );
    }

    // Numbered list item
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      return (
        <li key={lineIdx} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
          <span className="font-mono text-xs font-semibold text-cyan-500 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20 shrink-0 mt-0.5">
            {numMatch[1]}
          </span>
          <div>{renderFormattedSpans(numMatch[2])}</div>
        </li>
      );
    }

    return (
      <p key={lineIdx} className="text-sm text-muted-foreground leading-relaxed">
        {renderFormattedSpans(trimmed)}
      </p>
    );
  });
}

function renderFormattedSpans(str: string) {
  // Simple bold and italic replacement
  const parts = str.split(/(\*\*.*?\*\*|\*.*?\*)/g);

  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={idx} className="italic text-foreground/90">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

export function PolicyViewer({ initialPolicy, otherPolicy, isFromApi }: PolicyViewerProps) {
  const [currentPolicy, setCurrentPolicy] = useState<PolicyItem>(initialPolicy);
  const [activeSection, setActiveSection] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  // Active section scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = currentPolicy.sections.map((s) => document.getElementById(s.id));
      const scrollPos = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(currentPolicy.sections[i].id);
          return;
        }
      }
      if (currentPolicy.sections.length > 0 && !activeSection) {
        setActiveSection(currentPolicy.sections[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPolicy, activeSection]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return currentPolicy.sections;
    const q = searchQuery.toLowerCase();
    return currentPolicy.sections.filter(
      (sec) => sec.title.toLowerCase().includes(q) || sec.content.toLowerCase().includes(q)
    );
  }, [currentPolicy, searchQuery]);

  const formattedDate = useMemo(() => {
    if (!currentPolicy.effective_date) return "Terbaru 2026";
    try {
      const d = new Date(currentPolicy.effective_date);
      return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return String(currentPolicy.effective_date);
    }
  }, [currentPolicy.effective_date]);

  return (
    <div className="min-h-screen bg-background py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">
            Beranda
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground font-medium">Kebijakan & Privasi</span>
          <ChevronRight className="size-3" />
          <span className="text-cyan-500 font-semibold">{currentPolicy.title}</span>
        </nav>

        {/* Hero Header Card */}
        <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-b from-card via-card/90 to-background p-6 sm:p-8 md:p-10 shadow-sm mb-10">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                  <WifiOff className="size-3.5" />
                  100% Offline • Tanpa Pengambilan Data
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400">
                  <ShieldCheck className="size-3.5 text-cyan-500" />
                  UU PDP No. 27/2022
                </span>

                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/60 px-2.5 py-1 text-xs font-mono text-muted-foreground">
                  <Clock className="size-3 text-muted-foreground" />
                  Versi {currentPolicy.version || "2.2"}
                </span>

                {isFromApi ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live API Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs font-mono text-muted-foreground">
                    Dokumen Resmi Terverifikasi
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                {currentPolicy.title}
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {currentPolicy.summary || currentPolicy.content}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-muted-foreground">
                <div>
                  <span className="text-foreground font-semibold">Tanggal Efektif:</span> {formattedDate}
                </div>
                <span className="hidden sm:inline text-border">•</span>
                <div>
                  <span className="text-foreground font-semibold">Mode Operasional:</span>{" "}
                  <strong className="text-emerald-600 dark:text-emerald-400">100% Offline Lokal Android</strong>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="gap-2 text-xs font-mono border-border/80 hover:border-cyan-500/40"
              >
                <Printer className="size-3.5" />
                <span>Cetak / PDF</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="gap-2 text-xs font-mono border-border/80 hover:border-cyan-500/40"
              >
                {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                <span>{copied ? "Tersalin!" : "Salin Tautan"}</span>
              </Button>

              <a
                href="mailto:support@mituni.com"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "gap-2 text-xs font-mono bg-cyan-600 hover:bg-cyan-500 text-white shadow-sm"
                )}
              >
                <Mail className="size-3.5" />
                <span>Hubungi DPO</span>
              </a>
            </div>
          </div>

          {/* Policy Switcher Tabs */}
          {otherPolicy && (
            <div className="relative z-10 mt-8 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground">Pilih Dokumen:</span>
                <div className="inline-flex rounded-lg border border-border/60 bg-muted/30 p-1">
                  <button
                    onClick={() => {
                      if (currentPolicy.slug !== initialPolicy.slug) {
                        setCurrentPolicy(initialPolicy);
                        setSearchQuery("");
                      }
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                      currentPolicy.slug === initialPolicy.slug
                        ? "bg-background text-foreground shadow-sm font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Kebijakan Privasi
                  </button>
                  <button
                    onClick={() => {
                      if (currentPolicy.slug !== otherPolicy.slug) {
                        setCurrentPolicy(otherPolicy);
                        setSearchQuery("");
                      }
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                      currentPolicy.slug === otherPolicy.slug
                        ? "bg-background text-foreground shadow-sm font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Syarat & Ketentuan
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Cari pasal / topik..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-8 text-xs font-mono bg-background/50 border-border/70 focus-visible:ring-cyan-500/40"
                />
              </div>
            </div>
          )}
        </div>

        {/* Key Guarantees Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="flex items-center gap-3.5 p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
            <div className="size-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <WifiOff className="size-5 text-emerald-500" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-foreground">100% Offline Lokal</h4>
              <p className="text-[11px] text-muted-foreground mt-0.5">Berjalan penuh tanpa butuh internet</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
            <div className="size-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="size-5 text-cyan-500" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-foreground">Tanpa Pengambilan Data</h4>
              <p className="text-[11px] text-muted-foreground mt-0.5">Data kasir & UMKM tidak disedot</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
            <div className="size-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
              <Smartphone className="size-5 text-purple-500" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-foreground">Penyimpanan Lokal HP</h4>
              <p className="text-[11px] text-muted-foreground mt-0.5">Database aman di memori perangkat</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
            <div className="size-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Lock className="size-5 text-amber-500" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-foreground">Kedaulatan Milik UMKM</h4>
              <p className="text-[11px] text-muted-foreground mt-0.5">Bebas risiko kebocoran data cloud</p>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Sticky TOC + Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sticky Table of Contents (lg:col-span-4) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="rounded-xl border border-border/80 bg-card/80 backdrop-blur-sm p-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/60">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                  <FileCheck className="size-3.5 text-cyan-500" />
                  Daftar Isi Kebijakan
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {filteredSections.length} Pasal
                </span>
              </div>

              <nav className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto pr-1">
                {filteredSections.map((section, idx) => {
                  const isActive = activeSection === section.id;
                  return (
                    <a
                      key={section.id || idx}
                      href={`#${section.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(section.id);
                        if (el) {
                          const yOffset = -90;
                          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                          window.scrollTo({ top: y, behavior: "smooth" });
                          setActiveSection(section.id);
                        }
                      }}
                      className={cn(
                        "group flex items-start gap-2.5 px-3 py-2 rounded-lg text-xs transition-all",
                        isActive
                          ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold border border-cyan-500/30"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full mt-1.5 shrink-0 transition-colors",
                          isActive ? "bg-cyan-500" : "bg-muted-foreground/40 group-hover:bg-foreground/50"
                        )}
                      />
                      <span className="leading-snug">{section.title}</span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* DPO Quick Info Card */}
            <div className="rounded-xl border border-border/80 bg-card/80 backdrop-blur-sm p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground flex items-center gap-2">
                <Mail className="size-3.5 text-cyan-500" />
                Data Protection Officer
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Untuk pertanyaan terkait keamanan data pribadi dan lisensi Anda, hubungi saluran resmi kami:
              </p>
              <div className="space-y-2 pt-1 text-xs font-mono">
                <a
                  href="mailto:support@mituni.com"
                  className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:underline"
                >
                  <Mail className="size-3 shrink-0" />
                  <span>support@mituni.com</span>
                </a>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <PhoneCall className="size-3 shrink-0" />
                  <span>+62 812-3456-7890 (WA Official)</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Right Column: Sections Document (lg:col-span-8) */}
          <main className="lg:col-span-8 space-y-6">
            {filteredSections.length === 0 ? (
              <Card className="p-8 text-center border-dashed">
                <Search className="size-8 mx-auto text-muted-foreground/60 mb-2" />
                <h3 className="text-sm font-semibold text-foreground">Tidak ada pasal yang cocok</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Coba kata kunci lain atau bersihkan pencarian untuk melihat seluruh pasal.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-xs font-mono"
                >
                  Reset Pencarian
                </Button>
              </Card>
            ) : (
              filteredSections.map((section, idx) => (
                <section
                  key={section.id || idx}
                  id={section.id}
                  className="scroll-mt-24 rounded-xl border border-border/80 bg-card p-6 sm:p-7 shadow-sm transition-all hover:border-border hover:shadow-md"
                >
                  <div className="flex items-center gap-3 pb-4 mb-4 border-b border-border/60">
                    <div className="p-2 rounded-lg bg-muted/80 border border-border/60 shrink-0">
                      {getSectionIcon(section.icon)}
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-3 pl-1">{formatText(section.content)}</div>
                </section>
              ))
            )}

            {/* Bottom Official Sign-off Card */}
            <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 via-card to-indigo-500/10 p-6 sm:p-8 mt-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <WifiOff className="size-3.5" />
                    Jaminan Privasi Aplikasi Android Offline
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    Data Bisnis UMKM 100% Milik Anda di Perangkat Lokal
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                    Seluruh aplikasi kasir Android Store Mituni beroperasi mandiri secara offline. Tidak ada pengunggahan nota, laporan keuangan, atau data pelanggan ke cloud server pihak ketiga. Kedaulatan data bisnis Anda terjamin aman.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ size: "sm" }),
                      "gap-2 text-xs font-mono bg-emerald-600 hover:bg-emerald-500 text-white"
                    )}
                  >
                    <PhoneCall className="size-3.5" />
                    <span>WhatsApp CS</span>
                  </a>
                  <Link
                    href="/"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "gap-2 text-xs font-mono border-border/80"
                    )}
                  >
                    <span>Kembali ke Beranda</span>
                    <ExternalLink className="size-3" />
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
