"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3, CheckCircle, Share2, MessageCircle,
  Heart, Dumbbell, GraduationCap, TreePine, Zap,
  Shield, Bus, Building2, Droplets, Users, ArrowRight
} from "lucide-react";

const TEMAS = [
  { id: "saude", icon: Heart, label: "Saúde", desc: "UPA, postos de saúde, médicos", cor: "from-red-500 to-rose-500", votos: 0 },
  { id: "educacao", icon: GraduationCap, label: "Educação", desc: "Escolas, creches, bolsas", cor: "from-blue-500 to-cyan-500", votos: 0 },
  { id: "seguranca", icon: Shield, label: "Segurança", desc: "Policiamento, iluminação", cor: "from-slate-500 to-gray-500", votos: 0 },
  { id: "infraestrutura", icon: Building2, label: "Infraestrutura", desc: "Ruas, buracos, obras", cor: "from-orange-500 to-amber-500", votos: 0 },
  { id: "esporte", icon: Dumbbell, label: "Esporte", desc: "Quadras, campos, escolinhas", cor: "from-green-500 to-emerald-500", votos: 0 },
  { id: "cultura", icon: Zap, label: "Cultura", desc: "Festivais, teatro, música", cor: "from-purple-500 to-pink-500", votos: 0 },
  { id: "meio_ambiente", icon: TreePine, label: "Meio Ambiente", desc: "Serra, rios, lixo", cor: "from-teal-500 to-green-500", votos: 0 },
  { id: "transporte", icon: Bus, label: "Transporte", desc: "Ônibus, estradas, mobilidade", cor: "from-yellow-500 to-orange-500", votos: 0 },
  { id: "saneamento", icon: Droplets, label: "Saneamento", desc: "Água, esgoto, enchentes", cor: "from-sky-500 to-blue-500", votos: 0 },
  { id: "emprego", icon: Users, label: "Emprego", desc: "Geração de renda, capacitação", cor: "from-indigo-500 to-violet-500", votos: 0 },
];

// Votos simulados para dar senso de comunidade
const VOTOS_BASE: Record<string, number> = {
  saude: 847, educacao: 623, seguranca: 589, infraestrutura: 712,
  esporte: 234, cultura: 198, meio_ambiente: 445, transporte: 378,
  saneamento: 312, emprego: 534,
};

