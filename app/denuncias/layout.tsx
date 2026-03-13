import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Denuncie um Problema em Nova Friburgo",
  description: "Fale direto com Marcos Medeiros. Denuncie problemas de saúde, educação, infraestrutura, segurança e mais. Cada denúncia vira pauta na TV do Povo.",
  openGraph: {
    title: "Denuncie um Problema — Friburgo em Pauta",
    description: "Canal direto com Marcos Medeiros. Denuncie problemas em Nova Friburgo.",
    type: "website",
  },
};

export default function DenunciasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
