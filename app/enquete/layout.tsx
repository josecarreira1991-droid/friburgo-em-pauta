import type { Metadata } from "next";

const BASE_URL = "http://187.77.210.204:3080";

export const metadata: Metadata = {
  title: "Enquete: O que mais precisa mudar em Nova Friburgo?",
  description: "Vote nas prioridades de Nova Friburgo e veja o que a cidade pensa. Saúde, educação, segurança, infraestrutura e mais. Marcos Medeiros quer saber sua opinião.",
  keywords: ["enquete Nova Friburgo", "prioridades Nova Friburgo", "Marcos Medeiros enquete", "votar Nova Friburgo", "o que mudar Nova Friburgo"],
  openGraph: {
    title: "Enquete: O que mais precisa mudar em Nova Friburgo?",
    description: "Vote nas prioridades e veja o ranking ao vivo. Sua opinião molda o plano de governo de Marcos Medeiros para Deputado Federal 2026.",
    url: `${BASE_URL}/enquete`,
    type: "website",
    images: [
      {
        url: `${BASE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Enquete de Prioridades — Nova Friburgo — Marcos Medeiros",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "O que mais precisa mudar em Nova Friburgo? Vote agora!",
    description: "Enquete de prioridades com ranking ao vivo. Marcos Medeiros quer saber sua opinião.",
    images: [`${BASE_URL}/images/og-image.jpg`],
  },
  alternates: {
    canonical: `${BASE_URL}/enquete`,
  },
};

export default function EnqueteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
