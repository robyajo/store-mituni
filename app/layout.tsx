import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://store.mituni.com";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#08090c" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Store Mituni — Pusat Solusi Perangkat Lunak & Bisnis Digital Indonesia",
    template: "%s | Store Mituni",
  },
  description:
    "Platform e-commerce dan showcase resmi untuk seluruh ekosistem produk digital Mituni: SaaS Manajemen Kasir Laundry, Analitik TikTok Live Stream, Intelijen Produk TikTok Shop, Kilex WhatsApp Gateway API, dan Asisten AI Bisnis.",
  keywords: [
    "Store Mituni",
    "Mituni",
    "Software Bisnis Indonesia",
    "Aplikasi Kasir Laundry",
    "SaaS Laundry Multi Cabang",
    "TikTok Live Stream Agent",
    "Rekap Live Performance TikTok",
    "TikTok Shop Analytics Indonesia",
    "FastMoss Indonesia",
    "Kalodata Indonesia",
    "WhatsApp Gateway API",
    "Kilex WA Gateway",
    "Auto Clicker Marketplace",
    "AI Customer Service WhatsApp",
    "Software UMKM Indonesia",
    "PT Mituni Digital Indonesia",
  ],
  authors: [{ name: "PT Mituni Digital Indonesia", url: baseUrl }],
  creator: "PT Mituni Digital Indonesia",
  publisher: "PT Mituni Digital Indonesia",
  applicationName: "Store Mituni",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: baseUrl,
    siteName: "Store Mituni",
    title: "Store Mituni — Pusat Solusi Perangkat Lunak & Bisnis Digital Indonesia",
    description:
      "Katalog resmi produk digital ekosistem Mituni: Laundry POS SaaS, TikTok Live Performance Tracker, Marketing Analytics, dan Kilex WhatsApp Gateway.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Store Mituni — Pusat Solusi Produk Digital Indonesia",
        type: "image/png",
      },
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Store Mituni Banner",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Store Mituni — Pusat Solusi Perangkat Lunak & Bisnis Digital Indonesia",
    description:
      "Solusi perangkat lunak terpadu untuk bisnis laundry, live streamer, seller TikTok Shop, dan developer di Indonesia.",
    images: ["/og-image.png"],
    creator: "@mituni_id",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "PT Mituni Digital Indonesia",
        url: baseUrl,
        logo: `${baseUrl}/android-chrome-512x512.png`,
        sameAs: ["https://wa.me/6281234567890"],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+62-812-3456-7890",
            contactType: "customer service",
            areaServed: "ID",
            availableLanguage: ["Indonesian", "English"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Store Mituni",
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        inLanguage: "id-ID",
      },
      {
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Mituni Laundry Management SaaS",
            description: "Sistem kasir POS dan manajemen operasional bisnis laundry multi-cabang.",
            url: `${baseUrl}/#mituni-laundry`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Mituni Live Stream Suite",
            description: "Infrastruktur analitik dan konektor real-time TikTok Live streaming.",
            url: `${baseUrl}/#mituni-livestream`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Mituni Marketing Analytics",
            description: "Platform riset pasar dan produk trending TikTok Shop Indonesia.",
            url: `${baseUrl}/#mituni-marketing`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Kilex WhatsApp Gateway",
            description: "Layanan REST API Gateway WhatsApp untuk notifikasi transaksi dan OTP.",
            url: `${baseUrl}/#kilex-wa-gateway`,
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Mituni AI & Automation Tools",
            description: "Asisten AI customer support 24/7 dan ekstensi browser task automator.",
            url: `${baseUrl}/#mituni-ai-tools`,
          },
        ],
      },
    ],
  };

  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
