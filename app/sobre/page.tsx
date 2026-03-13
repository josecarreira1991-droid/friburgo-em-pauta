"use client";

import { motion } from "framer-motion";
import { Award, FileText, Users, Heart, MapPin, Calendar } from "lucide-react";

const STATS = [
  { icon: <FileText className="w-6 h-6" />, value: "1.842+", label: "Projetos de Lei" },
  { icon: <Award className="w-6 h-6" />, value: "20+", label: "Anos de Politica" },
  { icon: <Users className="w-6 h-6" />, value: "#1", label: "Mais Votado da Historia" },
  { icon: <Heart className="w-6 h-6" />, value: "3", label: "Conquistas Historicas" },
];

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      <section className="bg-[var(--primary)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Sobre</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-2 leading-tight">
                Marcos<br />Medeiros
              </h1>
              <p className="text-white/60 font-ui mt-4 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Nova Friburgo, RJ
                <span className="mx-2">|</span>
                <Calendar className="w-4 h-4" /> Candidato Dep. Estadual 2026
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden md:flex justify-center"
            >
              <div className="w-64 h-64 rounded-full bg-[var(--primary-med)] border-4 border-[var(--accent)]/30 flex items-center justify-center">
                <span className="text-6xl text-white/20 font-display">MM</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-6 border border-[var(--border)] text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mx-auto mb-3">{s.icon}</div>
              <p className="font-display text-2xl font-bold">{s.value}</p>
              <p className="text-xs font-ui text-[var(--primary)]/50 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="prose max-w-none">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6 text-[var(--primary)]/80 leading-relaxed">
            <p className="text-lg">
              Marcos Medeiros e o vereador mais votado da historia de Nova Friburgo. Com mais de 20 anos dedicados a politica municipal, ele construiu um legado de 1.842+ projetos de lei que tocam cada bairro, cada escola, cada familia da cidade.
            </p>
            <p>
              Nascido e criado em Nova Friburgo, Marcos sempre foi o vizinho do bairro que resolveu entrar na politica para fazer diferenca de verdade. Sem juridiques, sem promessa vazia — com trabalho.
            </p>
            <h3 className="font-display text-2xl font-bold text-[var(--primary)] mt-10">As conquistas que marcaram</h3>
            <p>
              <strong>A UPA (2010)</strong> — Quando Nova Friburgo precisava de atendimento de emergencia 24 horas, Marcos lutou no plenario e trouxe a UPA para a cidade. Milhares de vidas atendidas desde entao.
            </p>
            <p>
              <strong>Estacio de Sa (2011)</strong> — Ensino superior acessivel. Marcos ajudou a trazer a Estacio para Friburgo, permitindo que milhares de jovens cursassem faculdade sem sair da cidade.
            </p>
            <p>
              <strong>Hospital do Cancer (2013)</strong> — A compra do predio do Hospital do Cancer foi garantida gracas a mobilizacao liderada por Marcos. Tratamento oncologico perto de casa.
            </p>
            <h3 className="font-display text-2xl font-bold text-[var(--primary)] mt-10">Proposta para o Estado</h3>
            <p>
              A proposta central de Marcos para a ALERJ e criar uma legislacao que obrigue municipios a ter um banco de dados de empresas locais, direcionando incentivos fiscais (Lei Rouanet, Lei do Esporte) para projetos dentro do proprio municipio.
            </p>
            <blockquote className="border-l-4 border-[var(--accent)] pl-6 italic text-lg">
              "O imposto vai embora do municipio, nao volta. Meu projeto e simples: o dinheiro que ja existe, que ja e pago, que ja e lei — fica aqui."
            </blockquote>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
