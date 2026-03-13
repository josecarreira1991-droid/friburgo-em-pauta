"use client";

import { motion } from "framer-motion";
import { Play, Clock, Eye } from "lucide-react";
import Link from "next/link";

const DEMO_VIDEOS = [
  { id: "1", titulo: "O imposto vai embora e nao volta", tipo: "avatar_heygen", duracao: 72, thumbnail: null },
  { id: "2", titulo: "UPA: a conquista que salvou vidas", tipo: "avatar_heygen", duracao: 85, thumbnail: null },
  { id: "3", titulo: "Nova Friburgo vista de cima", tipo: "broll_runway", duracao: 10, thumbnail: null },
  { id: "4", titulo: "Educacao transforma — Estacio de Sa", tipo: "avatar_heygen", duracao: 63, thumbnail: null },
];

export function VideoFeed() {
  return (
    <section className="py-20 bg-[var(--bg-dark)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Conteudo em Video</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">Videos e Pronunciamentos</h2>
          </div>
          <Link href="/videos" className="text-[var(--accent)] font-ui text-sm hover:underline hidden sm:block">
            Ver todos →
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEMO_VIDEOS.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-[var(--primary-med)] mb-3">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 to-transparent">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:scale-110 transition-all">
                    <Play className="w-6 h-6 text-white group-hover:text-[var(--primary)]" />
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className={"px-2 py-1 rounded text-[10px] font-ui font-bold uppercase " + (video.tipo === "avatar_heygen" ? "bg-blue-500/80 text-white" : "bg-purple-500/80 text-white")}>
                    {video.tipo === "avatar_heygen" ? "Avatar IA" : "Cinematico"}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-3 text-white/60 text-xs font-ui">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{video.duracao}s</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />--</span>
                  </div>
                </div>
              </div>
              <h3 className="text-white text-sm font-ui font-medium leading-snug">{video.titulo}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
