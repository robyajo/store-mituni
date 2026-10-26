import type { Metadata } from "next";
import { fetchPolicyFromApi } from "@/lib/policies-api";
import { PolicyViewer } from "./_components/policy-viewer";

export const metadata: Metadata = {
  title: "Kebijakan Privasi & Perlindungan Data Pribadi",
  description:
    "Kebijakan privasi resmi PT Mituni Digital Indonesia sesuai Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27 Tahun 2022). Standar keamanan lisensi kasir laundry, live stream tools, dan WA gateway.",
  keywords: [
    "Kebijakan Privasi Mituni",
    "Privacy Policy Store Mituni",
    "UU PDP Mituni",
    "Perlindungan Data Pribadi Indonesia",
    "Keamanan Lisensi POS Laundry",
    "PT Mituni Digital Indonesia",
  ],
  openGraph: {
    title: "Kebijakan Privasi & Perlindungan Data Pribadi | Store Mituni",
    description:
      "Kebijakan privasi resmi PT Mituni Digital Indonesia sesuai UU PDP No. 27 Tahun 2022. Transparansi pemrosesan data, lisensi perangkat lunak, dan perlindungan privasi konsumen.",
    url: "/kebijakan-privasi",
    siteName: "Store Mituni",
    locale: "id_ID",
    type: "website",
  },
};

export const revalidate = 60;

export default async function KebijakanPrivasiPage() {
  const [privacyResult, termsResult] = await Promise.all([
    fetchPolicyFromApi("kebijakan-privasi"),
    fetchPolicyFromApi("syarat-ketentuan"),
  ]);

  return (
    <PolicyViewer
      initialPolicy={privacyResult.data}
      otherPolicy={termsResult.data}
      isFromApi={privacyResult.isFromApi}
    />
  );
}
