"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, MessageCircle, Tv } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Proposta", href: "/proposta" },
  { label: "TV do Povo", href: "/tv", highlight: true },
  { label: "Projetos", href: "/projetos" },
  { label: "Conquistas", href: "/conquistas" },
  { label: "Noticias", href: "/noticias" },
  { label: "Videos", href: "/videos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-[var(--primary)] sticky top-0 z-40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/marcos-perfil.jpg" alt="Marcos" width={40} height={40} className="rounded-full border-2 border-[var(--accent)]" />
            <div>
              <h1 className="text-white font-display text-lg md:text-xl font-bold leading-tight">
                FRIBURGO <span className="text-[var(--accent)]">EM PAUTA</span>
              </h1>
              <p className="text-white/50 text-[10px] md:text-xs font-ui tracking-widest uppercase">Marcos Medeiros — DC 27</p>
            </div>
          </Link>
          <nav className="hidden xl:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href}
                className={"px-3 py-2 text-sm font-ui transition-colors rounded-md " +
                  (item.highlight
                    ? "text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-1"
                    : "text-white/70 hover:text-white hover:bg-white/5")}>
                {item.highlight && <Tv className="w-3.5 h-3.5" />}
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/chat" className="hidden sm:flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] px-4 py-2 rounded-full text-sm font-ui font-semibold transition-all animate-[pulseGold_2s_ease-in-out_infinite]">
              <MessageCircle className="w-4 h-4" /> Falar com Marcos
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden text-white p-2" aria-label="Menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="xl:hidden bg-[var(--primary-med)] border-t border-white/10 overflow-hidden">
            <nav className="flex flex-col p-4 gap-1">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}
                  className={"px-4 py-3 text-base font-ui rounded-lg transition-colors flex items-center gap-2 " +
                    (item.highlight ? "text-red-400 hover:bg-red-500/10" : "text-white/80 hover:text-white hover:bg-white/5")}>
                  {item.highlight && <Tv className="w-4 h-4" />}
                  {item.label}
                </Link>
              ))}
              <a href="https://wa.me/5522998954874" target="_blank" rel="noopener"
                className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg text-base font-ui font-semibold mt-2">
                <MessageCircle className="w-5 h-5" /> WhatsApp do Marcos
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