export default function EnquetePage() {
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [votado, setVotado] = useState(false);
  const [votos, setVotos] = useState(VOTOS_BASE);
  const [form, setForm] = useState({ nome: "", whatsapp: "", bairro: "" });
  const [salvando, setSalvando] = useState(false);

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

    // Atualiza votos localmente
    const novosVotos = { ...votos };
    selecionados.forEach(id => { novosVotos[id] = (novosVotos[id] || 0) + 1; });
    setVotos(novosVotos);
    setVotado(true);

    // Salva lead
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
    setSalvando(false);
  }

  const ranking = [...TEMAS]
    .map(t => ({ ...t, votos: votos[t.id] || 0 }))
    .sort((a, b) => b.votos - a.votos);

  const maxVotos = Math.max(...ranking.map(r => r.votos));

  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      {/* Hero */}
      <section className="bg-[var(--primary)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-[var(--accent)]/20 border border-[var(--accent)]/30 rounded-full px-4 py-1.5 mb-6">
              <BarChart3 className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-[var(--accent)] text-sm font-ui font-medium">Sua opinião define as prioridades</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-4">
              O que mais precisa<br /><span className="text-[var(--accent)]">mudar em Friburgo?</span>
            </h1>
            <p className="text-white/60 font-ui text-lg max-w-2xl mx-auto">
              Marcos Medeiros quer saber o que o povo prioriza. Vote e veja o que Nova Friburgo pensa.
              Suas respostas moldam o plano de governo.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {!votado ? (
          <form onSubmit={handleVotar}>
            {/* Seleção de temas */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-2xl font-bold text-[var(--primary)]">
                  Escolha até 3 prioridades
                </h2>
                <span className="font-ui text-sm text-[var(--primary)]/40">
                  {selecionados.length}/3 selecionados
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {TEMAS.map((tema) => {
                  const selecionado = selecionados.includes(tema.id);
                  const bloqueado = !selecionado && selecionados.length >= 3;
                  return (
                    <motion.button key={tema.id} type="button"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleTema(tema.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selecionado
                          ? "border-[var(--accent)] bg-[var(--accent)]/10 shadow-md"
                          : bloqueado
                          ? "border-[var(--border)] bg-white opacity-40 cursor-not-allowed"
                          : "border-[var(--border)] bg-white hover:border-[var(--accent)]/50 hover:shadow-sm"
                      }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tema.cor} flex items-center justify-center shrink-0`}>
                          <tema.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-ui font-semibold text-[var(--primary)] text-sm">{tema.label}</p>
                          <p className="font-ui text-[var(--primary)]/40 text-xs">{tema.desc}</p>
                        </div>
                        {selecionado && <CheckCircle className="w-5 h-5 text-[var(--accent)] shrink-0" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Dados para contato */}
            {selecionados.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-[var(--border)] p-6 mb-6 space-y-4">
                <h3 className="font-display text-lg font-bold text-[var(--primary)]">
                  Deixe seu contato para receber as novidades
                </h3>
                <p className="text-[var(--primary)]/50 font-ui text-sm">Opcional, mas o Marcos vai adorar te responder!</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider">Nome</label>
                    <input type="text" placeholder="Seu nome"
                      value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })}
                      className="w-full mt-1 px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider">WhatsApp</label>
                    <input type="tel" placeholder="(22) 99999-0000"
                      value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })}
                      className="w-full mt-1 px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider">Bairro</label>
                    <input type="text" placeholder="Seu bairro"
                      value={form.bairro} onChange={e => setForm({ ...form, bairro: e.target.value })}
                      className="w-full mt-1 px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors" />
                  </div>
                </div>
              </motion.div>
            )}

            {selecionados.length > 0 && (
              <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                type="submit" disabled={salvando}
                className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] py-4 rounded-2xl font-ui font-bold text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg">
                {salvando ? "Registrando..." : <><BarChart3 className="w-5 h-5" /> Votar e Ver Resultado</>}
              </motion.button>
            )}
          </form>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Resultado */}
            <div className="bg-[var(--primary)] text-white rounded-2xl p-6 mb-8 text-center">
              <CheckCircle className="w-12 h-12 text-[var(--accent)] mx-auto mb-3" />
              <h2 className="font-display text-2xl font-bold mb-1">Voto registrado!</h2>
              <p className="text-white/60 font-ui text-sm">
                {totalVotos.toLocaleString("pt-BR")} friburguenses já votaram. Veja as prioridades da cidade:
              </p>
            </div>

            <h2 className="font-display text-2xl font-bold text-[var(--primary)] mb-6">
              Ranking de Prioridades — Nova Friburgo
            </h2>

            <div className="space-y-3 mb-8">
              {ranking.map((tema, i) => {
                const pct = maxVotos > 0 ? Math.round((tema.votos / maxVotos) * 100) : 0;
                const meuVoto = selecionados.includes(tema.id);
                return (
                  <motion.div key={tema.id}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`bg-white rounded-xl border-2 p-4 ${meuVoto ? "border-[var(--accent)]" : "border-[var(--border)]"}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-display text-lg font-black text-[var(--primary)]/30 w-6 text-center">
                        {i + 1}
                      </span>
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tema.cor} flex items-center justify-center shrink-0`}>
                        <tema.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-ui font-semibold text-[var(--primary)] text-sm">
                            {tema.label}
                            {meuVoto && <span className="ml-2 text-[var(--accent)] text-xs">✓ Seu voto</span>}
                          </span>
                          <span className="font-ui text-xs text-[var(--primary)]/40">
                            {tema.votos.toLocaleString("pt-BR")} votos
                          </span>
                        </div>
                        <div className="mt-1.5 h-2 bg-[var(--bg-paper)] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8, delay: i * 0.05 }}
                            className={`h-full rounded-full bg-gradient-to-r ${tema.cor}`}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => {
                const text = `Votei na enquete do Marcos Medeiros! ${selecionados.map(id => TEMAS.find(t => t.id === id)?.label).join(", ")} são minhas prioridades para Nova Friburgo. Vote você também: ${window.location.href}`;
                if (navigator.share) navigator.share({ title: "Enquete — Friburgo em Pauta", text, url: window.location.href });
                else navigator.clipboard.writeText(window.location.href).then(() => alert("Link copiado!"));
              }}
                className="flex-1 flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] py-3 rounded-xl font-ui font-bold transition-all">
                <Share2 className="w-5 h-5" /> Compartilhar Resultado
              </button>
              <a href="/apoiar"
                className="flex-1 flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-med)] text-white py-3 rounded-xl font-ui font-semibold transition-all">
                <Heart className="w-5 h-5" /> Apoiar Marcos Medeiros
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
