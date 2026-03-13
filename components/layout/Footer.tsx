import Link from "next/link";
import { Instagram, Facebook, MessageCircle, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[var(--bg-dark)] text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl text-white mb-2">
              FRIBURGO <span className="text-[var(--accent)]">EM PAUTA</span>
            </h3>
            <p className="text-white/50 font-ui text-sm mb-4">
              Portal politico de Marcos Medeiros — candidato a Deputado Estadual 2026
            </p>
            <p className="text-sm leading-relaxed">
              20+ anos lutando por Nova Friburgo. 1.842+ projetos de lei.
              O vereador mais votado da historia da cidade.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="https://instagram.com/marcos_medeiros_noticias" target="_blank" rel="noopener" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--accent)] hover:text-[var(--primary)] flex items-center justify-center transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--accent)] hover:text-[var(--primary)] flex items-center justify-center transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--accent)] hover:text-[var(--primary)] flex items-center justify-center transition-all">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-ui font-semibold text-white mb-4 uppercase text-sm tracking-wider">Navegacao</h4>
            <ul className="space-y-2 font-ui text-sm">
              <li><Link href="/projetos" className="hover:text-[var(--accent)] transition-colors">Projetos de Lei</Link></li>
              <li><Link href="/conquistas" className="hover:text-[var(--accent)] transition-colors">Conquistas</Link></li>
              <li><Link href="/noticias" className="hover:text-[var(--accent)] transition-colors">Noticias</Link></li>
              <li><Link href="/videos" className="hover:text-[var(--accent)] transition-colors">Videos</Link></li>
              <li><Link href="/sobre" className="hover:text-[var(--accent)] transition-colors">Sobre Marcos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-ui font-semibold text-white mb-4 uppercase text-sm tracking-wider">Contato</h4>
            <ul className="space-y-3 font-ui text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--accent)]" />
                contato@friburgoempautam.com.br
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--accent)]" />
                (22) 99999-0000
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[var(--accent)]" />
                <Link href="/chat" className="hover:text-[var(--accent)] transition-colors">Chat com Marcos (IA)</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-white/40">2026 Friburgo em Pauta. Todos os direitos reservados.</p>
          <p className="text-white/30 text-xs">Powered by Quantrex LLC — myceo.store</p>
        </div>
      </div>
    </footer>
  );
}
