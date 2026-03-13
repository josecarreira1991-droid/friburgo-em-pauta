import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Youtube, MessageCircle, Mail, Phone, Twitter, Tv, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[var(--bg-dark)] text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/images/marcos-perfil.jpg" alt="Marcos" width={48} height={48} className="rounded-full border-2 border-[var(--accent)]" />
              <div>
                <h3 className="font-display text-2xl text-white">FRIBURGO <span className="text-[var(--accent)]">EM PAUTA</span></h3>
                <p className="text-white/40 font-ui text-xs">Marcos Medeiros — DC 27 — Deputado Federal 2026</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-2">
              Jornalista, apresentador da TV do Povo. 5.550 votos em 2008 — o vereador mais votado da historia de Nova Friburgo. Filho dos ex-vereadores Helio e Irany Medeiros.
            </p>
            <p className="text-sm leading-relaxed text-white/40 italic">
              &ldquo;Para ser politico e preciso gostar de gente. E meu pai me ensinou a gostar de gente.&rdquo;
            </p>
            <div className="flex gap-3 mt-6">
              <a href="https://instagram.com/marcos_medeiros_noticias" target="_blank" rel="noopener" className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white flex items-center justify-center transition-all" title="Instagram"><Instagram className="w-5 h-5" /></a>
              <a href="https://www.facebook.com/marcosmedeirosfriburgo" target="_blank" rel="noopener" className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all" title="Facebook"><Facebook className="w-5 h-5" /></a>
              <a href="https://www.youtube.com/@tvdopovo-canal3566" target="_blank" rel="noopener" className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all" title="YouTube"><Youtube className="w-5 h-5" /></a>
              <a href="https://x.com/marcosmedeiros_" target="_blank" rel="noopener" className="w-10 h-10 rounded-full bg-white/10 hover:bg-black hover:text-white flex items-center justify-center transition-all" title="X/Twitter"><Twitter className="w-5 h-5" /></a>
              <a href="https://wa.me/5522998954874" target="_blank" rel="noopener" className="w-10 h-10 rounded-full bg-white/10 hover:bg-green-600 hover:text-white flex items-center justify-center transition-all" title="WhatsApp"><MessageCircle className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-ui font-semibold text-white mb-4 uppercase text-sm tracking-wider">Navegacao</h4>
            <ul className="space-y-2 font-ui text-sm">
              <li><Link href="/proposta" className="hover:text-[var(--accent)] transition-colors">Proposta Principal</Link></li>
              <li><Link href="/tv" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1"><Tv className="w-3 h-3" /> TV do Povo</Link></li>
              <li><Link href="/projetos" className="hover:text-[var(--accent)] transition-colors">Projetos de Lei</Link></li>
              <li><Link href="/conquistas" className="hover:text-[var(--accent)] transition-colors">Conquistas</Link></li>
              <li><Link href="/noticias" className="hover:text-[var(--accent)] transition-colors">Noticias</Link></li>
              <li><Link href="/videos" className="hover:text-[var(--accent)] transition-colors">Videos</Link></li>
              <li><Link href="/sobre" className="hover:text-[var(--accent)] transition-colors">Sobre Marcos</Link></li>
              <li><a href="https://sapl.novafriburgo.rj.leg.br/parlamentar/84/materias" target="_blank" rel="noopener" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1">SAPL — Todos os Projetos <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-ui font-semibold text-white mb-4 uppercase text-sm tracking-wider">Contato</h4>
            <ul className="space-y-3 font-ui text-sm">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-[var(--accent)]" /> +55 22 99895-4874</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-[var(--accent)]" /><a href="https://www.marcosmedeiros.net" target="_blank" rel="noopener" className="hover:text-[var(--accent)]">marcosmedeiros.net</a></li>
              <li className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-[var(--accent)]" /><Link href="/chat" className="hover:text-[var(--accent)] transition-colors">Chat com Marcos (IA)</Link></li>
            </ul>
            <div className="mt-6 bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-xs text-white/40 font-ui">Partido</p>
              <p className="text-white font-ui font-bold">Democrata Cristao (DC)</p>
              <p className="text-[var(--accent)] font-display text-2xl font-black">27</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-white/40">2026 Friburgo em Pauta. Marcos Medeiros — DC 27.</p>
          <p className="text-white/30 text-xs">Powered by Quantrex LLC — myceo.store</p>
        </div>
      </div>
    </footer>
  );
}
