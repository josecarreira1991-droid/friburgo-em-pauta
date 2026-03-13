import type { Metadata } from "next";

const BASE_URL = "http://187.77.210.204:3080";

export const metadata: Metadata = {
  title: "Denuncie um Problema em Nova Friburgo",
  description: "Fale direto com Marcos Medeiros. Denuncie problemas de saúde, educação, infraestrutura, segurança e mais em Nova Friburgo. Cada denúncia vira pauta na TV do Povo.",
  keywords: ["denúncia Nova Friburgo", "problemas Nova Friburgo", "Marcos Medeiros denúncia", "TV do Povo", "canal cidadão"],
  openGraph: {
    title: "Denuncie um Problema em Nova Friburgo — Marcos Medeiros",
    description: "Canal direto com Marcos Medeiros. Denuncie saúde, educação, infraestrutura, segurança. Cada denúncia vira pauta na TV do Povo.",
    url: `${BASE_URL}/denuncias`,
    type: "website",
    images: [
      {
        url: `${BASE_URL}/images/og-denuncias.jpg`,
        width: 1200,
        height: 630,
        alt: "Denuncie um Problema em Nova Friburgo — Canal direto com Marcos Medeiros",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Denuncie um Problema em Nova Friburgo",
    description: "Canal direto com Marcos Medeiros. Cada denúncia vira pauta na TV do Povo.",
    images: [`${BASE_URL}/images/og-denuncias.jpg`],
  },
  alternates: {
    canonical: `${BASE_URL}/denuncias`,
  },
};

export default function DenunciasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
