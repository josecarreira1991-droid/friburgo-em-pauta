"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DollarSign, Palette, Dumbbell, GraduationCap, TreePine,
  ArrowRight, FileText, Quote, CheckCircle2, TrendingUp,
  MessageCircle, Share2, ChevronDown, Building2, Landmark,
  ArrowDownRight, ArrowUpRight, Sparkles
} from "lucide-react";

const PILARES = [
  { icon: <Palette className="w-8 h-8" />, titulo: "Cultura", desc: "Festivais, teatros, projetos culturais financiados com dinheiro que ja existe — sem precisar de verba extra.", lei: "Lei Rouanet (Lei 8.313/91)", cor: "from-purple-500 to-pink-500" },
  { icon: <Dumbbell className="w-8 h-8" />, titulo: "Esporte", desc: "Campos, quadras, escolinhas esportivas. O esporte transforma jovens e a verba ja esta disponivel.", lei: "Lei de Incentivo ao Esporte (Lei 11.438/06)", cor: "from-green-500 to-emerald-500" },
  { icon: <GraduationCap className="w-8 h-8" />, titulo: "Educacao", desc: "Bolsas, cursos tecnicos, capacitacao profissional financiados por empresas locais.", lei: "Incentivos FNDE + Estaduais", cor: "from-blue-500 to-cyan-500" },
  { icon: <TreePine className="w-8 h-8" />, titulo: "Meio Ambiente", desc: "Preservacao da serra, reflorestamento, sustentabilidade — financiados por deducao fiscal.", lei: "ICMS Ecologico + Incentivos Ambientais", cor: "from-teal-500 to-green-500" },
];

const COMO_FUNCIONA = [
  { step: "01", titulo: "Banco de Dados Municipal", desc: "A prefeitura cria e mantem um cadastro das maiores empresas do municipio, mapeando quem paga impostos federais e estaduais passiveis de deducao." },
  { step: "02", titulo: "Orientacao Fiscal", desc: "Equipe especializada orienta cada empresa sobre as leis de incentivo fiscal que ja existem — Lei Rouanet, Lei do Esporte, ICMS Ecologico e mais." },
  { step: "03", titulo: "Redirecionamento Legal", desc: "Em vez de o imposto ir direto para Brasilia ou Rio, a empresa direciona parte dele (dentro da lei) para projetos cadastrados no municipio." },
  { step: "04", titulo: "Investimento Local", desc: "O dinheiro financia projetos reais de cultura, esporte, educacao e meio ambiente DENTRO de Nova Friburgo. Fiscalizacao transparente." },
];

