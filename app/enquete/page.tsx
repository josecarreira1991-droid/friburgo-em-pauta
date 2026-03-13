"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3, CheckCircle, Share2, MessageCircle,
  Heart, Dumbbell, GraduationCap, TreePine, Zap,
  Shield, Bus, Building2, Droplets, Users, ArrowRight, Loader2
} from "lucide-react";
import Link from "next/link";

const TEMAS = [
  { id: "saude", icon: Heart, label: "Saúde", desc: "UPA, postos de saúde, médicos", cor: "from-red-500 to-rose-500" },
  { id: "educacao", icon: GraduationCap, label: "Educação", desc: "Escolas, creches, bolsas", cor: "from-blue-500 to-cyan-500" },
  { id: "seguranca", icon: Shield, label: "Segurança", desc: "Policiamento, iluminação", cor: "from-slate-500 to-gray-500" },
  { id: "infraestrutura", icon: Building2, label: "Infraestrutura", desc: "Ruas, buracos, obras", cor: "from-orange-500 to-amber-500" },
  { id: "esporte", icon: Dumbbell, label: "Esporte", desc: "Quadras, campos, escolinhas", cor: "from-green-500 to-emerald-500" },
  { id: "cultura", icon: Zap, label: "Cultura", desc: "Festivais, teatro, música", cor: "from-purple-500 to-pink-500" },
  { id: "meio_ambiente", icon: TreePine, label: "Meio Ambiente", desc: "Serra, rios, lixo", cor: "from-teal-500 to-green-500" },
  { id: "transporte", icon: Bus, label: "Transporte", desc: "Ônibus, estradas, mobilidade", cor: "from-yellow-500 to-orange-500" },
  { id: "saneamento", icon: Droplets, label: "Saneamento", desc: "Água, esgoto, enchentes", cor: "from-sky-500 to-blue-500" },
  { id: "emprego", icon: Users, label: "Emprego", desc: "Geração de renda, capacitação", cor: "from-indigo-500 to-violet-500" },
];

const VOTOS_INICIAIS: Record<string, number> = {
  saude: 847, educacao: 623, seguranca: 589, infraestrutura: 712,
  esporte: 234, cultura: 198, meio_ambiente: 445, transporte: 378,
  saneamento: 312, emprego: 534,
};

