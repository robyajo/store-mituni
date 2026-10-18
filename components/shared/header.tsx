"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  Shirt,
  Radio,
  TrendingUp,
  MessageSquare,
  Cpu,
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRODUCTS } from "@/lib/products-data";
import { cn } from "@/lib/utils";

const PRODUCT_ICONS: Record<string, React.ReactNode> = {
  Shirt: <Shirt className="size-4 text-cyan-400" />,
  Radio: <Radio className="size-4 text-rose-400" />,
  TrendingUp: <TrendingUp className="size-4 text-amber-400" />,
  MessageSquare: <MessageSquare className="size-4 text-emerald-400" />,
  Cpu: <Cpu className="size-4 text-violet-400" />,
};

export default function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/75 backdrop-blur-xl transition-all duration-300">
      {/* Top Ticker Bar */}
      <div className="hidden border-b border-border/30 bg-muted/20 py-1.5 text-[11px] text-muted-foreground sm:block">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-semibold text-foreground tracking-tight">Mituni Release v2.6:</span>
            <span className="text-muted-foreground">Konektor TikTok Live & WA Gateway API v3 kini tersedia dengan aktivasi lisensi instan.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
              <ShieldCheck className="size-3.5 text-cyan-400" /> Midtrans Verified
            </span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
              <Terminal className="size-3 text-violet-400" /> 99.95% API Uptime
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center">
            <Image
              src="/logo.png"
              alt="Store Mituni"
              width={140}
              height={32}
              priority
              className="h-7 sm:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </div>
          <span className="inline-flex items-center rounded-md border border-cyan-500/30 bg-cyan-500/10 px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            STORE
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden items-center gap-1 lg:flex">
          {/* Products Mega Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductsDropdownOpen(true)}
            onMouseLeave={() => setProductsDropdownOpen(false)}
          >
            <button
              onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer",
                productsDropdownOpen
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              <span>Produk Digital</span>
              <ChevronDown className={cn("size-3.5 transition-transform duration-200", productsDropdownOpen && "rotate-180 text-foreground")} />
            </button>

            {/* Dropdown Floating Panel */}
            {productsDropdownOpen && (
              <div className="absolute left-0 top-full pt-2 w-[520px] animate-in fade-in-0 zoom-in-95 duration-150">
                <div className="rounded-2xl border border-border/70 bg-popover/90 backdrop-blur-2xl p-3 shadow-2xl shadow-black/20">
                  <div className="flex items-center justify-between px-3 py-1.5 mb-2 border-b border-border/50 text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                    <span>5 Solusi Perangkat Lunak Unggulan</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold">Produk Resmi</span>
                  </div>

                  <div className="grid grid-cols-1 gap-1">
                    {PRODUCTS.map((prod) => (
                      <a
                        key={prod.id}
                        href={`#${prod.id}`}
                        onClick={() => setProductsDropdownOpen(false)}
                        className="group flex items-start gap-3 rounded-xl p-2.5 transition-all duration-150 hover:bg-muted/80 border border-transparent hover:border-border/60"
                      >
                        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted border border-border/40 group-hover:scale-105 transition-transform">
                          {PRODUCT_ICONS[prod.iconName]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs text-foreground group-hover:text-cyan-500 transition-colors">
                              {prod.name}
                            </span>
                            <span className="text-[9px] font-mono font-medium text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded-full border border-cyan-500/20">
                              {prod.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                            {prod.tagline}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>

                  <div className="mt-2 rounded-xl bg-muted/40 p-2.5 flex items-center justify-between text-xs text-muted-foreground border border-border/40">
                    <span className="flex items-center gap-1.5 text-[11px]">
                      <CheckCircle2 className="size-3.5 text-emerald-500" /> Siap integrasi & aktivasi lisensi otomatis
                    </span>
                    <a href="#katalog" className="font-medium text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1">
                      Katalog Lengkap <ArrowRight className="size-3" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          <a
            href="#solusi"
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/60"
          >
            Solusi Bisnis
          </a>

          <a
            href="#kalkulator-roi"
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/60"
          >
            Kalkulator ROI
          </a>

          <a
            href="#harga"
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/60"
          >
            Daftar Harga
          </a>

          <a
            href="#faq"
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/60"
          >
            FAQ
          </a>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Theme Toggle Button */}
          {mounted && (
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex size-8 items-center justify-center rounded-lg border border-border/70 bg-background/50 text-muted-foreground transition-all hover:bg-muted hover:text-foreground cursor-pointer shadow-xs"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="size-3.5 text-amber-400" />
              ) : (
                <Moon className="size-3.5 text-slate-700" />
              )}
            </button>
          )}

          {/* WhatsApp Direct Consultation */}
          <a
            href="https://wa.me/6281234567890?text=Halo%20Tim%20Store%20Mituni,%20saya%20ingin%20berkonsultasi%20mengenai%20produk%20digital%20Mituni."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
          >
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 text-xs gap-1.5 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 font-medium"
            >
              <PhoneCall className="size-3" />
              <span>Konsultasi WA</span>
            </Button>
          </a>

          {/* Primary CTA */}
          <a href="#katalog">
            <Button
              size="sm"
              className="h-8 px-3.5 text-xs gap-1.5 bg-foreground text-background hover:bg-foreground/90 font-semibold shadow-xs"
            >
              <span>Jelajahi Produk</span>
              <ArrowRight className="size-3" />
            </Button>
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="flex size-8 items-center justify-center rounded-lg border border-border/70 bg-background text-foreground lg:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background/95 backdrop-blur-2xl px-4 py-4 lg:hidden animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-2">
            <div className="px-2 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
              Produk Digital Mituni
            </div>
            <div className="grid gap-1">
              {PRODUCTS.map((prod) => (
                <a
                  key={prod.id}
                  href={`#${prod.id}`}
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-xs font-medium text-foreground hover:bg-muted"
                >
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted">
                    {PRODUCT_ICONS[prod.iconName]}
                  </div>
                  <div className="flex-1">
                    <span className="block font-semibold">{prod.name}</span>
                    <span className="text-[10px] text-muted-foreground">{prod.categoryLabel}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="my-2 border-t border-border/60" />

            <div className="px-2 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
              Navigasi Halaman
            </div>
            <a
              href="#solusi"
              onClick={closeMobileMenu}
              className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
            >
              Solusi Bisnis
            </a>
            <a
              href="#kalkulator-roi"
              onClick={closeMobileMenu}
              className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
            >
              Kalkulator ROI
            </a>
            <a
              href="#harga"
              onClick={closeMobileMenu}
              className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
            >
              Daftar Harga Paket
            </a>
            <a
              href="#faq"
              onClick={closeMobileMenu}
              className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
            >
              Tanya Jawab (FAQ)
            </a>

            <div className="mt-3 pt-3 border-t border-border/60">
              <a
                href="https://wa.me/6281234567890?text=Halo%20Tim%20Store%20Mituni,%20saya%20tertarik%20dengan%20produk%20digital%20Mituni."
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
              >
                <Button variant="outline" className="w-full gap-2 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs h-9">
                  <PhoneCall className="size-3.5" />
                  <span>Chat WhatsApp Tim Spesialis</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}