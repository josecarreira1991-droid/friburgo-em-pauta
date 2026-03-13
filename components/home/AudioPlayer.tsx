"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";

const TRANSCRICAO = [
  { time: 0, text: "Meu projeto e o seguinte: existem projetos de incentivos fiscais federais pro esporte, pra cultura, pro meio ambiente." },
  { time: 12, text: "Existem projetos de incentivos de impostos estaduais — no meio ambiente, na cultura, no esporte e outros." },
  { time: 22, text: "Fazer um projeto de lei que os municipios fiquem obrigados a trabalhar em um banco de dados com as maiores empresas locais." },
  { time: 35, text: "Porque essas empresas, elas destinarao parte de seus impostos, de acordo com a legislacao, para que possa financiar projetos esportivos, culturais, educacionais e de meio ambiente pro proprio municipio." },
  { time: 55, text: "Ou seja, voce tem um monte de empresa que paga um monte de imposto federal, estadual. O imposto vai embora do municipio, nao volta." },
  { time: 70, text: "Se essas leis fossem usadas atraves de uma legislacao municipal, esse dinheiro nao iria embora. Ele ia ficar para financiar projetos dentro do municipio." },
  { time: 90, text: "Voce conscientizando as empresas que, ao inves de pagar o imposto federal, eles pegam de acordo com a legislacao e financiam projetos no proprio municipio. Esse dinheiro deixa de sair do municipio — fica no municipio." },
];

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const activeSegment = [...TRANSCRICAO].reverse().find((s) => currentTime >= s.time) || TRANSCRICAO[0];

  return (
    <section className="py-20 bg-[var(--bg-paper)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Direto do Marcos</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Proposta em Audio</h2>
          <p className="text-[var(--primary)]/60 mt-2 font-ui">Ouca o Marcos explicando sua proposta principal</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-[var(--border)] p-6 md:p-8 shadow-sm"
        >
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] flex items-center justify-center transition-all shrink-0"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
            <div className="flex-1">
              <h3 className="font-ui font-semibold">Proposta: Incentivos Fiscais para Nova Friburgo</h3>
              <p className="text-sm text-[var(--primary)]/50 font-ui">2min 10s — Marcos Medeiros</p>
            </div>
            <Volume2 className="w-5 h-5 text-[var(--primary)]/30" />
          </div>

          <div className="w-full h-1.5 bg-[var(--bg-paper)] rounded-full mb-6 overflow-hidden">
            <div className="h-full bg-[var(--accent)] rounded-full transition-all" style={{ width: "0%" }} />
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {TRANSCRICAO.map((seg, i) => (
              <div
                key={i}
                className={"p-3 rounded-lg text-sm leading-relaxed transition-all cursor-pointer " +
                  (activeSegment === seg
                    ? "bg-[var(--accent)]/10 border-l-4 border-[var(--accent)] text-[var(--primary)]"
                    : "text-[var(--primary)]/50 hover:text-[var(--primary)]/70")}
              >
                <span className="text-[var(--accent)] font-ui text-xs font-bold mr-2">
                  {Math.floor(seg.time / 60)}:{(seg.time % 60).toString().padStart(2, "0")}
                </span>
                {seg.text}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <blockquote className="font-display text-2xl md:text-3xl italic text-[var(--primary)] leading-snug">
            &ldquo;O imposto vai embora do municipio, nao volta.&rdquo;
          </blockquote>
          <p className="text-[var(--accent)] font-ui font-semibold mt-3">— Marcos Medeiros</p>
        </motion.div>
      </div>
    </section>
  );
}
