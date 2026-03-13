"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DollarSign, Palette, Dumbbell, GraduationCap, TreePine,
  ArrowRight, FileText, Quote, CheckCircle2, TrendingUp,
  MessageCircle, Share2, ChevronDown, Building2, Landmark,
  ArrowDownRight, ArrowUpRight, Users, MapPin, BarChart3,
  Target, Lightbulb, ShieldCheck, Scale, BookOpen, Heart,
  Megaphone, Vote, Zap, Globe, HandCoins, Banknote
} from "lucide-react";

const PILARES = [
  { icon: <Palette className="w-8 h-8" />, titulo: "Cultura", desc: "Festivais, teatros, musica, danca — projetos culturais financiados com dinheiro que as empresas JA pagam de imposto. Lei Rouanet permite deduzir ate 4% do IR.", lei: "Lei Rouanet (Lei 8.313/91)", impacto: "Ate 4% do IR da empresa", cor: "from-purple-500 to-pink-500" },
  { icon: <Dumbbell className="w-8 h-8" />, titulo: "Esporte", desc: "Campos, quadras, escolinhas, equipamentos. O esporte transforma jovens e a verba ja esta na legislacao — so precisa ser ativada localmente.", lei: "Lei de Incentivo ao Esporte (Lei 11.438/06)", impacto: "Ate 2% do IR da empresa", cor: "from-green-500 to-emerald-500" },
  { icon: <GraduationCap className="w-8 h-8" />, titulo: "Educacao", desc: "Bolsas, cursos tecnicos, capacitacao profissional. Empresas podem financiar educacao local com incentivos federais e estaduais.", lei: "FNDE + Incentivos Estaduais", impacto: "Deducao via ICMS + IR", cor: "from-blue-500 to-cyan-500" },
  { icon: <TreePine className="w-8 h-8" />, titulo: "Meio Ambiente", desc: "Preservacao da serra fluminense, reflorestamento, sustentabilidade. O ICMS Ecologico ja existe — Nova Friburgo precisa captar.", lei: "ICMS Ecologico + Lei 12.305", impacto: "Repasse maior de ICMS", cor: "from-teal-500 to-green-500" },
];

const COMO_FUNCIONA = [
  { step: "01", titulo: "Banco de Dados Municipal", desc: "Legislacao obriga a prefeitura a mapear TODAS as empresas do municipio que pagam IR e ICMS acima de determinado valor. Hoje ninguem sabe quantas empresas tem e quanto pagam.", icon: <Building2 className="w-6 h-6" /> },
  { step: "02", titulo: "Orientacao Fiscal Gratuita", desc: "Equipe da prefeitura (ou parceria com escritorios de contabilidade) orienta cada empresa sobre QUAIS leis de incentivo ela pode usar. Muitas nem sabem que podem deduzir.", icon: <Lightbulb className="w-6 h-6" /> },
  { step: "03", titulo: "Cadastro de Projetos Locais", desc: "Projetos culturais, esportivos, educacionais e ambientais de Nova Friburgo sao cadastrados e qualificados para receber os recursos. Transparencia total.", icon: <Target className="w-6 h-6" /> },
  { step: "04", titulo: "Conexao Empresa-Projeto", desc: "A prefeitura faz o match: conecta a empresa que quer deduzir com o projeto local que precisa de recurso. O dinheiro vai direto pro projeto, sem intermediario.", icon: <HandCoins className="w-6 h-6" /> },
  { step: "05", titulo: "Fiscalizacao e Prestacao de Contas", desc: "Todo recurso e fiscalizado. Relatorios publicos. A comunidade acompanha onde cada real foi investido. Sem caixa preta.", icon: <ShieldCheck className="w-6 h-6" /> },
];

const FRIBURGO_DADOS = {
  populacao: "203.417",
  pib_per_capita: "R$ 38.789",
  receita_municipal: "R$ 881,5 milhoes",
  vereadores_eleitos: 21,
  empresas_ativas: "~15.000",
};

