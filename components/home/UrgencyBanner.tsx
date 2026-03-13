"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, X, Heart, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

// Simula contador crescente de apoiadores
function useApoiadorCounter() {
  const [count, setCount] = useState(1247);
  useEffect(() => {
    const interval = setInterval(() => {
      // Incrementa aleatoriamente a cada 30-90 segundos
      const shouldIncrement = Math.random() > 0.7;
      if (shouldIncrement) {
        setCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      }
    }, 45000);
    return () => clearInterval(interval);
  }, []);
  return count;
}

export function UrgencyBanner() {
  const apoiadores = useApoiadorCounter();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="bg-gradient-to-r from-[var(--primary)] via-[#1a3a6b] to-[var(--primary)] border-b border-[var(--accent)]/30 relative z-30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-1.5 bg-[var(--accent)]/20 border border-[var(--accent)]/30 rounded-full px-3 py-1 shrink-0">
            <Users className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="text-[var(--accent)] text-xs font-ui font-bold">
              {apoiadores.toLocaleString("pt-BR")}
            </span>
          </div>
          <p className="text-white/70 text-xs font-ui truncate">
            <span className="text-white font-semibold">friburguenses</span> já apoiam Marcos Medeiros para Deputado Federal
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/apoiar"
            className="hidden sm:flex items-center gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] px-3 py-1.5 rounded-full text-xs font-ui font-bold transition-all">
            <Heart className="w-3 h-3" /> Apoiar
          </Link>
          <button onClick={() => setDismissed(true)} className="text-white/30 hover:text-white/60 transition-colors p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
