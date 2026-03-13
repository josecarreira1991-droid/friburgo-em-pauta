"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  FileText, Printer, Share2, Scale, Building2,
  Palette, Dumbbell, GraduationCap, TreePine, HandCoins,
  ShieldCheck, Target, Lightbulb, CheckCircle2, ArrowLeft,
  MessageCircle, Globe, Users, Banknote,
  BookOpen, Heart, Zap, Star, Award, ChevronRight,
  ChevronDown, ExternalLink, Vote, Shield,
  BarChart3, Calendar, Hash, MapPin,
} from "lucide-react";

const MANDATO_STATS = [
  { valor: "7.919", label: "Matérias legislativas", sub: "Recorde histórico em um único mandato", icon: FileText, cor: "text-[var(--accent)]" },
  { valor: "1.883", label: "Projetos de Lei", sub: "PLOs + Resoluções de 2009 a 2012", icon: Scale, cor: "text-blue-600" },
  { valor: "3.195", label: "Moções", sub: "Moções e Moções Especiais de Louvor", icon: Award, cor: "text-purple-600" },
  { valor: "2.608", label: "Indicações", sub: "Pedidos de obras e serviços para o povo", icon: MapPin, cor: "text-green-600" },
  { valor: "118", label: "Requerimentos", sub: "Fiscalização do Executivo Municipal", icon: BookOpen, cor: "text-orange-600" },
  { valor: "5.550", label: "Votos em 2008", sub: "Recorde histórico de Nova Friburgo", icon: Vote, cor: "text-red-600" },
];

const CONQUISTAS_MANDATO = [
  {
    ano: "2010", titulo: "UPA de Nova Friburgo",
    desc: "Marcos foi um dos principais articuladores para a conquista da Unidade de Pronto Atendimento (UPA) de Nova Friburgo — saúde de emergência 24h para toda a população.",
    impacto: "Saúde para 200 mil pessoas", icon: Heart, cor: "bg-red-50 border-red-200 text-red-700",
  },
  {
    ano: "2011", titulo: "Ensino Superior em Friburgo",
    desc: "Trabalhou ativamente para trazer a Estácio de Sá para Nova Friburgo, abrindo as portas do ensino superior acessível para os friburguenses sem precisar sair da cidade.",
    impacto: "Educação superior local", icon: GraduationCap, cor: "bg-blue-50 border-blue-200 text-blue-700",
  },
  {
    ano: "2009–2012", titulo: "TV do Povo — Canal 3",
    desc: "Criou e consolidou a TV do Povo como o principal canal de comunicação comunitária de Nova Friburgo. Mais de 3.500 programas produzidos, dando voz ao cidadão comum.",
    impacto: "Comunicação comunitária", icon: Globe, cor: "bg-purple-50 border-purple-200 text-purple-700",
  },
  {
    ano: "2009–2012", titulo: "Fiscalização Permanente",
    desc: "118 Requerimentos de Informação ao Executivo Municipal — fiscalização rigorosa dos gastos públicos, contratos e obras da Prefeitura de Nova Friburgo.",
    impacto: "Transparência e controle", icon: Shield, cor: "bg-yellow-50 border-yellow-200 text-yellow-700",
  },
];

const PROJETOS_DESTAQUE = [
  { numero: "PLO 319/2012", titulo: "Banco de Dados de Empresas para Incentivos Fiscais", area: "Economia", status: "Apresentado" },
  { numero: "PLO 494/2011", titulo: "Programa Municipal de Incentivo ao Esporte Amador", area: "Esporte", status: "Aprovado" },
  { numero: "PLO 834/2010", titulo: "Regulamentação de Projetos Culturais Locais", area: "Cultura", status: "Aprovado" },
  { numero: "PLO 194/2009", titulo: "Criação do Conselho Municipal de Meio Ambiente", area: "Meio Ambiente", status: "Aprovado" },
  { numero: "PLO 215/2010", titulo: "Programa de Capacitação Profissional para Jovens", area: "Educação", status: "Aprovado" },
  { numero: "PLO 401/2011", titulo: "Transparência nos Gastos Públicos Municipais", area: "Governança", status: "Aprovado" },
];

