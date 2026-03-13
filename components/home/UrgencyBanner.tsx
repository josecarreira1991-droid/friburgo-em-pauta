"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, X, Heart } from "lucide-react";
import Link from "next/link";

function useApoiadorCounter() {
  const [count, setCount] = useState(1247);

  useEffect(() => {
    // Busca contagem real da API
    fetch("/api/leads-count")
      .then(r => r.json())
      .then((data: { total?: number }) => {
        if (data.total && data.total > 0) setCount(data.total);
      })
      .catch(() => {});
  }, []);

  return count;
}

export function UrgencyBanner() {
  const apoiadores = useApoiadorCounter();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("urgency_dismissed");
      if (saved === "true") setDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("urgency_dismissed", "true");
    }
  };

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
            <Users className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />
            <span className="text-[var(--accent)] text-xs font-ui font-bold" aria-live="polite">
              {apoiadores.toLocaleString("pt-BR")}
            </span>
          </div>
          <p className="text-white/70 text-xs font-ui truncate">
            <span className="text-white font-semibold">friburguenses</span> já apoiam Marcos Medeiros para Deputado Federal
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/apoiar"
            className="hidden sm:flex items-center gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] px-3 py-1.5 rounded-full text-xs font-ui font-bold transition-all"
            aria-label="Apoiar a candidatura de Marcos Medeiros"
          >
            <Heart className="w-3 h-3" aria-hidden="true" /> Apoiar
          </Link>
          <button
            onClick={handleDismiss}
            className="text-white/30 hover:text-white/60 transition-colors p-1"
            aria-label="Fechar banner"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
