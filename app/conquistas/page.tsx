"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const TIMELINE = [
  { ano: 2008, titulo: "Eleito vereador", desc: "Marcos Medeiros e eleito vereador de Nova Friburgo com 5.550 votos — recorde historico da cidade.", destaque: true },
  { ano: "2009-2012", titulo: "Mandato na Camara", desc: "Autor de centenas de projetos de lei, indicacoes e requerimentos durante o mandato. Trabalho intenso no plenario.", destaque: false },
  { ano: "Continuo", titulo: "TV do Povo — Canal 3", desc: "Marcos cria e apresenta a TV do Povo, canal de comunicacao direta com o povo de Nova Friburgo. Mais de 3.500 programas produzidos.", destaque: true },
  { ano: "Continuo", titulo: "Jornalismo comunitario", desc: "Atuacao como jornalista cobrindo o dia a dia de Nova Friburgo, dando voz a comunidade atraves da TV do Povo e redes sociais.", destaque: false },
  { ano: 2024, titulo: "Candidatura a vereador", desc: "Marcos concorre novamente a vereador em Nova Friburgo, reafirmando seu compromisso com a cidade.", destaque: false },
  { ano: 2026, titulo: "Pre-candidato a Deputado Federal", desc: "Marcos leva a luta de Nova Friburgo para o Congresso Nacional. Pelo Democrata Cristao (DC) — numero 27.", destaque: true },
];

export default function ConquistasPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      <section className="bg-[var(--primary)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Trajetoria</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">Linha do Tempo</h1>
            <p className="text-white/50 font-ui mt-3">A trajetoria politica e jornalistica de Marcos Medeiros em Nova Friburgo.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[var(--accent)]/20" />
          {TIMELINE.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="relative pl-16 pb-12 last:pb-0">
              <div className={"absolute left-4 w-5 h-5 rounded-full border-2 " + (item.destaque ? "bg-[var(--accent)] border-[var(--accent)]" : "bg-white border-[var(--accent)]/40")} />
              <div className={"rounded-xl p-6 border " + (item.destaque ? "bg-[var(--accent)]/5 border-[var(--accent)]/20" : "bg-white border-[var(--border)]")}>
                <span className="text-[var(--accent)] font-ui font-bold text-sm">{item.ano}</span>
                <h3 className="font-display text-xl font-bold mt-1">{item.titulo}</h3>
                <p className="text-[var(--primary)]/60 font-ui text-sm mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[var(--primary)]/40 font-ui text-sm mb-4">
            Todos os projetos de lei estao disponiveis no SAPL da Camara Municipal.
          </p>
          <a href="https://sapl.novafriburgo.rj.leg.br/parlamentar/84/materias" target="_blank" rel="noopener"
            className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-full font-ui font-semibold hover:bg-[var(--primary-med)] transition-all">
            Ver Projetos no SAPL <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
