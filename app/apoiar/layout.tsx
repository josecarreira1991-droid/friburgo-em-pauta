import type { Metadata } from "next";

const BASE_URL = "http://187.77.210.204:3080";

export const metadata: Metadata = {
  title: "Apoie Marcos Medeiros para Deputado Federal 2026",
  description: "Faça parte do movimento. Seja voluntário, divulgador digital, liderança de bairro ou empresário apoiador. Juntos vamos levar Nova Friburgo para Brasília.",
  keywords: ["apoiar Marcos Medeiros", "voluntário campanha Nova Friburgo", "deputado federal 2026", "DC 27", "campanha política Nova Friburgo"],
  openGraph: {
    title: "Apoie Marcos Medeiros — Deputado Federal 2026",
    description: "Faça parte do movimento. Seja voluntário, divulgador digital ou liderança de bairro. Juntos vamos levar Nova Friburgo para Brasília.",
    url: `${BASE_URL}/apoiar`,
    type: "website",
    images: [
      {
        url: `${BASE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Apoie Marcos Medeiros — Deputado Federal 2026 — Nova Friburgo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apoie Marcos Medeiros — Deputado Federal 2026",
    description: "Faça parte do movimento. Juntos vamos levar Nova Friburgo para Brasília.",
    images: [`${BASE_URL}/images/og-image.jpg`],
  },
  alternates: {
    canonical: `${BASE_URL}/apoiar`,
  },
};

export default function ApoiarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
