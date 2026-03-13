"use client";

import { motion } from "framer-motion";
import { Tv, Vote, FileText } from "lucide-react";

const CONQUISTAS = [
  {
    icone: Vote,
    titulo: "5.550 votos em 2008",
    subtitulo: "Recorde historico",
    descricao: "O vereador mais votado da historia de Nova Friburgo. Mandato 2009-2012.",
    cor: "bg-[var(--accent)]/10 text-[var(--accent)]",
  },
  {
    icone: Tv,
    titulo: "TV do Povo — Canal 3",
    subtitulo: "+3.500 programas",
    descricao: "Canal de comunicacao direta com o povo. Entrevistas, coberturas e o dia a dia de Nova Friburgo.",
    cor: "bg-red-500/10 text-red-500",
  },
  {
    icone: FileText,
    titulo: "Projetos no SAPL",
    subtitulo: "Camara Municipal",
    descricao: "Centenas de projetos de lei, indicacoes e requerimentos registrados no sistema oficial.",
    cor: "bg-blue-500/10 text-blue-500",
  },
];

export function ConquistasCards() {
  return (
    <section className="py-20 bg-[var(--bg-paper)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Trajetoria</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Numeros que Falam</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {CONQUISTAS.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all hover:shadow-lg">
              <div className={"w-14 h-14 rounded-xl flex items-center justify-center mb-4 " + c.cor}>
                <c.icone className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold">{c.titulo}</h3>
              <p className="text-[var(--accent)] font-ui text-sm font-semibold mt-1">{c.subtitulo}</p>
              <p className="text-[var(--primary)]/60 font-ui text-sm mt-3 leading-relaxed">{c.descricao}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
