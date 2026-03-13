"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, MessageCircle, Send, CheckCircle, Twitter, Globe } from "lucide-react";

const SOCIALS = [
  { icon: MessageCircle, name: "WhatsApp", value: "(22) 99895-4874", href: "https://wa.me/5522998954874", color: "hover:bg-green-600" },
  { icon: Instagram, name: "Instagram", value: "@marquinhosmedeirosnf", href: "https://www.instagram.com/marquinhosmedeirosnf/", color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500" },
  { icon: Instagram, name: "TV do Povo", value: "@tvdopovo3", href: "https://www.instagram.com/tvdopovo3/", color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500" },
  { icon: Facebook, name: "Facebook", value: "Marcos Medeiros Friburgo", href: "https://www.facebook.com/marcosmedeirosfriburgo/", color: "hover:bg-blue-600" },
  { icon: Youtube, name: "YouTube", value: "TV do Povo — Canal 3", href: "https://www.youtube.com/@tvdopovo-canal3566", color: "hover:bg-red-600" },
  { icon: Twitter, name: "X / Twitter", value: "@marcosmedeiros_", href: "https://x.com/marcosmedeiros_", color: "hover:bg-black" },
  { icon: MapPin, name: "Cidade", value: "Nova Friburgo, RJ", href: null, color: "" },
];

export default function ContatoPage() {
  const [form, setForm] = useState({ nome: "", email: "", whatsapp: "", mensagem: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
      }
    } catch {}
    setSending(false);
  }

  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      <section className="bg-[var(--primary)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Contato</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">Fale com Marcos Medeiros</h1>
            <p className="text-white/50 font-ui mt-3">Mande sua mensagem, sugestao ou denuncia. Toda voz importa.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Canais */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-6">Todos os Canais</h2>
            <div className="space-y-3">
              {SOCIALS.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  {s.href ? (
                    <a href={s.href} target="_blank" rel="noopener"
                      className={"flex items-center gap-4 bg-white p-4 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] transition-all group"}>
                      <div className={"w-10 h-10 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0 group-hover:text-white transition-all " + s.color}>
                        <s.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-ui font-semibold text-sm">{s.name}</h3>
                        <p className="text-sm text-[var(--primary)]/60">{s.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-[var(--border)]">
                      <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0">
                        <s.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-ui font-semibold text-sm">{s.name}</h3>
                        <p className="text-sm text-[var(--primary)]/60">{s.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a href="https://wa.me/5522998954874?text=Ol%C3%A1%20Marcos%2C%20vim%20pelo%20portal!" target="_blank" rel="noopener"
              className="mt-6 w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-ui font-bold transition-all">
              <MessageCircle className="w-5 h-5" /> Conversar no WhatsApp
            </a>
          </div>

          {/* Formulario */}
          <div>
            {sent ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-xl p-10 border border-[var(--border)] text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold">Mensagem enviada!</h3>
                <p className="text-[var(--primary)]/60 font-ui mt-2">Marcos ou a equipe dele vai responder o mais rapido possivel.</p>
                <button onClick={() => { setSent(false); setForm({ nome: "", email: "", whatsapp: "", mensagem: "" }); }}
                  className="mt-4 text-[var(--accent)] font-ui text-sm hover:underline">Enviar outra mensagem</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-[var(--border)] space-y-4">
                <h2 className="font-display text-2xl font-bold mb-2">Enviar Mensagem</h2>
                <p className="text-[var(--primary)]/50 font-ui text-sm mb-4">Sua mensagem sera enviada diretamente para a equipe do Marcos.</p>
                <input type="text" required placeholder="Seu nome completo" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)]" />
                <input type="email" placeholder="Seu email (opcional)" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)]" />
                <input type="tel" placeholder="WhatsApp (22) 99999-0000" value={form.whatsapp} onChange={e => setForm({...form, whatsapp: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)]" />
                <textarea required placeholder="Escreva sua mensagem, sugestao, denuncia ou elogio..." rows={5} value={form.mensagem} onChange={e => setForm({...form, mensagem: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] resize-none" />
                <button type="submit" disabled={sending}
                  className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] py-3.5 rounded-xl font-ui font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                  <Send className="w-4 h-4" /> {sending ? "Enviando..." : "Enviar Mensagem"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
