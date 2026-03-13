import type { Metadata } from "next";
import { NewsTicker } from "@/components/layout/NewsTicker";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatFAB } from "@/components/layout/ChatFAB";
import { PushBanner } from "@/components/notifications/PushBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Friburgo em Pauta | Marcos Medeiros — Deputado Federal 2026",
  description: "Portal politico de Marcos Medeiros, o vereador mais votado da historia de Nova Friburgo. Candidato a Deputado Federal RJ 2026. 1.842+ projetos de lei.",
  keywords: ["Marcos Medeiros", "Nova Friburgo", "Deputado Federal", "RJ", "2026", "Friburgo em Pauta"],
  openGraph: {
    title: "Friburgo em Pauta | Marcos Medeiros",
    description: "O vereador mais votado da historia de Nova Friburgo. Candidato a Deputado Federal 2026.",
    url: "https://friburgoempautam.com.br",
    siteName: "Friburgo em Pauta",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Friburgo em Pauta | Marcos Medeiros",
    description: "O vereador mais votado da historia de Nova Friburgo.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col">
        <NewsTicker />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatFAB />
        <PushBanner />
      </body>
    </html>
  );
}
