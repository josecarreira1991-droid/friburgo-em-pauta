"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AlertTriangle, BarChart3, Heart, FileText, ArrowRight, Users, MessageCircle } from "lucide-react";

const ACOES = [
  {
    href: "/denuncias",
    icon: AlertTriangle,
    cor: "from-red-600 to-rose-600",
    corBg: "bg-red-50 border-red-200",
    corTexto: "text-red-700",
    titulo: "Denuncie um Problema",
    desc: "Buraco, falta de médico, iluminação quebrada? Fale direto com Marcos. Cada denúncia vira pauta.",
    cta: "Fazer Denúncia",
    badge: "Canal Direto",
  },
  {
    href: "/enquete",
    icon: BarChart3,
    cor: "from-blue-600 to-cyan-600",
    corBg: "bg-blue-50 border-blue-200",
    corTexto: "text-blue-700",
    titulo: "Vote nas Prioridades",
    desc: "O que mais precisa mudar em Nova Friburgo? Saúde, educação, segurança? Sua voz define o plano.",
    cta: "Votar Agora",
    badge: "1.247 votos",
  },
  {
    href: "/apoiar",
    icon: Heart,
    cor: "from-[var(--accent)] to-yellow-500",
    corBg: "bg-yellow-50 border-yellow-200",
    corTexto: "text-yellow-700",
    titulo: "Apoie a Candidatura",
    desc: "Seja voluntário, divulgador digital ou liderança de bairro. Juntos, a gente leva Friburgo pra Brasília.",
    cta: "Quero Apoiar",
    badge: "Seja do time",
  },
  {
    href: "/proposta/documento",
    icon: FileText,
    cor: "from-[var(--primary)] to-[#1a3a6b]",
    corBg: "bg-slate-50 border-slate-200",
    corTexto: "text-slate-700",
    titulo: "Plano de Governo Completo",
    desc: "Veja tudo que Marcos vai fazer em Brasília: incentivos fiscais, saúde, educação, infraestrutura e mais.",
    cta: "Ver Documento",
    badge: "Documento oficial",
  },
];

export function EngajamentoSection() {
  return (
    <section className="py-16 bg-[var(--bg-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Participe</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--primary)] mt-2 mb-3">
            Sua voz muda Nova Friburgo
          </h2>
          <p className="text-[var(--primary)]/50 font-ui max-w-2xl mx-auto">
            Denuncie problemas, vote nas prioridades, apoie a candidatura. Cada ação conta.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ACOES.map((acao, i) => (
            <motion.div
              key={acao.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={acao.href}
                className={`group block h-full bg-white rounded-2xl border-2 ${acao.corBg} p-6 hover:shadow-lg transition-all hover:-translate-y-1`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${acao.cor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <acao.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`inline-flex items-center gap-1 ${acao.corTexto} bg-white border border-current/20 rounded-full px-2 py-0.5 text-xs font-ui font-semibold mb-3`}>
                  {acao.badge}
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--primary)] mb-2">{acao.titulo}</h3>
                <p className="text-[var(--primary)]/55 font-ui text-sm leading-relaxed mb-4">{acao.desc}</p>
                <div className={`flex items-center gap-1 font-ui font-semibold text-sm ${acao.corTexto} group-hover:gap-2 transition-all`}>
                  {acao.cta} <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA WhatsApp */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 bg-green-600 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-white">Fale diretamente com Marcos</h3>
              <p className="text-white/70 font-ui text-sm">+55 22 99895-4874 — WhatsApp pessoal do Marcos</p>
            </div>
          </div>
          <a href="https://wa.me/5522998954874?text=Ol%C3%A1%20Marcos%2C%20vim%20pelo%20portal%20Friburgo%20em%20Pauta!" target="_blank" rel="noopener"
            className="shrink-0 bg-white hover:bg-white/90 text-green-700 px-6 py-3 rounded-full font-ui font-bold transition-all flex items-center gap-2">
            <MessageCircle className="w-5 h-5" /> Abrir WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
