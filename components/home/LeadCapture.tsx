"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, CheckCircle, Loader2, MapPin, Briefcase, Heart, Share2, MessageCircle } from "lucide-react";

const INTERESSES = [
  { id: "proposta", label: "📋 Proposta Fiscal" },
  { id: "tv", label: "📺 TV do Povo" },
  { id: "denuncias", label: "🚨 Denúncias" },
  { id: "voluntario", label: "🤝 Ser Voluntário" },
  { id: "noticias", label: "📰 Notícias" },
  { id: "eventos", label: "📅 Eventos" },
];

export function LeadCapture() {
  const [form, setForm] = useState({
    nome: "", email: "", whatsapp: "", bairro: "",
    profissao: "", interesses: [] as string[]
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function toggleInteresse(id: string) {
    setForm(prev => ({
      ...prev,
      interesses: prev.interesses.includes(id)
        ? prev.interesses.filter(i => i !== id)
        : [...prev.interesses, id]
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
          origem: `newsletter|profissao:${form.profissao}|interesses:${form.interesses.join(",")}`,
        }),
      });
      setStatus("success");
    } catch {
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <section className="py-20 bg-[var(--accent)]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <CheckCircle className="w-16 h-16 text-[var(--primary)] mx-auto mb-4" />
          </motion.div>
          <h3 className="font-display text-3xl font-bold text-[var(--primary)]">Cadastro feito!</h3>
          <p className="text-[var(--primary)]/70 font-ui mt-2 mb-6">
            Você vai receber as novidades de Nova Friburgo direto no seu WhatsApp e email.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => {
              const text = `Acabei de me cadastrar no portal do Marcos Medeiros para Deputado Federal! Fique por dentro: ${window.location.origin}`;
              if (navigator.share) navigator.share({ title: "Friburgo em Pauta", text, url: window.location.origin });
              else navigator.clipboard.writeText(window.location.origin).then(() => alert("Link copiado!"));
            }}
              className="flex items-center gap-2 bg-[var(--primary)] text-white px-5 py-2.5 rounded-full font-ui font-semibold text-sm transition-all hover:bg-[var(--primary-med)]">
              <Share2 className="w-4 h-4" /> Compartilhar com amigos
            </button>
            <a href="https://wa.me/5522998954874?text=Ol%C3%A1%20Marcos%2C%20me%20cadastrei%20no%20portal!" target="_blank" rel="noopener"
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-full font-ui font-semibold text-sm transition-all hover:bg-green-700">
              <MessageCircle className="w-4 h-4" /> Falar com Marcos
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[var(--bg-paper)]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Fique por Dentro</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-[var(--primary)]">Receba as Novidades</h2>
          <p className="text-[var(--primary)]/60 font-ui mt-2">WhatsApp + Email — direto do Marcos pra você</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-[var(--border)] p-6 md:p-8 space-y-5 shadow-sm"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider">Nome *</label>
              <input
                type="text" required
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="w-full mt-1 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="Seu nome completo"
              />
            </div>
            <div>
              <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Bairro
              </label>
              <input
                type="text"
                value={form.bairro}
                onChange={(e) => setForm({ ...form, bairro: e.target.value })}
                className="w-full mt-1 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="Ex: Centro, Olaria..."
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider flex items-center gap-1">
              <Phone className="w-3 h-3" /> WhatsApp *
            </label>
            <input
              type="tel" required
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className="w-full mt-1 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors"
              placeholder="(22) 99999-0000"
            />
          </div>

          <div>
            <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider flex items-center gap-1">
              <Mail className="w-3 h-3" /> Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full mt-1 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider flex items-center gap-1">
              <Briefcase className="w-3 h-3" /> Profissão / Ocupação
            </label>
            <input
              type="text"
              value={form.profissao}
              onChange={(e) => setForm({ ...form, profissao: e.target.value })}
              className="w-full mt-1 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors"
              placeholder="Ex: Comerciante, Professor, Empresário..."
            />
          </div>

          <div>
            <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider flex items-center gap-1 mb-2">
              <Heart className="w-3 h-3" /> O que te interessa? (opcional)
            </label>
            <div className="flex flex-wrap gap-2">
              {INTERESSES.map((item) => (
                <button key={item.id} type="button"
                  onClick={() => toggleInteresse(item.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-ui font-medium border transition-all ${
                    form.interesses.includes(item.id)
                      ? "bg-[var(--accent)] border-[var(--accent)] text-[var(--primary)]"
                      : "bg-white border-[var(--border)] text-[var(--primary)]/60 hover:border-[var(--accent)]/50"
                  }`}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] py-3 rounded-xl font-ui font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md hover:shadow-lg"
          >
            {status === "loading" ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Cadastrando...</>
            ) : (
              "Quero receber novidades de Nova Friburgo"
            )}
          </button>

          <p className="text-center text-xs text-[var(--primary)]/40 font-ui">
            Sem spam. Você pode sair a qualquer momento.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
