"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart, Users, Megaphone, Share2, MessageCircle,
  CheckCircle, Loader2, Star, Award, Zap, Globe,
  Phone, Mail, MapPin, ChevronDown
} from "lucide-react";

const FORMAS_APOIO = [
  { id: "voluntario", emoji: "🤝", titulo: "Ser Voluntário", desc: "Ajudar nas atividades de campanha, distribuição de material, eventos" },
  { id: "divulgador", emoji: "📢", titulo: "Divulgador Digital", desc: "Compartilhar conteúdo nas redes sociais, grupos de WhatsApp" },
  { id: "lideranca", emoji: "⭐", titulo: "Liderança de Bairro", desc: "Ser o ponto de contato do Marcos no seu bairro ou comunidade" },
  { id: "empresario", emoji: "🏢", titulo: "Empresário Apoiador", desc: "Apoiar a proposta de incentivos fiscais e divulgar para outros empresários" },
  { id: "doador", emoji: "💛", titulo: "Apoio Financeiro", desc: "Contribuir com a campanha dentro dos limites legais eleitorais" },
  { id: "imprensa", emoji: "📰", titulo: "Imprensa / Comunicação", desc: "Jornalistas, fotógrafos, criadores de conteúdo que queiram colaborar" },
];

const BAIRROS_NF = [
  "Centro", "Olaria", "Conselheiro Paulino", "Cônego", "Duas Pedras",
  "Prado", "São Geraldo", "Mury", "Riograndina", "Amparo",
  "Quarteirão Brasileiro", "Quarteirão Ingles", "Bom Jardim",
  "Lumiar", "São Pedro da Serra", "Outro bairro"
];