const COMO_FUNCIONA = [
  { step: "01", titulo: "Banco de Dados Municipal Obrigatório", desc: "Lei federal obriga a prefeitura a mapear TODAS as empresas do município que pagam IR e ICMS acima de determinado valor. Hoje ninguém sabe quantas empresas têm e quanto pagam.", icon: Building2 },
  { step: "02", titulo: "Orientação Fiscal Gratuita", desc: "Equipe da prefeitura orienta cada empresa sobre QUAIS leis de incentivo ela pode usar. Muitas nem sabem que podem deduzir.", icon: Lightbulb },
  { step: "03", titulo: "Cadastro de Projetos Locais", desc: "Projetos culturais, esportivos, educacionais e ambientais são cadastrados e qualificados para receber os recursos. Transparência total.", icon: Target },
  { step: "04", titulo: "Conexão Empresa–Projeto", desc: "A prefeitura faz o match: conecta a empresa que quer deduzir com o projeto local que precisa de recurso. O dinheiro vai direto pro projeto, sem intermediário.", icon: HandCoins },
  { step: "05", titulo: "Fiscalização e Prestação de Contas", desc: "Todo recurso é fiscalizado. Relatórios públicos. A comunidade acompanha onde cada real foi investido. Sem caixa preta.", icon: ShieldCheck },
];

const PILARES = [
  { icon: Palette, titulo: "Cultura", lei: "Lei Rouanet (Lei 8.313/91)", impacto: "Até 4% do IR da empresa", desc: "Festivais, teatros, música, dança — projetos culturais financiados com dinheiro que as empresas JÁ pagam de imposto.", cor: "from-purple-500 to-pink-500", bg: "bg-purple-50 border-purple-200" },
  { icon: Dumbbell, titulo: "Esporte", lei: "Lei de Incentivo ao Esporte (Lei 11.438/06)", impacto: "Até 2% do IR da empresa", desc: "Campos, quadras, escolinhas, equipamentos. O esporte transforma jovens e a verba já está na legislação.", cor: "from-green-500 to-emerald-500", bg: "bg-green-50 border-green-200" },
  { icon: GraduationCap, titulo: "Educação", lei: "FNDE + Incentivos Estaduais", impacto: "Dedução via ICMS + IR", desc: "Bolsas, cursos técnicos, capacitação profissional. Empresas podem financiar educação local com incentivos já existentes.", cor: "from-blue-500 to-cyan-500", bg: "bg-blue-50 border-blue-200" },
  { icon: TreePine, titulo: "Meio Ambiente", lei: "ICMS Ecológico + Lei 12.305", impacto: "Repasse maior de ICMS", desc: "Preservação da serra fluminense, reflorestamento, sustentabilidade. O ICMS Ecológico já existe — Nova Friburgo precisa captar.", cor: "from-teal-500 to-green-500", bg: "bg-teal-50 border-teal-200" },
];