export default function PropostaPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] text-white">
      {/* HERO FULL SCREEN */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 bg-gradient-to-b from-[#040810] via-[var(--primary)] to-[var(--bg-dark)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="inline-flex items-center gap-2 bg-[var(--accent)]/20 border border-[var(--accent)]/30 rounded-full px-5 py-2 mb-8">
              <FileText className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-[var(--accent)] text-sm font-ui font-medium">Projeto de Lei — Marcos Medeiros</span>
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-8">
            O imposto vai<br />embora do municipio.<br /><span className="text-[var(--accent)]">Nao volta.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-10">
            Proposta para criar uma lei que obrigue a prefeitura a orientar empresas locais sobre como
            <strong className="text-white"> redirecionar impostos</strong> para financiar projetos de cultura, esporte, educacao e meio ambiente
            <strong className="text-[var(--accent)]"> dentro de Nova Friburgo</strong>.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }} className="flex flex-wrap justify-center gap-4">
            <a href="#como-funciona" className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] px-8 py-4 rounded-full font-ui font-bold text-lg transition-all hover:scale-105">
              Entenda a Proposta <ArrowRight className="w-5 h-5" />
            </a>
            <a href="https://wa.me/5522998954874?text=Quero%20saber%20mais%20sobre%20a%20proposta%20de%20incentivos%20fiscais" target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-ui font-semibold text-lg transition-all">
              <MessageCircle className="w-5 h-5" /> Pergunte ao Marcos
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-16">
            <ChevronDown className="w-8 h-8 text-white/20 mx-auto animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-20 bg-[var(--accent)] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Quote className="w-12 h-12 text-[var(--primary)]/20 mx-auto mb-6" />
          <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl italic text-[var(--primary)] leading-snug font-bold">
            &ldquo;Voce conscientizando as empresas que, ao inves de pagar o imposto federal, eles pegam de acordo com a legislacao e financiam projetos no proprio municipio. Esse dinheiro deixa de sair — fica aqui.&rdquo;
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Image src="/images/marcos-perfil.jpg" alt="Marcos Medeiros" width={56} height={56} className="rounded-full border-2 border-[var(--primary)]/20" />
            <div className="text-left">
              <p className="font-ui font-bold text-[var(--primary)]">Marcos Medeiros</p>
              <p className="text-[var(--primary)]/60 text-sm font-ui">Jornalista, TV do Povo — Pre-candidato Dep. Estadual</p>
            </div>
          </div>
        </div>
      </section>

      {/* NUMEROS */}
      <section className="py-20 bg-[var(--bg-dark)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">O Problema</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-3">O dinheiro existe.<br />So nao fica aqui.</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { valor: "R$ 2,8 bi", label: "Captados via Lei Rouanet em 2023", sub: "Quanto voltou pra NF? Quase zero.", icon: <ArrowUpRight className="w-6 h-6 text-red-400" /> },
              { valor: "R$ 480 mi", label: "Lei de Incentivo ao Esporte 2023", sub: "Nova Friburgo nao captou nada.", icon: <ArrowDownRight className="w-6 h-6 text-red-400" /> },
              { valor: "7.919", label: "Materias legislativas do Marcos", sub: "1.647 projetos de lei criados.", icon: <FileText className="w-6 h-6 text-[var(--accent)]" /> },
              { valor: "0%", label: "Retorno fiscal pra NF hoje", sub: "Isso vai mudar.", icon: <TrendingUp className="w-6 h-6 text-red-400" /> },
            ].map((n, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-8 border border-white/10 text-center">
                <div className="mb-3 flex justify-center">{n.icon}</div>
                <p className="font-display text-4xl md:text-5xl font-black text-[var(--accent)] mb-2">{n.valor}</p>
                <p className="text-white/70 font-ui text-sm mb-3">{n.label}</p>
                <p className="text-white/40 text-xs font-ui italic">{n.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-24 bg-gradient-to-b from-[var(--bg-dark)] to-[var(--primary)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">A Solucao</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-3">Como Funciona</h2>
          </motion.div>
          <div className="space-y-8">
            {COMO_FUNCIONA.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="flex items-start gap-6 md:gap-10">
                <div className="shrink-0 w-20 h-20 rounded-2xl bg-[var(--accent)] flex items-center justify-center">
                  <span className="font-display text-3xl font-black text-[var(--primary)]">{item.step}</span>
                </div>
                <div className="pt-2">
                  <h3 className="font-display text-2xl font-bold text-white mb-2">{item.titulo}</h3>
                  <p className="text-white/60 leading-relaxed text-lg">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-green-500/20 border border-green-500/30 rounded-2xl px-8 py-4">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
              <span className="text-green-300 font-ui font-semibold text-lg">100% legal. Sem criar imposto novo. Sem gastar dinheiro publico.</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4 PILARES */}
      <section className="py-24 bg-[var(--primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Areas de Impacto</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-3">4 Pilares da Proposta</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-8">
            {PILARES.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-8 border border-white/10 hover:border-[var(--accent)]/30 transition-all">
                <div className={"w-16 h-16 rounded-2xl bg-gradient-to-br " + p.cor + " flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform"}>{p.icon}</div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">{p.titulo}</h3>
                <p className="text-white/60 leading-relaxed mb-4">{p.desc}</p>
                <span className="inline-block bg-white/5 border border-white/10 text-white/40 px-3 py-1 rounded-full text-xs font-ui">{p.lei}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOJE vs COM A LEI */}
      <section className="py-24 bg-[var(--bg-dark)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white">Hoje vs. Com a Proposta</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8">
              <h3 className="font-display text-xl font-bold text-red-400 mb-6">HOJE — Sem a Lei</h3>
              <div className="space-y-4 text-white/70">
                {["Empresa paga imposto federal — dinheiro vai pra Brasilia", "Nova Friburgo nao recebe de volta", "Cultura, esporte e educacao sem verba local", "Empresas nao sabem que podem redirecionar"].map((t, i) => (
                  <div key={i} className="flex items-start gap-3"><span className="text-red-400 mt-1">✗</span><p>{t}</p></div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8">
              <h3 className="font-display text-xl font-bold text-green-400 mb-6">COM A LEI — Proposta Marcos</h3>
              <div className="space-y-4 text-white/70">
                {["Prefeitura mapeia empresas e oportunidades fiscais", "Empresas redirecionam impostos para projetos locais", "Cultura, esporte e educacao financiados", "Dinheiro fica em Nova Friburgo"].map((t, i) => (
                  <div key={i} className="flex items-start gap-3"><span className="text-green-400 mt-1">✓</span><p>{t}</p></div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 bg-gradient-to-b from-[var(--bg-dark)] to-[var(--primary)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Image src="/images/marcos-perfil.jpg" alt="Marcos Medeiros" width={120} height={120} className="rounded-full border-4 border-[var(--accent)] mx-auto mb-8" />
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">Apoie essa proposta.</h2>
            <p className="text-white/60 text-lg font-ui mb-4 max-w-xl mx-auto">
              &ldquo;O povo, o pobre, aquele relegado ao esquecimento, que nao tem vez nem voz&rdquo; — e por eles que essa proposta existe.
            </p>
            <p className="text-white/40 font-ui mb-10">Compartilhe com empresarios, comerciantes, vizinhos.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/5522998954874?text=Quero%20apoiar%20a%20proposta%20de%20incentivos%20fiscais%20do%20Marcos" target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-ui font-bold text-lg transition-all hover:scale-105">
                <MessageCircle className="w-5 h-5" /> Falar com Marcos
              </a>
              <a href="https://www.facebook.com/marcosmedeirosfriburgo" target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-ui font-semibold text-lg transition-all border border-white/20">
                <Share2 className="w-5 h-5" /> Compartilhar
              </a>
            </div>
            <div className="mt-12 flex items-center justify-center gap-6 text-white/30 text-sm font-ui">
              <span>Democrata Cristao (DC)</span><span>•</span><span>Nova Friburgo, RJ</span><span>•</span><span>DC 27 — Deputado Estadual 2026</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
