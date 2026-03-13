import type { Metadata } from "next";
import { NewsTicker } from "@/components/layout/NewsTicker";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatFAB } from "@/components/layout/ChatFAB";
import { PushBanner } from "@/components/notifications/PushBanner";
import { UrgencyBanner } from "@/components/home/UrgencyBanner";
import "./globals.css";

const BASE_URL = "http://187.77.210.204:3080";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Friburgo em Pauta | Marcos Medeiros — Deputado Federal 2026",
    template: "%s | Marcos Medeiros — Deputado Federal 2026",
  },
  description: "Portal político de Marcos Medeiros, o vereador mais votado da história de Nova Friburgo. Candidato a Deputado Federal RJ 2026 pelo DC 27. 7.919 matérias legislativas. Proposta de incentivos fiscais para Nova Friburgo.",
  keywords: [
    "Marcos Medeiros", "Nova Friburgo", "Deputado Federal", "RJ", "2026",
    "Friburgo em Pauta", "DC 27", "Democracia Cristã", "TV do Povo",
    "incentivos fiscais", "Lei Rouanet", "vereador Nova Friburgo",
    "candidato deputado federal Nova Friburgo", "eleições 2026",
    "proposta incentivos fiscais Nova Friburgo", "Marcos Medeiros vereador",
  ],
  authors: [{ name: "Marcos Medeiros" }],
  creator: "Marcos Medeiros",
  publisher: "Friburgo em Pauta",
  openGraph: {
    title: "Friburgo em Pauta | Marcos Medeiros — Deputado Federal 2026",
    description: "O vereador mais votado da história de Nova Friburgo. Candidato a Deputado Federal 2026. Proposta: fazer o imposto ficar em Friburgo.",
    url: BASE_URL,
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
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="geo.region" content="BR-RJ" />
        <meta name="geo.placename" content="Nova Friburgo" />
        <meta name="geo.position" content="-22.2822;-42.5311" />
        <meta name="ICBM" content="-22.2822, -42.5311" />
        <meta name="theme-color" content="#0F2447" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Skip Navigation — Acessibilidade */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-[var(--accent)] focus:text-[var(--primary)] focus:px-4 focus:py-2 focus:rounded-lg focus:font-ui focus:font-bold focus:text-sm"
        >
          Pular para o conteúdo principal
        </a>

        <NewsTicker />
        <UrgencyBanner />
        <Header />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <ChatFAB />
        <PushBanner />
      </body>
    </html>
  );
}
