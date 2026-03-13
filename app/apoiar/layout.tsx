import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apoie Marcos Medeiros para Deputado Federal 2026",
  description: "Seja voluntário, divulgador digital ou liderança de bairro. Faça parte do time que vai levar Nova Friburgo para Brasília. Marcos Medeiros — DC 27.",
  openGraph: {
    title: "Apoie Marcos Medeiros — Deputado Federal 2026",
    description: "Faça parte do movimento. Seja voluntário, divulgador ou liderança de bairro.",
    type: "website",
  },
};

export default function ApoiarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
