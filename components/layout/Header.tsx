"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, MessageCircle, Tv, ChevronDown, AlertTriangle, BarChart3, Heart, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Proposta", href: "/proposta" },
  { label: "TV do Povo", href: "/tv", highlight: true },
  { label: "Denuncias", href: "/denuncias" },
  { label: "Videos", href: "/videos" },
  { label: "Noticias", href: "/noticias" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

const MAIS_ITEMS = [
  { label: "Enquete de Prioridades", href: "/enquete", icon: BarChart3, desc: "Vote no que mais precisa mudar" },
  { label: "Apoiar Marcos", href: "/apoiar", icon: Heart, desc: "Seja voluntário ou divulgador" },
  { label: "Plano de Governo", href: "/proposta/documento", icon: FileText, desc: "Documento completo" },
  { label: "Projetos de Lei", href: "/projetos", icon: FileText, desc: "7.919 matérias legislativas" },
  { label: "Conquistas", href: "/conquistas", icon: Heart, desc: "Trajetória política" },
  { label: "Assessoria", href: "/assessoria", icon: MessageCircle, desc: "Para imprensa e parceiros" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [maisOpen, setMaisOpen] = useState(false);

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
              <p className="text-white/50 text-[10px] md:text-xs font-ui tracking-widest uppercase">DC 27 — Nova Friburgo</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href}
                className={"px-3 py-2 text-sm font-ui transition-colors rounded-md " +
                  (item.highlight
                    ? "text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-1"
                    : item.href === "/denuncias"
                    ? "text-orange-300 hover:text-orange-200 hover:bg-orange-500/10 flex items-center gap-1"
                    : "text-white/70 hover:text-white hover:bg-white/5")}>
                {item.highlight && <Tv className="w-3.5 h-3.5" />}
                {item.href === "/denuncias" && <AlertTriangle className="w-3.5 h-3.5" />}
                {item.label}
              </Link>
            ))}

            {/* Dropdown Mais */}
            <div className="relative">
              <button
                onClick={() => setMaisOpen(!maisOpen)}
                onBlur={() => setTimeout(() => setMaisOpen(false), 200)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-ui text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors">
                Mais <ChevronDown className={`w-3.5 h-3.5 transition-transform ${maisOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {maisOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden z-50">
                    {MAIS_ITEMS.map((item) => (
                      <Link key={item.href} href={item.href}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-[var(--bg-paper)] transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[var(--accent)]/20 transition-colors">
                          <item.icon className="w-4 h-4 text-[var(--accent)]" />
                        </div>
                        <div>
                          <p className="font-ui font-semibold text-[var(--primary)] text-sm">{item.label}</p>
                          <p className="font-ui text-[var(--primary)]/40 text-xs">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/apoiar" className="hidden md:flex items-center gap-2 bg-[var(--accent)]/20 hover:bg-[var(--accent)]/30 text-[var(--accent)] border border-[var(--accent)]/30 px-3 py-1.5 rounded-full text-xs font-ui font-semibold transition-all">
              <Heart className="w-3.5 h-3.5" /> Apoiar
            </Link>
            <Link href="/chat" className="hidden sm:flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] px-4 py-2 rounded-full text-sm font-ui font-semibold transition-all animate-[pulseGold_2s_ease-in-out_infinite]">
              <MessageCircle className="w-4 h-4" /> Falar com Marcos
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden text-white p-2" aria-label="Menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="xl:hidden bg-[var(--primary-med)] border-t border-white/10 overflow-hidden">
            <nav className="flex flex-col p-4 gap-1">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}
                  className={"px-4 py-3 text-base font-ui rounded-lg transition-colors flex items-center gap-2 " +
                    (item.highlight ? "text-red-400 hover:bg-red-500/10" :
                     item.href === "/denuncias" ? "text-orange-300 hover:bg-orange-500/10" :
                     "text-white/80 hover:text-white hover:bg-white/5")}>
                  {item.highlight && <Tv className="w-4 h-4" />}
                  {item.href === "/denuncias" && <AlertTriangle className="w-4 h-4" />}
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-white/10 mt-2 pt-2 space-y-1">
                {MAIS_ITEMS.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}
                    className="px-4 py-3 text-base font-ui rounded-lg transition-colors flex items-center gap-2 text-white/60 hover:text-white hover:bg-white/5">
                    <item.icon className="w-4 h-4 text-[var(--accent)]" />
                    {item.label}
                  </Link>
                ))}
              </div>
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
