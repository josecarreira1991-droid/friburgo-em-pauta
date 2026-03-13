import type { Metadata } from "next";
import { NewsTicker } from "@/components/layout/NewsTicker";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatFAB } from "@/components/layout/ChatFAB";
import { PushBanner } from "@/components/notifications/PushBanner";
import { UrgencyBanner } from "@/components/home/UrgencyBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Friburgo em Pauta | Marcos Medeiros — Deputado Federal 2026",
    template: "%s | Marcos Medeiros — Deputado Federal 2026",
  },
  description: "Portal político de Marcos Medeiros, o vereador mais votado da história de Nova Friburgo. Candidato a Deputado Federal RJ 2026 pelo DC 27. 7.919 matérias legislativas. Proposta de incentivos fiscais para Nova Friburgo.",
  keywords: [
    "Marcos Medeiros", "Nova Friburgo", "Deputado Federal", "RJ", "2026",
    "Friburgo em Pauta", "DC 27", "Democracia Cristã", "TV do Povo",
    "incentivos fiscais", "Lei Rouanet", "vereador Nova Friburgo",
    "candidato deputado federal Nova Friburgo"
  ],
  authors: [{ name: "Marcos Medeiros" }],
  creator: "Marcos Medeiros",
  publisher: "Friburgo em Pauta",
  openGraph: {
    title: "Friburgo em Pauta | Marcos Medeiros — Deputado Federal 2026",
    description: "O vereador mais votado da história de Nova Friburgo. Candidato a Deputado Federal 2026. Proposta: fazer o imposto ficar em Friburgo.",
    url: "https://friburgoempauta.com.br",
    siteName: "Friburgo em Pauta",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Marcos Medeiros — Deputado Federal 2026 — Nova Friburgo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Friburgo em Pauta | Marcos Medeiros",
    description: "O vereador mais votado da história de Nova Friburgo. Candidato a Deputado Federal 2026.",
    creator: "@marcosmedeiros_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="canonical" href="https://friburgoempauta.com.br" />
        <meta name="geo.region" content="BR-RJ" />
        <meta name="geo.placename" content="Nova Friburgo" />
        <meta name="geo.position" content="-22.2822;-42.5311" />
        <meta name="ICBM" content="-22.2822, -42.5311" />
      </head>
      <body className="min-h-screen flex flex-col">
        <NewsTicker />
        <UrgencyBanner />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatFAB />
        <PushBanner />
      </body>
    </html>
  );
}
