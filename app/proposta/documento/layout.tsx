import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plano de Governo Completo — Marcos Medeiros Deputado Federal 2026",
  description: "Documento completo do plano de governo de Marcos Medeiros para Deputado Federal 2026. Incentivos fiscais, saúde, educação, infraestrutura e mais para Nova Friburgo e Região Serrana.",
  openGraph: {
    title: "Plano de Governo — Marcos Medeiros — Deputado Federal 2026",
    description: "O que Marcos Medeiros vai fazer em Brasília pelo povo de Nova Friburgo. Documento completo.",
    type: "article",
  },
};

export default function DocumentoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