export default function PropostaPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const FAQ = [
    { q: "Isso cria um imposto novo?", a: "Nao. Nenhum imposto novo e criado. As empresas JA pagam IR e ICMS. A proposta apenas orienta como redirecionar parte desses impostos para projetos locais, usando leis que JA existem (Lei Rouanet, Lei do Esporte, etc)." },
    { q: "A empresa paga mais por causa disso?", a: "Nao. A empresa paga o MESMO valor de imposto. A diferenca e que parte desse valor, em vez de ir direto para Brasilia, financia um projeto aqui em Nova Friburgo. E uma DEDUCAO, nao um pagamento extra." },
    { q: "Qualquer empresa pode participar?", a: "Empresas que apuram IR pelo lucro real podem usar a Lei Rouanet e a Lei do Esporte. Pra ICMS Ecologico, todas as empresas que pagam ICMS se beneficiam indiretamente. O banco de dados municipal vai mapear quem pode participar de que." },
    { q: "Quem fiscaliza?", a: "Os projetos sao aprovados por conselhos municipais (cultura, esporte, etc). A prestacao de contas segue as regras federais/estaduais de cada incentivo. Alem disso, a proposta inclui transparencia publica — todo cidadao pode acompanhar." },
    { q: "Isso ja funciona em algum lugar?", a: "Sim. Cidades como Niteroi, Curitiba e Belo Horizonte ja tem mecanismos similares de captacao local via incentivos fiscais. A diferenca da proposta do Marcos e tornar OBRIGATORIO o banco de dados e a orientacao as empresas." },
    { q: "Por que Nova Friburgo nao faz isso hoje?", a: "Porque ninguem obriga. As empresas nao sabem que podem, a prefeitura nao orienta, e os projetos locais nao estao cadastrados. O dinheiro vai embora por falta de informacao e organizacao — nao por falta de lei." },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] text-white">
      {/* HERO FULL SCREEN */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 bg-gradient-to-b from-[#020508] via-[var(--primary)] to-[var(--bg-dark)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="inline-flex items-center gap-2 bg-[var(--accent)]/20 border border-[var(--accent)]/30 rounded-full px-5 py-2 mb-8">
              <Scale className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-[var(--accent)] text-sm font-ui font-medium">Projeto de Lei — Marcos Medeiros — DC 27</span>
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-[1.05] mb-8">
            O imposto vai<br />embora do municipio.<br /><span className="text-[var(--accent)]">Nao volta.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-6">
            Nova Friburgo tem mais de 15 mil empresas. Elas pagam milhoes em impostos federais e estaduais todo ano.
            Esse dinheiro vai pra Brasilia e pro Rio — e <strong className="text-white">quase nada volta</strong>.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
            className="text-lg text-[var(--accent)] max-w-2xl mx-auto leading-relaxed mb-10 font-semibold">
            A proposta do Marcos: criar uma lei que organize o municipio para captar esse dinheiro
            de volta — usando leis de incentivo fiscal que JA existem.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }} className="flex flex-wrap justify-center gap-4">
            <a href="#como-funciona" className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] px-8 py-4 rounded-full font-ui font-bold text-lg transition-all hover:scale-105">
              Entenda em 5 Passos <ArrowRight className="w-5 h-5" />
            </a>
            <a href="https://wa.me/5522998954874?text=Quero%20entender%20a%20proposta%20de%20incentivos%20fiscais" target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-ui font-semibold text-lg transition-all">
              <MessageCircle className="w-5 h-5" /> Falar com Marcos
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-16">
            <ChevronDown className="w-8 h-8 text-white/20 mx-auto animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* CONTEXTO NOVA FRIBURGO */}
      <section className="py-16 bg-[var(--primary)]/80 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center gap-2 mb-8">
            <MapPin className="w-5 h-5 text-[var(--accent)]" />
            <span className="font-ui font-semibold text-white">Nova Friburgo em Numeros (IBGE 2023/2024)</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { v: FRIBURGO_DADOS.populacao, l: "Habitantes" },
              { v: FRIBURGO_DADOS.pib_per_capita, l: "PIB per capita" },
              { v: FRIBURGO_DADOS.receita_municipal, l: "Receita municipal/ano" },
              { v: FRIBURGO_DADOS.empresas_ativas, l: "Empresas ativas" },
              { v: "0", l: "Captacao via incentivos" },
            ].map((d, i) => (
              <div key={i} className="text-center p-4 bg-white/5 rounded-xl">
                <p className={"font-display text-2xl md:text-3xl font-black " + (i === 4 ? "text-red-400" : "text-[var(--accent)]")}>{d.v}</p>
                <p className="text-white/50 text-xs font-ui mt-1">{d.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-20 bg-[var(--accent)] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Quote className="w-12 h-12 text-[var(--primary)]/20 mx-auto mb-6" />
          <blockquote className="font-display text-2xl md:text-4xl italic text-[var(--primary)] leading-snug font-bold">
            &ldquo;Voce tem um monte de empresa que paga um monte de imposto federal, estadual. O imposto vai embora do municipio, nao volta. Se essas leis fossem usadas atraves de uma legislacao municipal, esse dinheiro nao iria embora. Ele ia ficar para financiar projetos dentro do municipio.&rdquo;
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Image src="/images/marcos-perfil.jpg" alt="Marcos Medeiros" width={56} height={56} className="rounded-full border-2 border-[var(--primary)]/20" />
            <div className="text-left">
              <p className="font-ui font-bold text-[var(--primary)]">Marcos Medeiros</p>
              <p className="text-[var(--primary)]/60 text-sm font-ui">Jornalista — TV do Povo — DC 27</p>
            </div>
          </div>
        </div>
      </section>

      {/* O PROBLEMA */}
      <section className="py-20 bg-[var(--bg-dark)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-red-400 font-ui font-semibold text-sm uppercase tracking-wider">O Problema</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-3">Bilhoes saem dos municipios.<br />Quase nada volta.</h2>
            <p className="text-white/50 font-ui mt-4 max-w-2xl mx-auto">Dados reais sobre incentivos fiscais no Brasil — e quanto Nova Friburgo capta hoje</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { valor: "R$ 2,8 bi", label: "Captados via Lei Rouanet em 2023", sub: "Concentrados no eixo Rio-SP. Cidades pequenas ficam de fora.", icon: <Banknote className="w-6 h-6 text-red-400" /> },
              { valor: "R$ 480 mi", label: "Lei de Incentivo ao Esporte 2023", sub: "Quase tudo vai pra grandes clubes e capitais.", icon: <Dumbbell className="w-6 h-6 text-red-400" /> },
              { valor: "~15 mil", label: "Empresas em Nova Friburgo", sub: "Capital da moda intima + turismo + agro.", icon: <Building2 className="w-6 h-6 text-[var(--accent)]" /> },
              { valor: "~R$ 0", label: "Captado por NF via incentivos", sub: "Falta organizacao, nao falta lei.", icon: <TrendingUp className="w-6 h-6 text-red-400" /> },
            ].map((n, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-8 border border-white/10 text-center">
                <div className="mb-3 flex justify-center">{n.icon}</div>
                <p className="font-display text-3xl md:text-4xl font-black text-[var(--accent)] mb-2">{n.valor}</p>
                <p className="text-white/70 font-ui text-sm mb-3">{n.label}</p>
                <p className="text-white/40 text-xs font-ui italic">{n.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA - 5 PASSOS */}
      <section id="como-funciona" className="py-24 bg-gradient-to-b from-[var(--bg-dark)] to-[var(--primary)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">A Solucao</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-3">Como Funciona em 5 Passos</h2>
          </motion.div>
          <div className="space-y-10">
            {COMO_FUNCIONA.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className="flex items-start gap-6 md:gap-10 bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10">
                <div className="shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[var(--accent)] flex items-center justify-center">
                    <span className="font-display text-2xl md:text-3xl font-black text-[var(--primary)]">{item.step}</span>
                  </div>
                </div>
                <div className="pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-[var(--accent)]">{item.icon}</div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-white">{item.titulo}</h3>
                  </div>
                  <p className="text-white/60 leading-relaxed text-base md:text-lg">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-green-500/20 border border-green-500/30 rounded-2xl px-8 py-4">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
              <span className="text-green-300 font-ui font-semibold text-lg">100% legal. Sem imposto novo. Sem gasto publico extra.</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4 PILARES */}
      <section className="py-24 bg-[var(--primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Onde o Dinheiro Fica</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-3">4 Areas de Impacto</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-8">
            {PILARES.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-8 border border-white/10 hover:border-[var(--accent)]/30 transition-all">
                <div className={"w-16 h-16 rounded-2xl bg-gradient-to-br " + p.cor + " flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform"}>{p.icon}</div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">{p.titulo}</h3>
                <p className="text-white/60 leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/5 border border-white/10 text-white/40 px-3 py-1 rounded-full text-xs font-ui">{p.lei}</span>
                  <span className="bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] px-3 py-1 rounded-full text-xs font-ui font-semibold">{p.impacto}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOJE vs COM A LEI */}
      <section className="py-24 bg-[var(--bg-dark)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white">Hoje vs. Com a Lei</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8">
              <h3 className="font-display text-xl font-bold text-red-400 mb-6">HOJE</h3>
              {["Empresas pagam IR/ICMS — dinheiro vai embora", "Prefeitura nao tem banco de dados fiscal", "Nenhuma orientacao sobre incentivos", "Projetos locais sem financiamento", "R$ 0 captado via incentivos federais"].map((t, i) => (
                <div key={i} className="flex items-start gap-3 mb-3 text-white/70"><span className="text-red-400 mt-0.5">✗</span><p>{t}</p></div>
              ))}
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8">
              <h3 className="font-display text-xl font-bold text-green-400 mb-6">COM A LEI</h3>
              {["Banco de dados mapeia todas as empresas", "Equipe orienta sobre deducoes disponiveis", "Projetos locais cadastrados e qualificados", "Empresa direciona imposto pra projeto local", "Dinheiro financia cultura, esporte, educacao EM NF"].map((t, i) => (
                <div key={i} className="flex items-start gap-3 mb-3 text-white/70"><span className="text-green-400 mt-0.5">✓</span><p>{t}</p></div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[var(--primary)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Perguntas Frequentes</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-3">Tire suas Duvidas</h2>
          </motion.div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <button onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between">
                  <span className="font-ui font-semibold text-white pr-4">{item.q}</span>
                  <ChevronDown className={"w-5 h-5 text-[var(--accent)] shrink-0 transition-transform " + (expandedFAQ === i ? "rotate-180" : "")} />
                </button>
                {expandedFAQ === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    className="px-6 pb-4">
                    <p className="text-white/60 leading-relaxed font-ui text-sm">{item.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QUEM E MARCOS */}
      <section className="py-24 bg-[var(--bg-dark)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-[200px_1fr] gap-10 items-start">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <Image src="/images/marcos-perfil.jpg" alt="Marcos Medeiros" width={200} height={200} className="rounded-2xl border-4 border-[var(--accent)]" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Quem Propoe</span>
              <h2 className="font-display text-3xl font-bold text-white mt-2 mb-4">Marcos Medeiros</h2>
              <div className="space-y-3 text-white/70 leading-relaxed">
                <p>Jornalista, apresentador e reporter. Criador da <strong className="text-white">TV do Povo</strong> — 3.575+ videos cobrindo o dia a dia de Nova Friburgo.</p>
                <p>Filho dos ex-vereadores <strong className="text-white">Helio</strong> e <strong className="text-white">Irany Medeiros</strong>. Nascido e criado em Nova Friburgo.</p>
                <p>Vereador na 16a Legislatura (2009-2012) com <strong className="text-[var(--accent)]">5.550 votos</strong> — recorde historico da cidade. Produziu <strong className="text-[var(--accent)]">7.919 materias legislativas</strong> em um unico mandato, incluindo 1.647 projetos de lei.</p>
                <p>Colunista do <strong className="text-white">Serra News</strong>. Conhece cada rua, cada bairro, cada problema de Friburgo.</p>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <span className="bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1 rounded-full text-xs font-ui font-bold">DC 27</span>
                <span className="bg-white/5 text-white/40 px-3 py-1 rounded-full text-xs font-ui">Deputado Federal 2026</span>
                <span className="bg-white/5 text-white/40 px-3 py-1 rounded-full text-xs font-ui">Nova Friburgo, RJ</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 bg-gradient-to-b from-[var(--bg-dark)] to-[var(--primary)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Megaphone className="w-16 h-16 text-[var(--accent)] mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">O dinheiro ja existe.<br />So precisa ficar aqui.</h2>
            <p className="text-white/60 text-lg font-ui mb-10 max-w-xl mx-auto">
              Compartilhe essa proposta. Fale com empresarios, comerciantes, vizinhos.
              Quanto mais gente souber, mais rapido Nova Friburgo muda.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/5522998954874?text=Quero%20apoiar%20a%20proposta%20do%20Marcos%20Medeiros%20sobre%20incentivos%20fiscais%20pra%20Nova%20Friburgo" target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-ui font-bold text-lg transition-all hover:scale-105">
                <MessageCircle className="w-5 h-5" /> Falar com Marcos
              </a>
              <Link href="/tv" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-ui font-semibold text-lg transition-all">
                <Globe className="w-5 h-5" /> Assistir TV do Povo
              </Link>
            </div>
            <p className="mt-12 text-white/20 text-sm font-ui">
              Fonte dos dados: IBGE (2023/2024), SAPL Camara Nova Friburgo, Ministerio da Cultura, Secretaria de Esporte
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
