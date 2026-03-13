"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, CheckCircle, Loader2 } from "lucide-react";

export function LeadCapture() {
  const [form, setForm] = useState({ nome: "", email: "", whatsapp: "", bairro: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
          <p className="text-[var(--primary)]/70 font-ui mt-2">Voce vai receber as novidades de Nova Friburgo direto no seu WhatsApp e email.</p>
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
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Receba as Novidades</h2>
          <p className="text-[var(--primary)]/60 font-ui mt-2">WhatsApp + Email — direto do Marcos pra voce</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-[var(--border)] p-6 md:p-8 space-y-4 shadow-sm"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider">Nome</label>
              <input
                type="text"
                required
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="w-full mt-1 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)]"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider">Bairro</label>
              <input
                type="text"
                value={form.bairro}
                onChange={(e) => setForm({ ...form, bairro: e.target.value })}
                className="w-full mt-1 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)]"
                placeholder="Ex: Centro, Olaria..."
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider flex items-center gap-1">
              <Phone className="w-3 h-3" /> WhatsApp
            </label>
            <input
              type="tel"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className="w-full mt-1 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)]"
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
              className="w-full mt-1 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)]"
              placeholder="seu@email.com"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] py-3 rounded-xl font-ui font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {status === "loading" ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Cadastrando...</>
            ) : (
              "Quero receber novidades"
            )}
          </button>

          <p className="text-center text-xs text-[var(--primary)]/40 font-ui">
            Sem spam. Voce pode sair a qualquer momento.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
