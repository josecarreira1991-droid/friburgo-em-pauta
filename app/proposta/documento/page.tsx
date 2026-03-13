"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FileText, Printer, Share2, Download, Scale, Building2,
  Palette, Dumbbell, GraduationCap, TreePine, HandCoins,
  ShieldCheck, Target, Lightbulb, CheckCircle2, ArrowLeft,
  MessageCircle, Globe, Users, Banknote, TrendingUp,
  BookOpen, Heart, Zap, MapPin, Star, Award, ChevronRight,
} from "lucide-react";

export default function DocumentoPage() {
  function handlePrint() {
    window.print();
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: "Plano de Governo — Marcos Medeiros — Deputado Federal 2026",
        text: "Conheça o plano completo de Marcos Medeiros para Nova Friburgo na Câmara Federal.",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado!");
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      {/* Barra de ações — não imprime */}
      <div className="print:hidden sticky top-0 z-30 bg-[var(--primary)] border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <Link href="/proposta" className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-ui transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar à Proposta
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={handleShare}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-ui transition-all">
              <Share2 className="w-4 h-4" /> Compartilhar
            </button>
            <button onClick={handlePrint}
              className="flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] px-4 py-2 rounded-full text-sm font-ui font-semibold transition-all">
              <Printer className="w-4 h-4" /> Imprimir / Salvar PDF
            </button>
          </div>
        </div>
      </div>

      {/* DOCUMENTO */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 print:py-6 print:px-8">

        {/* Cabeçalho oficial */}
        <div className="text-center mb-12 print:mb-8 border-b-2 border-[var(--accent)] pb-10 print:pb-6">
          <div className="flex items-center justify-center gap-4 mb-6 print:mb-4">
            <div className="print:hidden">
              <Image src="/images/marcos-perfil.jpg" alt="Marcos Medeiros" width={80} height={80}
                className="rounded-full border-4 border-[var(--accent)]" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <Scale className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-[var(--accent)] font-ui text-xs font-semibold uppercase tracking-widest">
                  Democracia Cristã — DC 27
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-black text-[var(--primary)]">
                Marcos Medeiros
              </h1>
              <p className="font-ui text-[var(--primary)]/60 text-sm">
                Pré-candidato a Deputado Federal — Nova Friburgo, RJ — 2026
              </p>
            </div>
          </div>

          <div className="bg-[var(--primary)] text-white rounded-2xl print:rounded-none px-8 py-6 print:py-4">
            <h2 className="font-display text-2xl md:text-3xl font-black mb-2">
              PLANO DE GOVERNO — CÂMARA FEDERAL 2026
            </h2>
            <p className="font-ui text-white/70 text-sm">
              O que Marcos Medeiros vai fazer em Brasília pelo povo de Nova Friburgo e da Região Serrana
            </p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            {[
              { v: "5.550", l: "Votos — Recorde Histórico" },
              { v: "7.919", l: "Matérias Legislativas" },
              { v: "DC 27", l: "Democracia Cristã" },
            ].map((d, i) => (
              <div key={i} className="bg-[var(--bg-paper)] rounded-xl p-3 border border-[var(--border)]">
                <p className="font-display text-2xl font-black text-[var(--accent)]">{d.v}</p>
                <p className="font-ui text-xs text-[var(--primary)]/50 mt-0.5">{d.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* APRESENTAÇÃO */}
        <section className="mb-12 print:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-[var(--primary)]" />
            </div>
            <h2 className="font-display text-2xl font-bold text-[var(--primary)]">Apresentação</h2>
          </div>
          <div className="bg-white rounded-2xl print:rounded-none border border-[var(--border)] p-6 md:p-8">
            <blockquote className="border-l-4 border-[var(--accent)] pl-6 mb-6 italic font-display text-lg text-[var(--primary)]">
              "Para ser político é preciso gostar de gente. E meu pai me ensinou a gostar de gente."
            </blockquote>
            <div className="space-y-4 text-[var(--primary)]/80 leading-relaxed font-body">
              <p>
                Marcos da Silva Alberto Medeiros, nascido em 24 de fevereiro de 1969 em Nova Friburgo, RJ.
                Jornalista, apresentador e repórter. Filho dos ex-vereadores <strong>Hélio</strong> e <strong>Irany Medeiros</strong> —
                a política é de família.
              </p>
              <p>
                Em 2008, foi eleito vereador de Nova Friburgo com <strong className="text-[var(--accent)]">5.550 votos</strong> —
                o recorde histórico da cidade que nunca foi superado. Durante o mandato (2009-2012),
                produziu <strong>7.919 matérias legislativas</strong>, incluindo 1.647 projetos de lei.
              </p>
              <p>
                Criador e apresentador da <strong>TV do Povo — Canal 3</strong>, com mais de 3.575 programas
                cobrindo o dia a dia de Nova Friburgo. Colunista do Serra News. Conhece cada rua,
                cada bairro, cada problema da cidade.
              </p>
              <p>
                Em 2026, Marcos leva a luta de Nova Friburgo para o Congresso Nacional pelo
                <strong> Democracia Cristã (DC — número 27)</strong>. Este documento apresenta o plano
                concreto de atuação na Câmara Federal.
              </p>
            </div>
          </div>
        </section>

        {/* PROPOSTA PRINCIPAL */}
        <section className="mb-12 print:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center shrink-0">
              <Banknote className="w-4 h-4 text-[var(--primary)]" />
            </div>
            <h2 className="font-display text-2xl font-bold text-[var(--primary)]">
              Proposta Principal — Incentivos Fiscais para os Municípios
            </h2>
          </div>

          <div className="bg-[var(--primary)] text-white rounded-2xl print:rounded-none p-6 md:p-8 mb-6">
            <h3 className="font-display text-xl font-bold mb-3 text-[var(--accent)]">O Problema</h3>
            <p className="text-white/80 leading-relaxed mb-4">
              Nova Friburgo tem mais de 15 mil empresas. Elas pagam milhões em impostos federais e estaduais
              todo ano. Esse dinheiro vai para Brasília e para o Rio de Janeiro — e <strong className="text-white">quase nada volta</strong>.
            </p>
            <p className="text-white/80 leading-relaxed">
              Existem leis federais e estaduais de incentivo fiscal para cultura, esporte, educação e meio ambiente
              (Lei Rouanet, Lei do Esporte, ICMS Ecológico). As empresas de Nova Friburgo poderiam usar essas leis
              para <strong className="text-white">redirecionar parte dos impostos</strong> para projetos locais —
              mas não fazem porque não têm orientação e o município não está organizado para isso.
            </p>
          </div>

          <div className="bg-white rounded-2xl print:rounded-none border border-[var(--border)] p-6 md:p-8 mb-6">
            <h3 className="font-display text-xl font-bold mb-3 text-[var(--primary)]">A Solução — Projeto de Lei Federal</h3>
            <p className="text-[var(--primary)]/70 leading-relaxed mb-6">
              Marcos Medeiros vai apresentar na Câmara Federal um <strong>Projeto de Lei</strong> que obrigue os
              municípios brasileiros a criar e manter um <strong>Banco de Dados Municipal de Incentivos Fiscais</strong>,
              conectando empresas locais a projetos locais através das leis de incentivo já existentes.
            </p>

            <div className="space-y-4">
              {[
                {
                  n: "01", icon: Building2, titulo: "Banco de Dados Municipal Obrigatório",
                  desc: "A legislação obriga a prefeitura a mapear TODAS as empresas do município que pagam IR e ICMS acima de determinado valor. Hoje ninguém sabe quantas empresas têm e quanto pagam."
                },
                {
                  n: "02", icon: Lightbulb, titulo: "Orientação Fiscal Gratuita",
                  desc: "Equipe da prefeitura (ou parceria com escritórios de contabilidade) orienta cada empresa sobre QUAIS leis de incentivo ela pode usar. Muitas nem sabem que podem deduzir."
                },
                {
                  n: "03", icon: Target, titulo: "Cadastro de Projetos Locais",
                  desc: "Projetos culturais, esportivos, educacionais e ambientais do município são cadastrados e qualificados para receber os recursos. Transparência total."
                },
                {
                  n: "04", icon: HandCoins, titulo: "Conexão Empresa-Projeto",
                  desc: "A prefeitura faz o match: conecta a empresa que quer deduzir com o projeto local que precisa de recurso. O dinheiro vai direto para o projeto, sem intermediário."
                },
                {
                  n: "05", icon: ShieldCheck, titulo: "Fiscalização e Prestação de Contas",
                  desc: "Todo recurso é fiscalizado. Relatórios públicos. A comunidade acompanha onde cada real foi investido. Sem caixa preta."
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-[var(--bg-paper)] rounded-xl border border-[var(--border)]">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center shrink-0">
                    <span className="font-display text-sm font-black text-[var(--primary)]">{item.n}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className="w-4 h-4 text-[var(--accent)]" />
                      <h4 className="font-ui font-semibold text-[var(--primary)] text-sm">{item.titulo}</h4>
                    </div>
                    <p className="text-[var(--primary)]/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
              <p className="text-green-800 font-ui font-semibold text-sm">
                100% legal. Sem imposto novo. Sem gasto público extra. Usando leis que JÁ existem.
              </p>
            </div>
          </div>

          {/* 4 Áreas de Impacto */}
          <div className="bg-white rounded-2xl print:rounded-none border border-[var(--border)] p-6 md:p-8">
            <h3 className="font-display text-xl font-bold mb-6 text-[var(--primary)]">4 Áreas de Impacto em Nova Friburgo</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Palette, titulo: "Cultura", cor: "bg-purple-100 text-purple-700",
                  desc: "Festivais, teatros, música, dança — projetos culturais financiados com dinheiro que as empresas JÁ pagam de imposto.",
                  lei: "Lei Rouanet (Lei 8.313/91)", impacto: "Até 4% do IR da empresa"
                },
                {
                  icon: Dumbbell, titulo: "Esporte", cor: "bg-green-100 text-green-700",
                  desc: "Campos, quadras, escolinhas, equipamentos. O esporte transforma jovens e a verba já está na legislação.",
                  lei: "Lei de Incentivo ao Esporte (Lei 11.438/06)", impacto: "Até 2% do IR da empresa"
                },
                {
                  icon: GraduationCap, titulo: "Educação", cor: "bg-blue-100 text-blue-700",
                  desc: "Bolsas, cursos técnicos, capacitação profissional. Empresas podem financiar educação local com incentivos federais e estaduais.",
                  lei: "FNDE + Incentivos Estaduais", impacto: "Dedução via ICMS + IR"
                },
                {
                  icon: TreePine, titulo: "Meio Ambiente", cor: "bg-teal-100 text-teal-700",
                  desc: "Preservação da serra fluminense, reflorestamento, sustentabilidade. O ICMS Ecológico já existe — Nova Friburgo precisa captar.",
                  lei: "ICMS Ecológico + Lei 12.305", impacto: "Repasse maior de ICMS"
                },
              ].map((p, i) => (
                <div key={i} className="p-4 bg-[var(--bg-paper)] rounded-xl border border-[var(--border)]">
                  <div className={`w-10 h-10 rounded-xl ${p.cor} flex items-center justify-center mb-3`}>
                    <p.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-[var(--primary)] mb-2">{p.titulo}</h4>
                  <p className="text-[var(--primary)]/60 text-sm leading-relaxed mb-3">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white border border-[var(--border)] text-[var(--primary)]/50 px-2 py-0.5 rounded-full text-xs font-ui">{p.lei}</span>
                    <span className="bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] px-2 py-0.5 rounded-full text-xs font-ui font-semibold">{p.impacto}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUTRAS BANDEIRAS */}
        <section className="mb-12 print:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center shrink-0">
              <Star className="w-4 h-4 text-[var(--primary)]" />
            </div>
            <h2 className="font-display text-2xl font-bold text-[var(--primary)]">
              Outras Bandeiras na Câmara Federal
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: Users, titulo: "Defesa da Região Serrana",
                desc: "Levar as demandas específicas da Região Serrana Fluminense ao Congresso Nacional. Nova Friburgo, Teresópolis, Petrópolis e toda a serra têm necessidades únicas que precisam de representação federal forte: prevenção de desastres naturais, infraestrutura de montanha, turismo de serra e agronegócio familiar.",
                destaque: "Região Serrana no mapa federal"
              },
              {
                icon: Heart, titulo: "Saúde Pública e UPA",
                desc: "Marcos foi um dos responsáveis pela conquista da UPA de Nova Friburgo. Na Câmara Federal, vai lutar por mais recursos do SUS para municípios de médio porte, ampliação de leitos hospitalares e fortalecimento da atenção básica na região serrana.",
                destaque: "Mais saúde para o interior do RJ"
              },
              {
                icon: GraduationCap, titulo: "Educação Superior Acessível",
                desc: "Marcos ajudou a trazer a Estácio para Nova Friburgo. Na Câmara, vai defender a expansão do ensino superior público e privado no interior, com foco em cursos técnicos e tecnológicos alinhados com as vocações econômicas locais: moda íntima, turismo, agro e tecnologia.",
                destaque: "Ensino superior no interior"
              },
              {
                icon: Zap, titulo: "Infraestrutura e Desenvolvimento Regional",
                desc: "Captação de emendas parlamentares para obras de infraestrutura em Nova Friburgo e região: pavimentação, saneamento básico, iluminação pública, prevenção de enchentes e deslizamentos. Marcos conhece cada bairro e sabe onde o dinheiro faz diferença.",
                destaque: "Emendas para Nova Friburgo"
              },
              {
                icon: Globe, titulo: "Comunicação Comunitária e Liberdade de Imprensa",
                desc: "Como jornalista e criador da TV do Povo, Marcos vai defender na Câmara o fortalecimento da comunicação comunitária, o acesso à internet de qualidade no interior e a liberdade de imprensa. A voz do povo precisa ser ouvida.",
                destaque: "Comunicação para todos"
              },
              {
                icon: TreePine, titulo: "Preservação da Serra Fluminense",
                desc: "Nova Friburgo está no coração da Mata Atlântica. Marcos vai lutar por recursos federais para preservação ambiental, reflorestamento, ecoturismo sustentável e prevenção de desastres climáticos na região serrana — uma das mais vulneráveis do Brasil.",
                destaque: "Meio ambiente e prevenção"
              },
            ].map((b, i) => (
              <div key={i} className="bg-white rounded-2xl print:rounded-none border border-[var(--border)] p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                    <b.icon className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-display text-lg font-bold text-[var(--primary)]">{b.titulo}</h3>
                      <span className="bg-[var(--accent)]/10 text-[var(--accent)] px-2 py-0.5 rounded-full text-xs font-ui font-semibold">
                        {b.destaque}
                      </span>
                    </div>
                    <p className="text-[var(--primary)]/65 leading-relaxed text-sm">{b.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COMPARATIVO */}
        <section className="mb-12 print:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4 text-[var(--primary)]" />
            </div>
            <h2 className="font-display text-2xl font-bold text-[var(--primary)]">
              Hoje vs. Com Marcos na Câmara
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-200 rounded-2xl print:rounded-none p-6">
              <h3 className="font-display text-lg font-bold text-red-700 mb-4">SEM REPRESENTAÇÃO FORTE</h3>
              {[
                "Imposto das empresas vai embora e não volta",
                "Nova Friburgo sem voz no Congresso",
                "Projetos locais sem financiamento federal",
                "Região Serrana ignorada em Brasília",
                "R$ 0 captado via incentivos fiscais",
                "Emendas parlamentares para outros municípios",
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-2 mb-2 text-red-800 text-sm">
                  <span className="text-red-500 mt-0.5 shrink-0">✗</span><p>{t}</p>
                </div>
              ))}
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl print:rounded-none p-6">
              <h3 className="font-display text-lg font-bold text-green-700 mb-4">COM MARCOS MEDEIROS</h3>
              {[
                "Lei federal obriga banco de dados de incentivos",
                "Nova Friburgo com voz ativa no Congresso",
                "Projetos locais captam recursos federais",
                "Região Serrana com representação forte",
                "Milhões em incentivos ficam no município",
                "Emendas direcionadas para Nova Friburgo",
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-2 mb-2 text-green-800 text-sm">
                  <span className="text-green-600 mt-0.5 shrink-0">✓</span><p>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRAJETÓRIA */}
        <section className="mb-12 print:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 text-[var(--primary)]" />
            </div>
            <h2 className="font-display text-2xl font-bold text-[var(--primary)]">
              Trajetória — Por que Marcos tem credibilidade
            </h2>
          </div>
          <div className="bg-white rounded-2xl print:rounded-none border border-[var(--border)] p-6 md:p-8">
            <div className="space-y-4">
              {[
                { ano: "2008", titulo: "Recorde histórico de votos", desc: "Eleito vereador com 5.550 votos — o maior número da história de Nova Friburgo, recorde que nunca foi superado." },
                { ano: "2009–2012", titulo: "Mandato mais produtivo da história", desc: "7.919 matérias legislativas em um único mandato: 1.647 projetos de lei, requerimentos, indicações e moções." },
                { ano: "2010", titulo: "Conquista da UPA de Nova Friburgo", desc: "Marcos lutou e conseguiu a Unidade de Pronto Atendimento para a cidade — saúde de qualidade para o povo." },
                { ano: "2011", titulo: "Ensino superior em Friburgo", desc: "Trabalhou para trazer a Estácio de Sá para Nova Friburgo — educação superior acessível para os friburguenses." },
                { ano: "Contínuo", titulo: "TV do Povo — 3.575+ programas", desc: "Criou e apresenta o maior canal de comunicação comunitária da Região Serrana. Voz do povo, todo dia." },
                { ano: "2026", titulo: "Deputado Federal pelo DC 27", desc: "Leva a experiência, o histórico e o amor por Nova Friburgo para o Congresso Nacional." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-20 shrink-0 text-right">
                    <span className="font-ui text-xs font-bold text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-1 rounded-full">{item.ano}</span>
                  </div>
                  <div className="flex-1 pb-4 border-b border-[var(--border)] last:border-0">
                    <h4 className="font-ui font-semibold text-[var(--primary)] text-sm mb-1">{item.titulo}</h4>
                    <p className="text-[var(--primary)]/55 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPROMISSO */}
        <section className="mb-12 print:mb-8">
          <div className="bg-[var(--primary)] text-white rounded-2xl print:rounded-none p-8 text-center">
            <Scale className="w-12 h-12 text-[var(--accent)] mx-auto mb-4" />
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              O Compromisso de Marcos Medeiros
            </h2>
            <blockquote className="font-display text-xl italic text-[var(--accent)] mb-6 max-w-2xl mx-auto">
              "O dinheiro já existe. Ele só precisa ficar em Friburgo."
            </blockquote>
            <p className="text-white/70 leading-relaxed max-w-2xl mx-auto font-ui mb-6">
              Marcos Medeiros não vai para Brasília para se perder nos corredores do poder.
              Vai com uma missão clara: criar a lei que faz o dinheiro dos impostos ficar em Nova Friburgo,
              captar emendas para a Região Serrana e dar voz ao povo que sempre o elegeu.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="bg-[var(--accent)]/20 border border-[var(--accent)]/30 text-[var(--accent)] px-4 py-2 rounded-full font-ui text-sm font-semibold">
                DC 27 — Democracia Cristã
              </span>
              <span className="bg-white/10 border border-white/20 text-white/70 px-4 py-2 rounded-full font-ui text-sm">
                Nova Friburgo, RJ
              </span>
              <span className="bg-white/10 border border-white/20 text-white/70 px-4 py-2 rounded-full font-ui text-sm">
                Eleições 2026
              </span>
            </div>
          </div>
        </section>

        {/* RODAPÉ DO DOCUMENTO */}
        <div className="border-t-2 border-[var(--accent)] pt-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="w-4 h-4 text-[var(--accent)]" />
            <span className="font-ui text-sm text-[var(--primary)]/50">Nova Friburgo, RJ — 2026</span>
          </div>
          <p className="font-ui text-xs text-[var(--primary)]/30 mb-6">
            Fontes: IBGE (2023/2024), SAPL Câmara Municipal de Nova Friburgo, Ministério da Cultura,
            Secretaria de Esporte, Receita Federal. Proposta sujeita a ajustes conforme tramitação legislativa.
          </p>

          {/* CTAs — não imprime */}
          <div className="print:hidden flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/5522998954874?text=Quero%20apoiar%20o%20Marcos%20Medeiros%20para%20Deputado%20Federal!" target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-ui font-bold transition-all">
              <MessageCircle className="w-5 h-5" /> Apoiar Marcos
            </a>
            <Link href="/apoiar"
              className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] px-6 py-3 rounded-full font-ui font-bold transition-all">
              <Users className="w-5 h-5" /> Ser Voluntário
            </Link>
            <button onClick={handleShare}
              className="inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-med)] text-white px-6 py-3 rounded-full font-ui font-semibold transition-all">
              <Share2 className="w-5 h-5" /> Compartilhar Documento
            </button>
          </div>
        </div>
      </div>

      {/* Estilos de impressão */}
      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
          @page { margin: 2cm; }
        }
      `}</style>
    </div>
  );
}
