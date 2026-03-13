"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Projetos de Lei", href: "/projetos" },
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
            <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center">
              <span className="text-[var(--primary)] font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-white font-display text-lg md:text-xl font-bold leading-tight">
                FRIBURGO <span className="text-[var(--accent)]">EM PAUTA</span>
              </h1>
              <p className="text-white/50 text-[10px] md:text-xs font-ui tracking-widest uppercase">
                Marcos Medeiros
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/70 hover:text-white px-3 py-2 text-sm font-ui transition-colors rounded-md hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/chat"
              className="hidden sm:flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] px-4 py-2 rounded-full text-sm font-ui font-semibold transition-all animate-[pulseGold_2s_ease-in-out_infinite]"
            >
              <MessageCircle className="w-4 h-4" />
              Falar com Marcos
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[var(--primary-med)] border-t border-white/10 overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white px-4 py-3 text-base font-ui rounded-lg hover:bg-white/5 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/chat"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 bg-[var(--accent)] text-[var(--primary)] px-4 py-3 rounded-lg text-base font-ui font-semibold mt-2"
              >
                <MessageCircle className="w-5 h-5" />
                Falar com Marcos
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
