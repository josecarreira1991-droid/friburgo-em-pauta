import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enquete: O que mais precisa mudar em Nova Friburgo?",
  description: "Vote nas prioridades de Nova Friburgo. Saúde, educação, segurança, infraestrutura? Sua voz define o plano de governo de Marcos Medeiros para Deputado Federal 2026.",
  openGraph: {
    title: "Enquete de Prioridades — Friburgo em Pauta",
    description: "Vote no que mais precisa mudar em Nova Friburgo. Sua opinião define as prioridades.",
    type: "website",
  },
};

export default function EnqueteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
