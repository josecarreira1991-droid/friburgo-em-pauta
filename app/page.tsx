import { HeroSection } from "@/components/home/HeroSection";
import { ConquistasCards } from "@/components/home/ConquistasCards";
import { VideoFeed } from "@/components/home/VideoFeed";
import { AudioPlayer } from "@/components/home/AudioPlayer";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { SocialFeed } from "@/components/home/SocialFeed";
import { ChatPreview } from "@/components/home/ChatPreview";
import { LeadCapture } from "@/components/home/LeadCapture";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Banner Proposta */}
      <section className="bg-[var(--accent)] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-display text-xl md:text-2xl italic text-[var(--primary)] font-bold">
            &ldquo;O imposto vai embora do municipio, nao volta.&rdquo;
          </p>
          <p className="text-[var(--primary)]/70 font-ui text-sm mt-1">
            Proposta de lei para redirecionar incentivos fiscais para Nova Friburgo
          </p>
        </div>
      </section>

      <ConquistasCards />
      <VideoFeed />
      <AudioPlayer />
      <ProjectsPreview />
      <SocialFeed />
      <ChatPreview />
      <LeadCapture />
    </>
  );
}