const BANDEIRAS_FEDERAIS = [
  {
    icon: Users, titulo: "Defesa da Região Serrana", destaque: "Região Serrana no mapa federal",
    desc: "Levar as demandas específicas da Região Serrana Fluminense ao Congresso Nacional. Nova Friburgo, Teresópolis, Petrópolis e toda a serra têm necessidades únicas: prevenção de desastres naturais, infraestrutura de montanha, turismo de serra e agronegócio familiar.",
    acoes: ["Emendas para prevenção de enchentes e deslizamentos", "Recursos para infraestrutura de montanha", "Fundo especial para municípios da Serra Fluminense"],
  },
  {
    icon: Heart, titulo: "Saúde Pública e SUS", destaque: "Mais saúde para o interior do RJ",
    desc: "Marcos foi um dos responsáveis pela conquista da UPA de Nova Friburgo. Na Câmara Federal, vai lutar por mais recursos do SUS para municípios de médio porte, ampliação de leitos hospitalares e fortalecimento da atenção básica na região serrana.",
    acoes: ["Mais recursos do SUS para municípios de médio porte", "Ampliação de leitos hospitalares na região", "Fortalecimento da atenção básica e UPAs"],
  },
  {
    icon: GraduationCap, titulo: "Educação Superior Acessível", destaque: "Ensino superior no interior",
    desc: "Marcos ajudou a trazer a Estácio para Nova Friburgo. Na Câmara, vai defender a expansão do ensino superior público e privado no interior, com foco em cursos técnicos e tecnológicos.",
    acoes: ["Expansão do PRONATEC e cursos técnicos", "Incentivo a faculdades no interior do RJ", "Bolsas para filhos de trabalhadores locais"],
  },
  {
    icon: Zap, titulo: "Infraestrutura e Desenvolvimento", destaque: "Emendas para Nova Friburgo",
    desc: "Captação de emendas parlamentares para obras de infraestrutura em Nova Friburgo e região: pavimentação, saneamento básico, iluminação pública, prevenção de enchentes e deslizamentos.",
    acoes: ["Emendas para pavimentação de bairros", "Saneamento básico e água tratada", "Obras de contenção de encostas e prevenção"],
  },
  {
    icon: Globe, titulo: "Comunicação Comunitária", destaque: "Comunicação para todos",
    desc: "Como jornalista e criador da TV do Povo, Marcos vai defender na Câmara o fortalecimento da comunicação comunitária, o acesso à internet de qualidade no interior e a liberdade de imprensa.",
    acoes: ["Regulamentação das TVs comunitárias", "Internet de qualidade no interior do RJ", "Proteção à liberdade de imprensa"],
  },
  {
    icon: TreePine, titulo: "Preservação da Serra Fluminense", destaque: "Meio ambiente e prevenção",
    desc: "Nova Friburgo está no coração da Mata Atlântica. Marcos vai lutar por recursos federais para preservação ambiental, reflorestamento, ecoturismo sustentável e prevenção de desastres climáticos.",
    acoes: ["Recursos para reflorestamento da Mata Atlântica", "Fundo federal para ecoturismo sustentável", "Programa de prevenção de desastres climáticos"],
  },
];

