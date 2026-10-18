import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  PhoneCall,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Terminal,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50 pt-16 pb-12 transition-colors">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 pb-12 border-b border-border/50">
          {/* Brand & Description Column (2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="relative flex items-center">
                <Image
                  src="/logo.png"
                  alt="Store Mituni"
                  width={140}
                  height={32}
                  className="h-7 sm:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </div>
              <span className="inline-flex items-center rounded-md border border-cyan-500/30 bg-cyan-500/10 px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                STORE
              </span>
            </Link>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm font-normal">
              Platform e-commerce dan showcase resmi untuk seluruh ekosistem produk digital <strong className="text-foreground font-semibold">Mituni</strong>. Menghadirkan perangkat lunak andal untuk memajukan UMKM laundry, kreator live streaming, dan penjual digital di Indonesia.
            </p>

            <div className="flex flex-col gap-2 pt-2 text-[11px] font-mono text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="size-3 text-cyan-400 shrink-0" />
                <span>Jakarta & Padang, Indonesia</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-3 text-cyan-400 shrink-0" />
                <a href="mailto:support@mituni.com" className="hover:text-foreground transition-colors">
                  support@mituni.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="size-3 text-emerald-400 shrink-0" />
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors font-semibold text-emerald-500">
                  +62 812-3456-7890 (WhatsApp Official)
                </a>
              </div>
            </div>
          </div>

          {/* Col 1: Produk Digital */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[11px] font-mono font-semibold tracking-wider text-foreground uppercase">
              Produk Digital
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-muted-foreground">
              <li>
                <a href="#mituni-laundry" className="hover:text-cyan-500 transition-colors">
                  Mituni Laundry SaaS
                </a>
              </li>
              <li>
                <a href="#mituni-livestream" className="hover:text-cyan-500 transition-colors">
                  Live Stream Suite
                </a>
              </li>
              <li>
                <a href="#mituni-marketing" className="hover:text-cyan-500 transition-colors">
                  Marketing Analytics
                </a>
              </li>
              <li>
                <a href="#kilex-wa-gateway" className="hover:text-cyan-500 transition-colors">
                  Kilex WA Gateway
                </a>
              </li>
              <li>
                <a href="#mituni-ai-tools" className="hover:text-cyan-500 transition-colors">
                  Mituni AI & Auto-Click
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Solusi Berdasarkan Sektor */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[11px] font-mono font-semibold tracking-wider text-foreground uppercase">
              Solusi Bisnis
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-muted-foreground">
              <li>
                <a href="#solusi" className="hover:text-cyan-500 transition-colors">
                  Bisnis Laundry UMKM
                </a>
              </li>
              <li>
                <a href="#solusi" className="hover:text-cyan-500 transition-colors">
                  Agensi & Streamer TikTok
                </a>
              </li>
              <li>
                <a href="#solusi" className="hover:text-cyan-500 transition-colors">
                  Seller & Toko Online
                </a>
              </li>
              <li>
                <a href="#solusi" className="hover:text-cyan-500 transition-colors">
                  Developer & Integrator API
                </a>
              </li>
              <li>
                <a href="#kalkulator-roi" className="hover:text-cyan-500 transition-colors">
                  Kalkulator Efisiensi
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Kepercayaan & Dukungan */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[11px] font-mono font-semibold tracking-wider text-foreground uppercase">
              Dukungan & Layanan
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-muted-foreground">
              <li>
                <a href="#faq" className="hover:text-cyan-500 transition-colors">
                  Pusat Bantuan & FAQ
                </a>
              </li>
              <li>
                <span className="flex items-center gap-1.5 text-foreground font-mono text-[11px]">
                  <CheckCircle2 className="size-3 text-emerald-400" /> Uptime SLA 99.95%
                </span>
              </li>
              <li>
                <span className="flex items-center gap-1.5 text-foreground font-mono text-[11px]">
                  <ShieldCheck className="size-3 text-cyan-400" /> Midtrans Gateway
                </span>
              </li>
              <li>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 transition-colors inline-flex items-center gap-1 font-mono text-[11px]">
                  Konsultasi Spesialis <ExternalLink className="size-2.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-muted-foreground font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-foreground">Sistem Pembayaran Terverifikasi:</span>
            <div className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded bg-muted border border-border/60 text-[10px] font-bold text-foreground">QRIS</span>
              <span className="px-1.5 py-0.5 rounded bg-muted border border-border/60 text-[10px] font-bold text-foreground">BCA VA</span>
              <span className="px-1.5 py-0.5 rounded bg-muted border border-border/60 text-[10px] font-bold text-foreground">Mandiri</span>
              <span className="px-1.5 py-0.5 rounded bg-muted border border-border/60 text-[10px] font-bold text-foreground">GoPay</span>
              <span className="px-1.5 py-0.5 rounded bg-muted border border-border/60 text-[10px] font-bold text-foreground">ShopeePay</span>
            </div>
          </div>

          <div className="text-center md:text-right">
            <span>© {new Date().getFullYear()} PT Mituni Digital Indonesia. Seluruh hak cipta dilindungi.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}