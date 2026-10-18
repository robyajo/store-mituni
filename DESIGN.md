---
version: 1.0.0
name: Mituni-Store-Design-System
description: "Sebuah sistem desain perangkat lunak modern yang terinspirasi dari Linear dan Stripe (dari koleksi VoltAgent/awesome-design-md). Menggabungkan kanvas near-black (#08090c) dengan tangga permukaan (surface ladder) bertekstur arang, garis batas hairline (rgba(255,255,255,0.08)), tipografi dengan tracking ketat (-0.035em), dan aksen warna bernuansa cyan-teal (#06b6d4, #14b8a6) sebagai representasi keandalan dan teknologi digital."

colors:
  primary: "#06b6d4"
  primary-hover: "#22d3ee"
  primary-focus: "#0891b2"
  accent-teal: "#14b8a6"
  accent-emerald: "#10b981"
  accent-rose: "#f43f5e"
  accent-amber: "#f59e0b"
  accent-violet: "#8b5cf6"
  
  canvas: "#08090c"
  surface-1: "#0f1115"
  surface-2: "#14171d"
  surface-3: "#1a1e26"
  surface-4: "#222731"
  
  hairline: "rgba(255, 255, 255, 0.08)"
  hairline-strong: "rgba(255, 255, 255, 0.15)"
  hairline-subtle: "rgba(255, 255, 255, 0.05)"
  
  ink: "#f7f8f8"
  ink-muted: "#d0d6e0"
  ink-subtle: "#8a8f98"
  ink-tertiary: "#525660"

typography:
  display-2xl:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: "64px"
    fontWeight: "800"
    letterSpacing: "-0.04em"
    lineHeight: "1.05"
  display-xl:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: "48px"
    fontWeight: "800"
    letterSpacing: "-0.035em"
    lineHeight: "1.1"
  display-lg:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: "36px"
    fontWeight: "700"
    letterSpacing: "-0.03em"
    lineHeight: "1.15"
  headline:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: "24px"
    fontWeight: "700"
    letterSpacing: "-0.02em"
    lineHeight: "1.2"
  body-lg:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: "18px"
    fontWeight: "400"
    letterSpacing: "-0.01em"
    lineHeight: "1.6"
  body:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: "14px"
    fontWeight: "400"
    lineHeight: "1.5"
  mono-tag:
    fontFamily: "Geist Mono, JetBrains Mono, monospace"
    fontSize: "11px"
    fontWeight: "600"
    letterSpacing: "0.05em"
    textTransform: "uppercase"

rounded:
  xs: "4px"
  sm: "6px"
  md: "10px"
  lg: "16px"
  xl: "24px"
  pill: "9999px"

atmosphere:
  grid-pattern: "radial-gradient(rgba(120, 140, 180, 0.15) 1px, transparent 1px) 24px 24px"
  spotlight: "radial-gradient(ellipse at top, rgba(6, 182, 212, 0.15), transparent 70%)"
  inner-highlight: "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)"
  bento-blur: "backdrop-filter: blur(16px)"
---

# Panduan Desain Store Mituni (Linear + Stripe Hybrid)

Sistem antarmuka Store Mituni mengadopsi prinsip desain dari **Linear.app** dan **Stripe** yang dianalisis pada repositori `VoltAgent/awesome-design-md`:

1. **Kanvas Gelap Bertingkat (Dark Surface Ladder)**:
   - Tidak menggunakan warna hitam datar (#000). Menggunakan `#08090c` sebagai latar utama dengan tangga elevasi `#0f1115` (kartu level 1) dan `#14171d` (panel level 2).
   - Dilengkapi garis batas *hairline* transparan tipis (`border-white/[0.08]`) untuk memisahkan bidang dengan tegas namun tetap halus.

2. **Cockpit Perangkat Lunak Nyata (Software Cockpit UI)**:
   - Setiap fitur dipresentasikan bukan sebagai teks biasa, melainkan sebagai simulasi antarmuka perangkat lunak nyata: status bar macOS, papan kanban cucian, grafik SVG fluktuasi live stream, radar produk trending TikTok Shop, dan terminal kode cURL.

3. **Tipografi Berkontras Tinggi & Monospace Accents**:
   - Judul besar menggunakan `tracking-[-0.04em]` dengan perpaduan teks gradien.
   - Setiap metrik angka, status server, dan lencana kategori diberi sentuhan `font-mono text-[10px]` untuk memberikan nuansa *engineering precision*.

4. **Kalkulator & Interaksi Langsung**:
   - Slider dinamis untuk simulasi ROI dengan umpan balik perhitungan instan.
   - Modal detail produk tanpa jeda pemuatan halaman.
