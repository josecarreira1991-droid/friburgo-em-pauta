"use client";

import { motion } from "framer-motion";
import { FileText, ExternalLink, Search, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function ProjetosPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      <section className="bg-[var(--primary)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Trabalho Legislativo</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">7.919 Materias Legislativas</h1>
            <p className="text-white/60 font-ui mt-3 max-w-2xl mx-auto">
              Todos os projetos de lei, indicacoes, requerimentos e mocoes de Marcos Medeiros estao registrados no SAPL — Sistema de Apoio ao Processo Legislativo da Camara Municipal de Nova Friburgo.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* CTA Principal */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-[var(--border)] p-8 md:p-12 text-center mb-12 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-[var(--accent)]" />
          </div>
          <h2 className="font-display text-3xl font-bold mb-3">Acesse Todos os Projetos</h2>
          <p className="text-[var(--primary)]/60 font-ui max-w-lg mx-auto mb-8">
            O SAPL e o sistema oficial da Camara Municipal de Nova Friburgo. La voce encontra todos os 7.919 documentos com texto completo, tramitacao e status.
          </p>
          <a href="https://sapl.novafriburgo.rj.leg.br/parlamentar/84/materias" target="_blank" rel="noopener"
            className="inline-flex items-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] px-8 py-4 rounded-full font-ui font-bold text-lg transition-all shadow-lg hover:shadow-xl">
            Abrir SAPL — Ver Todos os Projetos <ExternalLink className="w-5 h-5" />
          </a>
          <p className="text-[var(--primary)]/30 font-ui text-xs mt-4">
            sapl.novafriburgo.rj.leg.br — Fonte oficial da Camara Municipal
          </p>
        </motion.div>

        {/* Info Cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-[var(--border)] p-6 text-center">
            <p className="font-display text-3xl font-bold text-[var(--accent)]">7.919</p>
            <p className="text-sm font-ui text-[var(--primary)]/50 mt-1">Materias no total</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border border-[var(--border)] p-6 text-center">
            <p className="font-display text-3xl font-bold text-[var(--accent)]">2009-2012</p>
            <p className="text-sm font-ui text-[var(--primary)]/50 mt-1">Mandato como vereador</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-white rounded-xl border border-[var(--border)] p-6 text-center">
            <p className="font-display text-3xl font-bold text-[var(--accent)]">5.550</p>
            <p className="text-sm font-ui text-[var(--primary)]/50 mt-1">Votos em 2008</p>
          </motion.div>
        </div>

        {/* Tipos de materia */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="bg-white rounded-2xl border border-[var(--border)] p-8">
          <h3 className="font-display text-xl font-bold mb-6">Tipos de Materias Legislativas</h3>
          <div className="space-y-4">
            {[
              { tipo: "Projetos de Lei Ordinaria (PLO)", desc: "Propostas de novas leis para o municipio" },
              { tipo: "Indicacoes", desc: "Sugestoes ao Executivo para obras e servicos" },
              { tipo: "Requerimentos", desc: "Pedidos de informacao e providencias" },
              { tipo: "Mocoes", desc: "Manifestacoes de apoio, pesar ou repudio" },
              { tipo: "Projetos de Resolucao", desc: "Normas internas da Camara" },
              { tipo: "Projetos de Decreto Legislativo", desc: "Materias de competencia exclusiva da Camara" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--bg-paper)] transition-colors">
                <FileText className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                <div>
                  <p className="font-ui font-semibold text-sm">{item.tipo}</p>
                  <p className="text-[var(--primary)]/50 font-ui text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-[var(--border)]">
            <a href="https://sapl.novafriburgo.rj.leg.br/parlamentar/84/materias" target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 text-[var(--accent)] font-ui font-semibold text-sm hover:underline">
              Consultar todos no SAPL <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
