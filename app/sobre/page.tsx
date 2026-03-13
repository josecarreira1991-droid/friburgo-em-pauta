"use client";

import { motion } from "framer-motion";
import { Award, FileText, Users, Tv, MapPin, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const STATS = [
  { icon: <Award className="w-6 h-6" />, value: "5.550", label: "Votos em 2008" },
  { icon: <Tv className="w-6 h-6" />, value: "3.575", label: "Videos TV do Povo" },
  { icon: <Users className="w-6 h-6" />, value: "#1", label: "Mais Votado da Historia" },
  { icon: <FileText className="w-6 h-6" />, value: "DC 27", label: "Deputado Federal 2026" },
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
                <Calendar className="w-4 h-4" /> Pre-candidato Dep. Federal 2026 — DC 27
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="hidden md:flex justify-center">
              <Image src="/images/marcos-perfil.jpg" alt="Marcos Medeiros" width={256} height={256}
                className="rounded-full border-4 border-[var(--accent)]/30 object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {STATS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-6 border border-[var(--border)] text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mx-auto mb-3">{s.icon}</div>
              <p className="font-display text-2xl font-bold">{s.value}</p>
              <p className="text-xs font-ui text-[var(--primary)]/50 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="prose max-w-none">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6 text-[var(--primary)]/80 leading-relaxed">
            <p className="text-lg">
              Marcos da Silva Alberto Medeiros, nascido em 24 de fevereiro de 1969 em Nova Friburgo, RJ. Jornalista, apresentador e reporter. Filho dos ex-vereadores Helio e Irany Medeiros.
            </p>
            <p>
              Em 2008, foi eleito vereador de Nova Friburgo com 5.550 votos — o recorde historico da cidade. Durante o mandato (2009-2012), atuou intensamente no plenario com centenas de projetos de lei, indicacoes e requerimentos registrados no SAPL da Camara Municipal.
            </p>

            <h3 className="font-display text-2xl font-bold text-[var(--primary)] mt-10">TV do Povo — Canal 3</h3>
            <p>
              Marcos criou e apresenta a TV do Povo, canal de comunicacao direta com o povo de Nova Friburgo. Com mais de 3.575 programas produzidos, a TV do Povo cobre o dia a dia da cidade — entrevistas, eventos, denuncias e celebracoes. O canal e uma referencia de jornalismo comunitario na regiao serrana.
            </p>

            <h3 className="font-display text-2xl font-bold text-[var(--primary)] mt-10">Proposta para Deputado Federal</h3>
            <p>
              A proposta central de Marcos para o Congresso Nacional e criar legislacao que redirecione incentivos fiscais (Lei Rouanet, Lei do Esporte, Lei do Audiovisual, PRONON/PRONAS) de volta para os municipios de origem. Hoje, o dinheiro dos incentivos sai do municipio e nao retorna.
            </p>
            <blockquote className="border-l-4 border-[var(--accent)] pl-6 italic text-lg">
              "Para ser politico e preciso gostar de gente. E meu pai me ensinou a gostar de gente."
              <footer className="text-sm text-[var(--primary)]/40 mt-2">— Marcos Medeiros, entrevista A Voz da Serra</footer>
            </blockquote>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/proposta" className="inline-flex items-center gap-2 bg-[var(--accent)] text-[var(--primary)] px-6 py-3 rounded-full font-ui font-bold hover:bg-[var(--accent)]/90 transition-all">
                Ver Proposta Completa
              </Link>
              <a href="https://sapl.novafriburgo.rj.leg.br/parlamentar/84/materias" target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-full font-ui font-semibold hover:bg-[var(--primary-med)] transition-all">
                Projetos no SAPL
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
