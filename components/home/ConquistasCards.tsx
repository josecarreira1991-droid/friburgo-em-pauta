"use client";

import { motion } from "framer-motion";
import { Hospital, GraduationCap, Building2 } from "lucide-react";

const CONQUISTAS = [
  {
    icon: <Hospital className="w-8 h-8" />,
    titulo: "UPA de Nova Friburgo",
    ano: 2010,
    descricao: "Marcos lutou e conseguiu a UPA para atender a populacao de emergencia 24 horas.",
    destaque: "Saude para todos",
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    titulo: "Estacio de Sa",
    ano: 2011,
    descricao: "Ensino superior acessivel chegou a Nova Friburgo. Milhares de jovens formados.",
    destaque: "Educacao transforma",
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    titulo: "Hospital do Cancer",
    ano: 2013,
    descricao: "A compra do predio do Hospital do Cancer foi garantida. Tratamento perto de casa.",
    destaque: "Vida em primeiro lugar",
  },
];

export function ConquistasCards() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Resultados Reais</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 text-[var(--primary)]">
            Conquistas que mudaram<br />Nova Friburgo
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {CONQUISTAS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group bg-[var(--bg-paper)] rounded-2xl p-8 border border-[var(--border)] card-hover"
            >
              <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-6 group-hover:bg-[var(--accent)] group-hover:text-[var(--primary)] transition-all">
                {item.icon}
              </div>
              <span className="text-[var(--accent)] font-ui font-bold text-sm">{item.ano}</span>
              <h3 className="font-display text-xl font-bold mt-1 mb-3">{item.titulo}</h3>
              <p className="text-[var(--primary)]/70 leading-relaxed text-sm mb-4">{item.descricao}</p>
              <span className="inline-block bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1 rounded-full text-xs font-ui font-semibold">
                {item.destaque}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
