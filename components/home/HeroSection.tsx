"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, FileText, Award, ChevronDown, Tv, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function AnimatedCounter({ target, suffix, label, icon }: { target: number; suffix?: string; label: string; icon: React.ReactNode }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(current)); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-1">
        {icon}
        <span className="text-3xl md:text-5xl font-display font-black text-[var(--accent)]">{count.toLocaleString("pt-BR")}{suffix || "+"}</span>
      </div>
      <p className="text-white/60 text-sm font-ui">{label}</p>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="bg-hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-[var(--accent)]/20 border border-[var(--accent)]/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-[var(--accent)] text-sm font-ui font-medium">Pre-candidato a Deputado Federal 2026</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
              O vereador<br /><span className="text-[var(--accent)]">mais votado</span><br />da historia
            </h2>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-4 max-w-lg">
              5.550 votos em 2008 — recorde historico de Nova Friburgo.
              Jornalista, apresentador da TV do Povo, filho dos ex-vereadores Helio e Irany Medeiros.
            </p>
            <p className="text-white/50 text-base leading-relaxed mb-8 max-w-lg italic">
              &ldquo;Para ser politico e preciso gostar de gente. E meu pai me ensinou a gostar de gente.&rdquo;
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/proposta" className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] px-6 py-3 rounded-full font-ui font-semibold transition-all hover:scale-105">
                <FileText className="w-5 h-5" /> Ver Proposta Principal
              </Link>
              <Link href="/tv" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-ui font-semibold transition-all hover:scale-105">
                <Tv className="w-5 h-5" /> TV do Povo AO VIVO
              </Link>
              <a href="https://wa.me/5522998954874" target="_blank" rel="noopener" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-ui font-semibold transition-all">
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative hidden md:block">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--accent)]/30 to-transparent" />
              <div className="absolute inset-4 rounded-full border-4 border-[var(--accent)]/30 overflow-hidden">
                <Image src="/images/marcos-perfil.jpg" alt="Marcos Medeiros" fill className="object-cover" priority />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[var(--accent)] text-[var(--primary)] rounded-2xl px-4 py-2 font-ui font-bold text-sm shadow-xl">
                <Award className="w-5 h-5 inline mr-1" /> 5.550 votos — Recorde NF
              </div>
              <div className="absolute -top-2 -left-2 bg-red-600 text-white rounded-2xl px-3 py-1.5 font-ui font-bold text-xs shadow-xl flex items-center gap-1.5">
                <Tv className="w-4 h-4" /> TV DO POVO
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
          <AnimatedCounter target={5550} label="Votos — Recorde Historico" icon={<Award className="w-5 h-5 text-[var(--accent)]" />} />
          <AnimatedCounter target={7919} label="Materias Legislativas" icon={<FileText className="w-5 h-5 text-[var(--accent)]" />} />
          <AnimatedCounter target={1647} label="Projetos de Lei" icon={<FileText className="w-5 h-5 text-[var(--accent)]" />} />
          <AnimatedCounter target={20} label="Anos de Luta" icon={<Award className="w-5 h-5 text-[var(--accent)]" />} />
        </motion.div>
        <div className="flex justify-center mt-12"><ChevronDown className="w-6 h-6 text-white/30 animate-bounce" /></div>
      </div>
    </section>
  );
}
