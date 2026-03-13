"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Facebook, MessageCircle, Send, CheckCircle } from "lucide-react";

export default function ContatoPage() {
  const [form, setForm] = useState({ nome: "", email: "", whatsapp: "", mensagem: "" });
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      <section className="bg-[var(--primary)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Contato</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">Fale com a Gente</h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-2xl font-bold mb-6">Canais de Contato</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-[var(--border)]">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-ui font-semibold">WhatsApp</h3>
                  <p className="text-sm text-[var(--primary)]/60">(22) 99999-0000</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-[var(--border)]">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-ui font-semibold">Email</h3>
                  <p className="text-sm text-[var(--primary)]/60">contato@friburgoempautam.com.br</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-[var(--border)]">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-ui font-semibold">Escritorio</h3>
                  <p className="text-sm text-[var(--primary)]/60">Nova Friburgo, RJ</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-[var(--border)]">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-ui font-semibold">Instagram</h3>
                  <p className="text-sm text-[var(--primary)]/60">@marcos_medeiros_noticias</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            {sent ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-xl p-10 border border-[var(--border)] text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold">Mensagem enviada!</h3>
                <p className="text-[var(--primary)]/60 font-ui mt-2">Vamos responder o mais rapido possivel.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-[var(--border)] space-y-4">
                <h2 className="font-display text-2xl font-bold mb-4">Enviar Mensagem</h2>
                <input type="text" required placeholder="Seu nome" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)]" />
                <input type="email" placeholder="Seu email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)]" />
                <input type="tel" placeholder="WhatsApp (22) 99999-0000" value={form.whatsapp} onChange={e => setForm({...form, whatsapp: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)]" />
                <textarea required placeholder="Sua mensagem..." rows={5} value={form.mensagem} onChange={e => setForm({...form, mensagem: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] resize-none" />
                <button type="submit" className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] py-3 rounded-xl font-ui font-semibold transition-all flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Enviar Mensagem
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