export default function ApoiarPage() {
  const [form, setForm] = useState({
    nome: "", whatsapp: "", email: "", bairro: "",
    profissao: "", formas: [] as string[], mensagem: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function toggleForma(id: string) {
    setForm(prev => ({
      ...prev,
      formas: prev.formas.includes(id)
        ? prev.formas.filter(f => f !== id)
        : [...prev.formas, id]
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          whatsapp: form.whatsapp,
          bairro: form.bairro,
          origem: `apoio:${form.formas.join(",")}|profissao:${form.profissao}`,
        }),
      });
      // Também envia mensagem para equipe
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          whatsapp: form.whatsapp,
          mensagem: `[NOVO APOIADOR]\nBairro: ${form.bairro}\nProfissão: ${form.profissao}\nFormas de apoio: ${form.formas.join(", ")}\nMensagem: ${form.mensagem || "Nenhuma"}`,
        }),
      });
      setStatus("success");
    } catch {
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[var(--bg-light)] flex items-center justify-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="max-w-lg w-full bg-white rounded-3xl border border-[var(--border)] p-10 text-center shadow-xl">
          <div className="w-20 h-20 rounded-full bg-[var(--accent)]/20 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-[var(--accent)]" />
          </div>
          <h2 className="font-display text-3xl font-bold text-[var(--primary)] mb-3">Bem-vindo ao time!</h2>
          <p className="text-[var(--primary)]/60 font-ui mb-2">
            <strong>{form.nome}</strong>, você agora faz parte do movimento que vai levar Nova Friburgo para Brasília.
          </p>
          <p className="text-[var(--primary)]/40 font-ui text-sm mb-8">
            Marcos vai entrar em contato pelo WhatsApp em breve.
          </p>
          <div className="bg-[var(--bg-paper)] rounded-2xl p-4 mb-6 text-left">
            <p className="font-ui text-xs text-[var(--primary)]/40 uppercase tracking-wider mb-2">Seu cadastro</p>
            <p className="font-ui font-semibold text-[var(--primary)] text-sm">{form.bairro} · {form.profissao}</p>
            <p className="font-ui text-[var(--primary)]/50 text-xs mt-1">
              {form.formas.map(f => FORMAS_APOIO.find(fa => fa.id === f)?.titulo).join(" · ")}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => {
              const text = `Acabei de me cadastrar para apoiar o Marcos Medeiros para Deputado Federal! Você também pode apoiar: ${window.location.href}`;
              if (navigator.share) navigator.share({ title: "Apoie o Marcos Medeiros", text, url: window.location.href });
              else navigator.clipboard.writeText(window.location.href).then(() => alert("Link copiado!"));
            }}
              className="flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] py-3 rounded-xl font-ui font-bold transition-all">
              <Share2 className="w-5 h-5" /> Compartilhar — Chame mais pessoas
            </button>
            <a href="https://wa.me/5522998954874?text=Ol%C3%A1%20Marcos%2C%20me%20cadastrei%20para%20apoiar%20sua%20candidatura!" target="_blank" rel="noopener"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-ui font-semibold transition-all">
              <MessageCircle className="w-5 h-5" /> Falar com Marcos no WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      {/* Hero */}
      <section className="bg-[var(--primary)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-[var(--accent)]/20 border border-[var(--accent)]/30 rounded-full px-4 py-1.5 mb-6">
              <Heart className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-[var(--accent)] text-sm font-ui font-medium">Faça parte do movimento</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-4">
              Apoie Marcos Medeiros<br /><span className="text-[var(--accent)]">para Deputado Federal</span>
            </h1>
            <p className="text-white/60 font-ui text-lg max-w-2xl mx-auto">
              Nova Friburgo precisa de representação forte em Brasília. Cadastre-se e faça parte
              do time que vai mudar o futuro da nossa cidade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Números de apoio */}
      <section className="bg-[var(--accent)] py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { v: "5.550", l: "Votos em 2008 — Recorde" },
              { v: "3.575+", l: "Programas TV do Povo" },
              { v: "DC 27", l: "Democracia Cristã" },
            ].map((d, i) => (
              <div key={i}>
                <p className="font-display text-2xl md:text-3xl font-black text-[var(--primary)]">{d.v}</p>
                <p className="font-ui text-xs text-[var(--primary)]/60 mt-0.5">{d.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Como quer apoiar */}
          <div>
            <h2 className="font-display text-2xl font-bold text-[var(--primary)] mb-2">Como você quer apoiar?</h2>
            <p className="text-[var(--primary)]/50 font-ui text-sm mb-6">Selecione uma ou mais formas de apoio</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {FORMAS_APOIO.map((forma) => (
                <button key={forma.id} type="button"
                  onClick={() => toggleForma(forma.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    form.formas.includes(forma.id)
                      ? "border-[var(--accent)] bg-[var(--accent)]/10"
                      : "border-[var(--border)] bg-white hover:border-[var(--accent)]/50"
                  }`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{forma.emoji}</span>
                    <div>
                      <p className="font-ui font-semibold text-[var(--primary)] text-sm">{forma.titulo}</p>
                      <p className="font-ui text-[var(--primary)]/40 text-xs mt-0.5 leading-snug">{forma.desc}</p>
                    </div>
                    {form.formas.includes(forma.id) && (
                      <CheckCircle className="w-5 h-5 text-[var(--accent)] ml-auto shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Dados pessoais */}
          <div className="bg-white rounded-2xl border border-[var(--border)] p-6 space-y-4">
            <h2 className="font-display text-xl font-bold text-[var(--primary)]">Seus dados</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider">Nome completo *</label>
                <input type="text" required placeholder="Seu nome"
                  value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors" />
              </div>
              <div>
                <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider flex items-center gap-1">
                  <Phone className="w-3 h-3" /> WhatsApp *
                </label>
                <input type="tel" required placeholder="(22) 99999-0000"
                  value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors" />
              </div>
              <div>
                <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider flex items-center gap-1">
                  <Mail className="w-3 h-3" /> Email
                </label>
                <input type="email" placeholder="seu@email.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors" />
              </div>
              <div>
                <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Bairro *
                </label>
                <select required value={form.bairro} onChange={e => setForm({ ...form, bairro: e.target.value })}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors">
                  <option value="">Selecione seu bairro</option>
                  {BAIRROS_NF.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider">Profissão / Ocupação</label>
                <input type="text" placeholder="Ex: Comerciante, Professor, Estudante, Empresário..."
                  value={form.profissao} onChange={e => setForm({ ...form, profissao: e.target.value })}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider">Mensagem para o Marcos (opcional)</label>
                <textarea rows={3} placeholder="Conte por que quer apoiar, o que mais te preocupa em Nova Friburgo..."
                  value={form.mensagem} onChange={e => setForm({ ...form, mensagem: e.target.value })}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors resize-none" />
              </div>
            </div>
          </div>

          <button type="submit" disabled={status === "loading" || form.formas.length === 0}
            className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] py-4 rounded-2xl font-ui font-bold text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg hover:shadow-xl">
            {status === "loading" ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Cadastrando...</>
            ) : (
              <><Heart className="w-5 h-5" /> Quero Apoiar Marcos Medeiros</>
            )}
          </button>
          <p className="text-center text-xs text-[var(--primary)]/30 font-ui">
            Seus dados são usados exclusivamente para a campanha do Marcos Medeiros. Sem spam.
          </p>
        </form>
      </div>
    </div>
  );
}
