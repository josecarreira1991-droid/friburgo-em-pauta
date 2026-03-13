"use client";

import { motion } from "framer-motion";
import { Play, Clock, Eye } from "lucide-react";

const VIDEOS = [
  { id: "1", titulo: "O imposto vai embora e nao volta — Proposta Marcos Medeiros", tipo: "avatar_heygen", duracao: 72 },
  { id: "2", titulo: "UPA: a conquista que salvou vidas em Nova Friburgo", tipo: "avatar_heygen", duracao: 85 },
  { id: "3", titulo: "Nova Friburgo vista de cima — cidade entre montanhas", tipo: "broll_runway", duracao: 10 },
  { id: "4", titulo: "Educacao transforma — Estacio de Sa em Friburgo", tipo: "avatar_heygen", duracao: 63 },
  { id: "5", titulo: "Hospital do Cancer — tratamento perto de casa", tipo: "avatar_heygen", duracao: 90 },
  { id: "6", titulo: "Cultura na serra — festival de inverno", tipo: "broll_runway", duracao: 10 },
  { id: "7", titulo: "1.842 projetos — o maior legado legislativo", tipo: "avatar_heygen", duracao: 75 },
  { id: "8", titulo: "Esporte transforma — jovens de Friburgo", tipo: "broll_runway", duracao: 10 },
];

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-dark)]">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Galeria</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">Videos e Pronunciamentos</h1>
            <p className="text-white/50 font-ui mt-3">Avatar IA (HeyGen) + B-roll cinematografico (Runway)</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VIDEOS.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-[var(--primary-med)] mb-3">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 to-transparent">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:scale-110 transition-all">
                    <Play className="w-6 h-6 text-white group-hover:text-[var(--primary)]" />
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className={"px-2 py-1 rounded text-[10px] font-ui font-bold uppercase " + (v.tipo === "avatar_heygen" ? "bg-blue-500/80 text-white" : "bg-purple-500/80 text-white")}>
                    {v.tipo === "avatar_heygen" ? "Avatar IA" : "Cinematico"}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white/60 text-xs font-ui bg-black/40 rounded-full px-2 py-1">
                  <Clock className="w-3 h-3" />{v.duracao}s
                </div>
              </div>
              <h3 className="text-white text-sm font-ui font-medium leading-snug">{v.titulo}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