export default function EnquetePage() {
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [votado, setVotado] = useState(false);
  const [votos, setVotos] = useState(VOTOS_INICIAIS);
  const [form, setForm] = useState({ nome: "", whatsapp: "", bairro: "" });
  const [salvando, setSalvando] = useState(false);
  const [carregando, setCarregando] = useState(true);

  // Carrega votos reais da API
  useEffect(() => {
    fetch("/api/vote")
      .then(r => r.json())
      .then((data: Record<string, number>) => {
        if (data && typeof data === "object") setVotos(data);
      })
      .catch(() => {})
      .finally(() => setCarregando(false));

    // Verifica se já votou nesta sessão
    if (typeof window !== "undefined") {
      const jaVotou = sessionStorage.getItem("enquete_votado");
      if (jaVotou === "true") setVotado(true);
    }
  }, []);

  const totalVotos = Object.values(votos).reduce((a, b) => a + b, 0);

  function toggleTema(id: string) {
    if (votado) return;
    setSelecionados(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  }

  async function handleVotar(e: React.FormEvent) {
    e.preventDefault();
    if (selecionados.length === 0) return;
    setSalvando(true);

    try {
      // Salva votos na API com persistência
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ temas: selecionados }),
      });
      const data = await res.json() as { votos?: Record<string, number> };
      if (data.votos) setVotos(data.votos);
    } catch {
      // Fallback: atualiza localmente
      const novosVotos = { ...votos };
      selecionados.forEach(id => { novosVotos[id] = (novosVotos[id] || 0) + 1; });
      setVotos(novosVotos);
    }

    // Salva lead se forneceu dados
    if (form.whatsapp || form.nome) {
      try {
        await fetch("/api/newsletter-subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: form.nome,
            whatsapp: form.whatsapp,
            bairro: form.bairro,
            origem: `enquete:${selecionados.join(",")}`,
          }),
        });
      } catch {}
    }

    setVotado(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("enquete_votado", "true");
    }
    setSalvando(false);
  }

  const ranking = [...TEMAS]
    .map(t => ({ ...t, votos: votos[t.id] || 0 }))
    .sort((a, b) => b.votos - a.votos);

  const maxVotos = Math.max(...ranking.map(r => r.votos));

  const shareText = `Votei na enquete do Marcos Medeiros! Minha prioridade para Nova Friburgo: ${selecionados.map(id => TEMAS.find(t => t.id === id)?.label).join(", ")}. Vote você também: http://187.77.210.204:3080/enquete`;

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <section className="bg-hero-gradient py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--accent)]/20 border border-[var(--accent)]/30 rounded-full px-4 py-1.5 mb-6">
            <BarChart3 className="w-4 h-4 text-[var(--accent)]" aria-hidden="true" />
            <span className="text-[var(--accent)] text-sm font-ui font-medium">Sua opinião define as prioridades</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6">
            O que mais precisa<br /><span className="text-[var(--accent)]">mudar em Friburgo?</span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Marcos Medeiros quer saber o que o povo prioriza. Vote e veja o que Nova Friburgo pensa. Suas respostas moldam o plano de governo.
          </p>
          {!carregando && (
            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Users className="w-4 h-4 text-[var(--accent)]" aria-hidden="true" />
              <span className="text-white text-sm font-ui">
                <strong className="text-[var(--accent)]">{totalVotos.toLocaleString("pt-BR")}</strong> votos registrados
              </span>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {!votado ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleVotar}
            >
              {/* Seleção de temas */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-display font-bold text-[var(--foreground)]">
                    Escolha até 3 prioridades
                  </h2>
                  <span className="text-sm text-[var(--muted)] font-ui bg-[var(--surface)] px-3 py-1 rounded-full">
                    {selecionados.length}/3 selecionados
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="group" aria-label="Selecione suas prioridades">
                  {TEMAS.map(tema => {
                    const Icon = tema.icon;
                    const sel = selecionados.includes(tema.id);
                    const disabled = !sel && selecionados.length >= 3;
                    return (
                      <button
                        key={tema.id}
                        type="button"
                        onClick={() => toggleTema(tema.id)}
                        disabled={disabled}
                        aria-pressed={sel}
                        aria-label={`${tema.label}: ${tema.desc}`}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                          sel
                            ? "border-[var(--accent)] bg-[var(--accent)]/10 shadow-md"
                            : disabled
                            ? "border-[var(--border)] bg-[var(--surface)] opacity-40 cursor-not-allowed"
                            : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/50 hover:shadow-sm cursor-pointer"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tema.cor} flex items-center justify-center shrink-0`}>
                          <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-ui font-semibold text-[var(--foreground)] text-sm">{tema.label}</p>
                          <p className="text-[var(--muted)] text-xs truncate">{tema.desc}</p>
                        </div>
                        {sel && <CheckCircle className="w-5 h-5 text-[var(--accent)] ml-auto shrink-0" aria-hidden="true" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dados opcionais */}
              {selecionados.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 mb-6"
                >
                  <h3 className="font-display font-bold text-[var(--foreground)] mb-1">Deixe seu contato (opcional)</h3>
                  <p className="text-[var(--muted)] text-sm mb-4">Marcos vai te avisar quando sua prioridade virar projeto de lei.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="enquete-nome" className="block text-sm font-ui font-medium text-[var(--foreground)] mb-1">Nome</label>
                      <input
                        id="enquete-nome"
                        type="text"
                        placeholder="Seu nome"
                        value={form.nome}
                        onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="enquete-whatsapp" className="block text-sm font-ui font-medium text-[var(--foreground)] mb-1">WhatsApp</label>
                      <input
                        id="enquete-whatsapp"
                        type="tel"
                        placeholder="(22) 99999-0000"
                        value={form.whatsapp}
                        onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="enquete-bairro" className="block text-sm font-ui font-medium text-[var(--foreground)] mb-1">Bairro</label>
                      <input
                        id="enquete-bairro"
                        type="text"
                        placeholder="Seu bairro em Nova Friburgo"
                        value={form.bairro}
                        onChange={e => setForm(f => ({ ...f, bairro: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={selecionados.length === 0 || salvando}
                aria-disabled={selecionados.length === 0 || salvando}
                className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--primary)] font-ui font-bold py-4 rounded-2xl text-lg transition-all flex items-center justify-center gap-3"
              >
                {salvando ? (
                  <><Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> Registrando seu voto...</>
                ) : (
                  <><BarChart3 className="w-5 h-5" aria-hidden="true" /> Votar e Ver Resultado</>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="resultado"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Confirmação */}
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-display font-bold text-[var(--foreground)] mb-2">Voto registrado!</h2>
                <p className="text-[var(--muted)]">Obrigado por participar. Veja o que Nova Friburgo pensa.</p>
              </div>

              {/* Ranking */}
              <div className="mb-8">
                <h3 className="text-lg font-display font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[var(--accent)]" aria-hidden="true" />
                  Ranking de Prioridades — Nova Friburgo
                </h3>
                <div className="space-y-3" role="list" aria-label="Ranking de prioridades">
                  {ranking.map((tema, i) => {
                    const Icon = tema.icon;
                    const pct = maxVotos > 0 ? Math.round((tema.votos / maxVotos) * 100) : 0;
                    const meuVoto = selecionados.includes(tema.id);
                    return (
                      <div key={tema.id} className="flex items-center gap-4" role="listitem">
                        <span className="w-6 text-center text-sm font-ui font-bold text-[var(--muted)]" aria-label={`Posição ${i + 1}`}>{i + 1}</span>
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tema.cor} flex items-center justify-center shrink-0`}>
                          <Icon className="w-4 h-4 text-white" aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-ui font-semibold text-[var(--foreground)] flex items-center gap-2">
                              {tema.label}
                              {meuVoto && <span className="text-xs bg-[var(--accent)]/20 text-[var(--accent)] px-2 py-0.5 rounded-full">seu voto</span>}
                            </span>
                            <span className="text-xs text-[var(--muted)] font-ui">{tema.votos.toLocaleString("pt-BR")} votos</span>
                          </div>
                          <div className="w-full bg-[var(--border)] rounded-full h-2" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${pct}% dos votos`}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.8, delay: i * 0.05 }}
                              className={`h-2 rounded-full bg-gradient-to-r ${tema.cor}`}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Compartilhar */}
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 text-center">
                <h3 className="font-display font-bold text-[var(--foreground)] mb-2">Compartilhe e convide amigos</h3>
                <p className="text-[var(--muted)] text-sm mb-4">Quanto mais pessoas votarem, mais forte fica a voz de Nova Friburgo.</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Compartilhar no WhatsApp"
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-ui font-semibold text-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" /> WhatsApp
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Compartilhar no X/Twitter"
                    className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2.5 rounded-xl font-ui font-semibold text-sm transition-all"
                  >
                    <Share2 className="w-4 h-4" aria-hidden="true" /> X/Twitter
                  </a>
                  <Link
                    href="/apoiar"
                    className="flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] px-4 py-2.5 rounded-xl font-ui font-semibold text-sm transition-all"
                  >
                    <ArrowRight className="w-4 h-4" aria-hidden="true" /> Apoiar o Marcos
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
