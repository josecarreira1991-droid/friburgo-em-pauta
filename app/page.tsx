import { HeroSection } from "@/components/home/HeroSection";
import { ConquistasCards } from "@/components/home/ConquistasCards";
import { VideoFeed } from "@/components/home/VideoFeed";
import { AudioPlayer } from "@/components/home/AudioPlayer";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { SocialFeed } from "@/components/home/SocialFeed";
import { ChatPreview } from "@/components/home/ChatPreview";
import { LeadCapture } from "@/components/home/LeadCapture";
import Link from "next/link";
import { Tv, ArrowRight, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Banner Proposta */}
      <section className="bg-[var(--accent)] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-display text-xl md:text-2xl italic text-[var(--primary)] font-bold">
              &ldquo;O imposto vai embora do municipio, nao volta.&rdquo;
            </p>
            <p className="text-[var(--primary)]/70 font-ui text-sm mt-1">Proposta principal — Incentivos fiscais para Nova Friburgo</p>
          </div>
          <Link href="/proposta" className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-5 py-2.5 rounded-full text-sm font-ui font-semibold hover:bg-[var(--primary-med)] transition-all shrink-0">
            Ver Proposta Completa <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Banner TV do Povo */}
      <section className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white font-ui font-bold text-xs">LIVE</span>
            </div>
            <div>
              <p className="text-white font-display text-lg font-bold">TV DO POVO — Todos os dias ao vivo</p>
              <p className="text-white/60 text-xs font-ui">Marcos Medeiros direto de Nova Friburgo</p>
            </div>
          </div>
          <Link href="/tv" className="inline-flex items-center gap-2 bg-white text-red-600 px-5 py-2.5 rounded-full text-sm font-ui font-bold hover:bg-white/90 transition-all shrink-0">
            <Tv className="w-4 h-4" /> Assistir Agora
          </Link>
        </div>
      </section>

      <ConquistasCards />
      <VideoFeed />
      <AudioPlayer />

      {/* Link SAPL */}
      <section className="py-4 bg-[var(--bg-paper)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <a href="https://sapl.novafriburgo.rj.leg.br/parlamentar/84/materias" target="_blank" rel="noopener"
            className="inline-flex items-center gap-2 text-[var(--accent)] font-ui font-semibold text-sm hover:underline">
            Ver todos os 7.919 projetos no SAPL oficial da Camara <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      <ProjectsPreview />
      <SocialFeed />
      <ChatPreview />
      <LeadCapture />
    </>
  );
}
