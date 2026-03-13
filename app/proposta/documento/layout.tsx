import type { Metadata } from "next";

const BASE_URL = "http://187.77.210.204:3080";

export const metadata: Metadata = {
  title: "Plano de Governo Completo — Marcos Medeiros Deputado Federal 2026",
  description: "Documento completo do plano de governo de Marcos Medeiros para Deputado Federal 2026. Incentivos fiscais, saúde, educação, infraestrutura e mais para Nova Friburgo e Região Serrana.",
  keywords: ["plano de governo Marcos Medeiros", "deputado federal 2026 Nova Friburgo", "incentivos fiscais Nova Friburgo", "proposta DC 27", "programa político Nova Friburgo"],
  openGraph: {
    title: "Plano de Governo — Marcos Medeiros — Deputado Federal 2026",
    description: "O que Marcos Medeiros vai fazer em Brasília pelo povo de Nova Friburgo. Incentivos fiscais, saúde, educação, infraestrutura e mais.",
    url: `${BASE_URL}/proposta/documento`,
    type: "article",
    images: [
      {
        url: `${BASE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Plano de Governo — Marcos Medeiros — Deputado Federal 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plano de Governo Completo — Marcos Medeiros 2026",
    description: "O que Marcos Medeiros vai fazer em Brasília pelo povo de Nova Friburgo.",
    images: [`${BASE_URL}/images/og-image.jpg`],
  },
  alternates: {
    canonical: `${BASE_URL}/proposta/documento`,
  },
};

export default function DocumentoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