export default function DocumentoPage() {
  const [expandedBandeira, setExpandedBandeira] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  function handlePrint() { window.print(); }

  function handleShare() {
    const url = window.location.origin + "/proposta/documento";
    if (navigator.share) {
      navigator.share({ title: "Plano de Governo — Marcos Medeiros — Deputado Federal 2026", text: "Conheça o plano completo de Marcos Medeiros para Nova Friburgo na Câmara Federal. DC 27.", url });
    } else {
      navigator.clipboard.writeText(url).then(() => alert("Link copiado! Compartilhe com seus amigos."));
    }
  }

  function handleWhatsApp() {
    const text = encodeURIComponent("Olha o plano completo do Marcos Medeiros para Deputado Federal! " + window.location.origin + "/proposta/documento");
    window.open("https://wa.me/?text=" + text, "_blank");
  }

  return (
    <div className="min-h-screen bg-white print:bg-white">

      {/* BARRA DE AÇÕES */}
      <div className="print:hidden sticky top-0 z-40 bg-[var(--primary)] shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2 flex-wrap">
          <Link href="/proposta" className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-ui transition-colors shrink-0">
            <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Voltar</span>
          </Link>
          <p className="text-white/40 font-ui text-xs hidden md:block">Plano de Governo · Marcos Medeiros · DC 27</p>
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={handleWhatsApp} className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-full text-xs font-ui font-semibold transition-all">
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </button>
            <button onClick={handleShare} className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full text-xs font-ui transition-all">
              <Share2 className="w-3.5 h-3.5" /> Compartilhar
            </button>
            <button onClick={handlePrint} className="flex items-center gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] px-3 py-1.5 rounded-full text-xs font-ui font-bold transition-all">
              <Printer className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Imprimir /</span> PDF
            </button>
          </div>
        </div>
      </div>

      {/* CAPA HERO */}
      <div ref={heroRef} className="relative bg-[var(--primary)] overflow-hidden print:bg-white print:border-b-4 print:border-[var(--accent)]">
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[#1a3a6e] to-[#0a1f3d]" />
          <div className="absolute top-0 right-0 w-72 h-72 bg-[var(--accent)]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/3 rounded-full blur-2xl" />
        </motion.div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="shrink-0">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-[var(--accent)] shadow-2xl">
                <Image src="/images/marcos-perfil.jpg" alt="Marcos Medeiros" fill className="object-cover" />
              </div>
              <div className="mt-2 text-center">
                <span className="inline-flex items-center gap-1 bg-[var(--accent)] text-[var(--primary)] px-2.5 py-1 rounded-full text-xs font-ui font-black">
                  <Hash className="w-3 h-3" /> DC 27
                </span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-center sm:text-left">
              <p className="text-[var(--accent)] font-ui font-semibold text-xs uppercase tracking-[0.2em] mb-2">Plano de Governo Completo</p>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">Marcos Medeiros</h1>
              <p className="font-display text-lg sm:text-xl md:text-2xl text-[var(--accent)] font-bold mt-1">Deputado Federal 2026</p>
              <p className="text-white/50 font-ui text-sm mt-1">Democrata Cristão (DC) · Nova Friburgo, RJ</p>
              <div className="mt-5 flex flex-wrap gap-2 justify-center sm:justify-start">
                {[
                  { icon: Vote, label: "5.550 votos em 2008" },
                  { icon: FileText, label: "7.919 matérias legislativas" },
                  { icon: Calendar, label: "Mandato 2009–2012" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5">
                    <item.icon className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span className="text-white/70 font-ui text-xs">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Índice rápido */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2 print:hidden">
            {[
              { label: "Histórico", href: "#historico", icon: Star },
              { label: "Conquistas", href: "#conquistas", icon: Award },
              { label: "Incentivos Fiscais", href: "#incentivos", icon: Banknote },
              { label: "Plano Federal", href: "#federal", icon: Scale },
            ].map((item, i) => (
              <a key={i} href={item.href} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-xl px-3 py-2.5 transition-all group">
                <item.icon className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span className="text-white/80 font-ui text-xs group-hover:text-white">{item.label}</span>
                <ChevronRight className="w-3 h-3 text-white/30 ml-auto" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-14 print:space-y-10">

        {/* ── 1. HISTÓRICO ── */}
        <section id="historico" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <div>
              <p className="text-[var(--accent)] font-ui text-xs font-semibold uppercase tracking-wider">Seção 1</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--primary)]">Histórico e Trajetória</h2>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[var(--primary)] to-[#1a3a6e] rounded-2xl p-6 md:p-8 mb-6 text-white">
            <p className="font-ui text-base md:text-lg leading-relaxed text-white/90">
              Marcos Medeiros é jornalista, comunicador e ex-vereador de Nova Friburgo. Eleito em 2008 com <strong className="text-[var(--accent)]">5.550 votos</strong> — o maior número da história da cidade, recorde que nunca foi superado —, exerceu mandato de 2009 a 2012 com uma produção legislativa histórica: <strong className="text-[var(--accent)]">7.919 matérias</strong> em quatro anos, incluindo 1.647 projetos de lei.
            </p>
            <p className="font-ui text-sm leading-relaxed text-white/60 mt-4">
              Fundador e apresentador da TV do Povo — Canal 3, com mais de 3.500 programas produzidos. Em 2026, leva essa experiência para a Câmara dos Deputados pelo Democrata Cristão (DC 27).
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {MANDATO_STATS.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-white border border-[var(--border)] rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.cor}`} />
                <p className={`font-display text-2xl md:text-3xl font-black ${stat.cor}`}>{stat.valor}</p>
                <p className="font-ui font-semibold text-[var(--primary)] text-xs mt-1">{stat.label}</p>
                <p className="text-[var(--primary)]/40 font-ui text-[10px] mt-0.5 leading-tight">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 2. CONQUISTAS ── */}
        <section id="conquistas" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <div>
              <p className="text-[var(--accent)] font-ui text-xs font-semibold uppercase tracking-wider">Seção 2</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--primary)]">Conquistas do Mandato</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {CONQUISTAS_MANDATO.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`rounded-2xl border p-5 ${c.cor}`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-ui text-xs font-bold opacity-60">{c.ano}</span>
                    <h3 className="font-display text-base font-bold mt-0.5">{c.titulo}</h3>
                    <p className="font-ui text-sm opacity-80 mt-2 leading-relaxed">{c.desc}</p>
                    <span className="inline-flex items-center gap-1 mt-3 bg-white/50 rounded-full px-2.5 py-1 text-xs font-ui font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> {c.impacto}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Projetos em destaque */}
          <div className="bg-[var(--bg-paper,#f8f9fa)] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold text-[var(--primary)]">Projetos de Lei em Destaque</h3>
              <a href="https://sapl.novafriburgo.rj.leg.br/parlamentar/84/materias" target="_blank" rel="noopener"
                className="flex items-center gap-1 text-[var(--accent)] font-ui text-xs font-semibold hover:underline">
                Ver todos <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="space-y-2">
              {PROJETOS_DESTAQUE.map((p, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-[var(--border)]">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-ui font-semibold text-[var(--primary)] text-sm truncate">{p.titulo}</p>
                    <p className="text-[var(--primary)]/40 font-ui text-xs">{p.numero} · {p.area}</p>
                  </div>
                  <span className={`shrink-0 text-xs font-ui font-semibold px-2 py-0.5 rounded-full ${p.status === "Aprovado" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--border)] text-center">
              <a href="https://sapl.novafriburgo.rj.leg.br/parlamentar/84/materias" target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 text-[var(--accent)] font-ui font-bold text-sm hover:underline">
                <ExternalLink className="w-4 h-4" /> Consultar todos os 7.919 documentos no SAPL Oficial
              </a>
            </div>
          </div>
        </section>

        {/* ── 3. INCENTIVOS FISCAIS ── */}
        <section id="incentivos" className="scroll-mt-20 print:break-before-page">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center shrink-0">
              <Banknote className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <div>
              <p className="text-[var(--accent)] font-ui text-xs font-semibold uppercase tracking-wider">Seção 3 — Proposta Principal</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--primary)]">Projeto de Lei Federal: Incentivos Fiscais Municipais</h2>
            </div>
          </div>
          <div className="bg-[var(--primary)] rounded-2xl p-6 md:p-8 mb-6">
            <blockquote className="font-display text-lg md:text-xl font-bold text-white leading-relaxed">
              "O imposto vai embora do município. Não volta. Esse dinheiro ia ficar para financiar projetos dentro do município."
            </blockquote>
            <p className="text-[var(--accent)] font-ui text-sm font-semibold mt-4">— Marcos Medeiros</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { valor: "R$ 2,8 bi", label: "Captados via Lei Rouanet 2023", sub: "Concentrados no eixo Rio-SP", cor: "text-red-600" },
              { valor: "R$ 480 mi", label: "Lei de Incentivo ao Esporte 2023", sub: "Quase tudo vai para capitais", cor: "text-red-600" },
              { valor: "~15 mil", label: "Empresas ativas em Nova Friburgo", sub: "Capital da moda íntima + turismo", cor: "text-[var(--accent)]" },
              { valor: "~R$ 0", label: "Captado por NF via incentivos", sub: "Falta organização, não falta lei", cor: "text-red-600" },
            ].map((n, i) => (
              <div key={i} className="bg-white border border-[var(--border)] rounded-2xl p-4 text-center">
                <p className={`font-display text-2xl font-black ${n.cor}`}>{n.valor}</p>
                <p className="font-ui font-semibold text-[var(--primary)] text-xs mt-1">{n.label}</p>
                <p className="text-[var(--primary)]/40 font-ui text-[10px] mt-0.5 italic">{n.sub}</p>
              </div>
            ))}
          </div>
          <h3 className="font-display text-xl font-bold text-[var(--primary)] mb-4">Como Funciona — 5 Passos</h3>
          <div className="space-y-3 mb-6">
            {COMO_FUNCIONA.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-start gap-4 bg-white border border-[var(--border)] rounded-2xl p-4">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                  <span className="font-display text-base font-black text-[var(--primary)]">{item.step}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <item.icon className="w-4 h-4 text-[var(--accent)]" />
                    <h4 className="font-display text-base font-bold text-[var(--primary)]">{item.titulo}</h4>
                  </div>
                  <p className="text-[var(--primary)]/60 font-ui text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <h3 className="font-display text-xl font-bold text-[var(--primary)] mb-4">4 Áreas de Impacto em Nova Friburgo</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {PILARES.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`rounded-2xl border p-5 ${p.bg}`}>
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.cor} flex items-center justify-center text-white mb-3`}>
                  <p.icon className="w-5 h-5" />
                </div>
                <h4 className="font-display text-base font-bold text-[var(--primary)] mb-2">{p.titulo}</h4>
                <p className="text-[var(--primary)]/70 font-ui text-sm leading-relaxed mb-3">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/70 border border-white text-[var(--primary)]/60 px-2.5 py-1 rounded-full text-xs font-ui">{p.lei}</span>
                  <span className="bg-[var(--accent)]/20 border border-[var(--accent)]/30 text-[var(--primary)] px-2.5 py-1 rounded-full text-xs font-ui font-semibold">{p.impacto}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-ui font-bold text-green-800">100% legal. Sem imposto novo. Sem gasto público extra.</p>
              <p className="font-ui text-sm text-green-700 mt-1">As empresas continuam pagando o mesmo valor de imposto. A diferença é que parte desse valor, em vez de ir direto para Brasília, financia projetos aqui em Nova Friburgo.</p>
            </div>
          </div>
        </section>

        {/* ── 4. BANDEIRAS FEDERAIS ── */}
        <section id="federal" className="scroll-mt-20 print:break-before-page">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <div>
              <p className="text-[var(--accent)] font-ui text-xs font-semibold uppercase tracking-wider">Seção 4</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--primary)]">Bandeiras para o Mandato Federal</h2>
            </div>
          </div>
          <div className="space-y-3">
            {BANDEIRAS_FEDERAIS.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden">
                <button onClick={() => setExpandedBandeira(expandedBandeira === i ? null : i)}
                  className="w-full flex items-center gap-4 p-4 md:p-5 text-left hover:bg-[var(--bg-paper,#f8f9fa)] transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-[var(--primary)] flex items-center justify-center shrink-0">
                    <b.icon className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-base md:text-lg font-bold text-[var(--primary)]">{b.titulo}</h3>
                    <p className="text-[var(--accent)] font-ui text-xs font-semibold">{b.destaque}</p>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-[var(--primary)]/40 shrink-0 transition-transform ${expandedBandeira === i ? "rotate-180" : ""}`} />
                </button>
                {expandedBandeira === i && (
                  <div className="px-4 md:px-5 pb-5 border-t border-[var(--border)]">
                    <p className="text-[var(--primary)]/70 font-ui text-sm leading-relaxed mt-4 mb-4">{b.desc}</p>
                    <div className="space-y-2">
                      {b.acoes.map((acao, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                          <p className="font-ui text-sm text-[var(--primary)]/80">{acao}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 5. COMPARATIVO ── */}
        <section className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center shrink-0">
              <BarChart3 className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <div>
              <p className="text-[var(--accent)] font-ui text-xs font-semibold uppercase tracking-wider">Seção 5</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--primary)]">Nova Friburgo com e sem Representação</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <h3 className="font-display text-base font-bold text-red-700 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-200 flex items-center justify-center text-red-700 text-xs font-black">✗</span>
                Sem representação forte
              </h3>
              <div className="space-y-2.5">
                {["Emendas parlamentares vão para outras regiões", "Incentivos fiscais nunca chegam a Nova Friburgo", "Região Serrana invisível em Brasília", "Recursos do SUS insuficientes para o interior", "Comunicação comunitária sem apoio federal", "Desastres naturais sem prevenção federal"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />
                    <p className="font-ui text-sm text-red-800">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <h3 className="font-display text-base font-bold text-green-700 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center text-green-700 text-xs font-black">✓</span>
                Com Marcos Medeiros
              </h3>
              <div className="space-y-2.5">
                {["Emendas parlamentares direto para Nova Friburgo", "Lei federal de incentivos fiscais municipais aprovada", "Região Serrana com voz ativa no Congresso", "Mais recursos do SUS para municípios de médio porte", "Proteção legal para TVs e rádios comunitárias", "Programa federal de prevenção de desastres na serra"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <p className="font-ui text-sm text-green-800">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="print:hidden">
          <div className="bg-[var(--primary)] rounded-3xl p-6 md:p-10 text-center">
            <p className="text-[var(--accent)] font-ui font-semibold text-xs uppercase tracking-wider mb-3">Outubro de 2026</p>
            <h2 className="font-display text-2xl md:text-3xl font-black text-white mb-3">Nova Friburgo merece um deputado de verdade.</h2>
            <p className="text-white/60 font-ui text-sm max-w-lg mx-auto mb-8">Compartilhe este plano com amigos, familiares e vizinhos. Cada pessoa que conhece as propostas do Marcos é um voto a mais para Nova Friburgo em Brasília.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={handleWhatsApp} className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-ui font-bold transition-all">
                <MessageCircle className="w-5 h-5" /> Compartilhar no WhatsApp
              </button>
              <button onClick={handleShare} className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-ui font-semibold transition-all">
                <Share2 className="w-5 h-5" /> Compartilhar o Link
              </button>
              <button onClick={handlePrint} className="flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] px-6 py-3 rounded-full font-ui font-bold transition-all">
                <Printer className="w-5 h-5" /> Imprimir / Salvar PDF
              </button>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <a href="https://wa.me/5522998954874?text=Ol%C3%A1%20Marcos%2C%20li%20seu%20plano%20de%20governo%20e%20quero%20apoiar!" target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 text-white/50 hover:text-white font-ui text-sm transition-colors">
                <MessageCircle className="w-4 h-4" /> Falar diretamente com Marcos: (22) 99895-4874
              </a>
            </div>
          </div>
        </section>

        {/* Rodapé */}
        <footer className="text-center pt-4 pb-8 border-t border-[var(--border)]">
          <p className="text-[var(--primary)]/30 font-ui text-xs leading-relaxed">
            Marcos Medeiros · Deputado Federal 2026 · DC 27 · Nova Friburgo, RJ<br />
            Fontes: IBGE (2023/2024), SAPL Câmara Municipal de Nova Friburgo, Ministério da Cultura, Secretaria de Esporte<br />
            sapl.novafriburgo.rj.leg.br/parlamentar/84/materias
          </p>
        </footer>
      </div>
    </div>
  );
}
