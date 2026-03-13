"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle, Camera, MapPin, Send, CheckCircle,
  Loader2, Share2, MessageCircle, Eye, Shield,
  Megaphone, Phone, FileText, Clock, ChevronDown
} from "lucide-react";

const CATEGORIAS = [
  { id: "saude", label: "Saúde", emoji: "🏥", desc: "UPA, postos, falta de médicos, remédios" },
  { id: "educacao", label: "Educação", emoji: "🎓", desc: "Escolas, creches, falta de professores" },
  { id: "infraestrutura", label: "Infraestrutura", emoji: "🚧", desc: "Buracos, ruas, iluminação, esgoto" },
  { id: "seguranca", label: "Segurança", emoji: "🚨", desc: "Violência, iluminação, policiamento" },
  { id: "meio_ambiente", label: "Meio Ambiente", emoji: "🌳", desc: "Lixo, enchentes, desmatamento" },
  { id: "transporte", label: "Transporte", emoji: "🚌", desc: "Ônibus, estradas, mobilidade" },
  { id: "corrupcao", label: "Corrupção", emoji: "⚖️", desc: "Desvio de verbas, irregularidades" },
  { id: "outro", label: "Outro", emoji: "📢", desc: "Qualquer outro problema da cidade" },
];

export default function DenunciasPage() {
  const [form, setForm] = useState({
    nome: "", whatsapp: "", bairro: "", categoria: "",
    titulo: "", descricao: "", endereco: "", anonimo: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [step, setStep] = useState(1);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.anonimo ? "Anônimo" : form.nome,
          whatsapp: form.whatsapp,
          email: "",
          mensagem: `[DENÚNCIA — ${form.categoria.toUpperCase()}]\n\nTítulo: ${form.titulo}\nBairro: ${form.bairro}\nEndereço: ${form.endereco}\n\nDescrição:\n${form.descricao}`,
        }),
      });
      setStatus("success");
    } catch {
      setStatus("idle");
    }
  }

  function handleShare() {
    const text = `Fiz uma denúncia no portal do Marcos Medeiros sobre ${form.titulo || "um problema em Nova Friburgo"}. Você também pode denunciar: ${window.location.href}`;
    if (navigator.share) {
      navigator.share({ title: "Denúncia — Friburgo em Pauta", text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado!");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[var(--bg-light)] flex items-center justify-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="max-w-lg w-full bg-white rounded-3xl border border-[var(--border)] p-10 text-center shadow-xl">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="font-display text-3xl font-bold text-[var(--primary)] mb-3">Denúncia Recebida!</h2>
          <p className="text-[var(--primary)]/60 font-ui mb-2">
            Marcos Medeiros e sua equipe vão analisar e dar encaminhamento ao seu caso.
          </p>
          <p className="text-[var(--primary)]/40 font-ui text-sm mb-8">
            Você receberá um retorno pelo WhatsApp em até 48 horas.
          </p>
          <div className="bg-[var(--bg-paper)] rounded-2xl p-4 mb-6 text-left">
            <p className="font-ui text-xs text-[var(--primary)]/40 uppercase tracking-wider mb-2">Resumo da denúncia</p>
            <p className="font-ui font-semibold text-[var(--primary)] text-sm">{form.titulo}</p>
            <p className="font-ui text-[var(--primary)]/50 text-xs mt-1">{form.bairro} · {CATEGORIAS.find(c => c.id === form.categoria)?.label}</p>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={handleShare}
              className="flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] py-3 rounded-xl font-ui font-bold transition-all">
              <Share2 className="w-5 h-5" /> Compartilhar — Mostre para mais pessoas
            </button>
            <a href="https://wa.me/5522998954874?text=Fiz%20uma%20den%C3%BAncia%20no%20portal%20e%20quero%20acompanhar" target="_blank" rel="noopener"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-ui font-semibold transition-all">
              <MessageCircle className="w-5 h-5" /> Acompanhar no WhatsApp
            </a>
            <button onClick={() => { setStatus("idle"); setForm({ nome: "", whatsapp: "", bairro: "", categoria: "", titulo: "", descricao: "", endereco: "", anonimo: false }); setStep(1); }}
              className="text-[var(--primary)]/40 font-ui text-sm hover:text-[var(--primary)] transition-colors">
              Fazer outra denúncia
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      {/* Hero */}
      <section className="bg-[var(--primary)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-1.5 mb-6">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-red-300 text-sm font-ui font-medium">Canal Direto com Marcos Medeiros</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-4">
              Denuncie um Problema<br /><span className="text-[var(--accent)]">em Nova Friburgo</span>
            </h1>
            <p className="text-white/60 font-ui text-lg max-w-2xl mx-auto mb-8">
              Sua voz chega direto ao Marcos. Cada denúncia vira pauta na TV do Povo e nas redes sociais.
              Juntos, a gente muda Friburgo.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-ui">
              {[
                { icon: Shield, label: "Pode ser anônimo" },
                { icon: Eye, label: "Marcos acompanha pessoalmente" },
                { icon: Megaphone, label: "Vira pauta na TV do Povo" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white/60">
                  <item.icon className="w-4 h-4 text-[var(--accent)]" />
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Formulário */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <form onSubmit={handleSubmit}>
          {/* Step 1 — Categoria */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--primary)] font-bold text-sm">1</div>
              <h2 className="font-display text-xl font-bold text-[var(--primary)]">Qual é o problema?</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CATEGORIAS.map((cat) => (
                <button key={cat.id} type="button"
                  onClick={() => { setForm({ ...form, categoria: cat.id }); setStep(Math.max(step, 2)); }}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    form.categoria === cat.id
                      ? "border-[var(--accent)] bg-[var(--accent)]/10"
                      : "border-[var(--border)] bg-white hover:border-[var(--accent)]/50"
                  }`}>
                  <div className="text-2xl mb-2">{cat.emoji}</div>
                  <p className="font-ui font-semibold text-[var(--primary)] text-sm">{cat.label}</p>
                  <p className="font-ui text-[var(--primary)]/40 text-xs mt-0.5 leading-snug">{cat.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Step 2 — Detalhes */}
          <AnimatePresence>
            {step >= 2 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--primary)] font-bold text-sm">2</div>
                  <h2 className="font-display text-xl font-bold text-[var(--primary)]">Descreva o problema</h2>
                </div>
                <div className="bg-white rounded-2xl border border-[var(--border)] p-6 space-y-4">
                  <div>
                    <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider">Título da denúncia *</label>
                    <input type="text" required placeholder="Ex: Buraco enorme na Rua das Flores há 3 meses"
                      value={form.titulo} onChange={e => { setForm({ ...form, titulo: e.target.value }); setStep(Math.max(step, 3)); }}
                      className="w-full mt-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Bairro *
                      </label>
                      <input type="text" required placeholder="Ex: Centro, Olaria, Conselheiro..."
                        value={form.bairro} onChange={e => setForm({ ...form, bairro: e.target.value })}
                        className="w-full mt-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors" />
                    </div>
                    <div>
                      <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider">Endereço (opcional)</label>
                      <input type="text" placeholder="Rua, número, referência"
                        value={form.endereco} onChange={e => setForm({ ...form, endereco: e.target.value })}
                        className="w-full mt-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider">Descrição completa *</label>
                    <textarea required rows={5} placeholder="Descreva o problema com detalhes: há quanto tempo existe, quem é afetado, o que já foi tentado..."
                      value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })}
                      className="w-full mt-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors resize-none" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3 — Identificação */}
          <AnimatePresence>
            {step >= 3 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--primary)] font-bold text-sm">3</div>
                  <h2 className="font-display text-xl font-bold text-[var(--primary)]">Seus dados (para retorno)</h2>
                </div>
                <div className="bg-white rounded-2xl border border-[var(--border)] p-6 space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-[var(--bg-paper)] rounded-xl border border-[var(--border)]">
                    <input type="checkbox" id="anonimo" checked={form.anonimo}
                      onChange={e => setForm({ ...form, anonimo: e.target.checked })}
                      className="w-4 h-4 accent-[var(--accent)]" />
                    <label htmlFor="anonimo" className="font-ui text-sm text-[var(--primary)] cursor-pointer">
                      <strong>Quero ser anônimo</strong> — minha identidade não será divulgada
                    </label>
                  </div>
                  {!form.anonimo && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider">Seu nome</label>
                        <input type="text" placeholder="Seu nome completo"
                          value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })}
                          className="w-full mt-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors" />
                      </div>
                      <div>
                        <label className="text-xs font-ui font-semibold text-[var(--primary)]/50 uppercase tracking-wider flex items-center gap-1">
                          <Phone className="w-3 h-3" /> WhatsApp (para retorno)
                        </label>
                        <input type="tel" placeholder="(22) 99999-0000"
                          value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })}
                          className="w-full mt-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors" />
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-2 text-[var(--primary)]/40 text-xs font-ui">
                    <Shield className="w-3 h-3 mt-0.5 shrink-0" />
                    <p>Seus dados são usados apenas para retorno da equipe do Marcos. Nunca serão divulgados sem sua autorização.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botão enviar */}
          {step >= 3 && form.titulo && form.bairro && form.descricao && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <button type="submit" disabled={status === "loading"}
                className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] py-4 rounded-2xl font-ui font-bold text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg hover:shadow-xl">
                {status === "loading" ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Enviando denúncia...</>
                ) : (
                  <><Send className="w-5 h-5" /> Enviar Denúncia ao Marcos</>
                )}
              </button>
              <p className="text-center text-xs text-[var(--primary)]/30 font-ui mt-3">
                Sua denúncia será analisada pela equipe do Marcos em até 48 horas.
              </p>
            </motion.div>
          )}
        </form>

        {/* Alternativa WhatsApp */}
        <div className="mt-12 bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
          <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h3 className="font-display text-xl font-bold text-green-800 mb-2">Prefere pelo WhatsApp?</h3>
          <p className="text-green-700/70 font-ui text-sm mb-4">Mande sua denúncia diretamente para o Marcos com foto, vídeo ou áudio.</p>
          <a href="https://wa.me/5522998954874?text=Ol%C3%A1%20Marcos%2C%20tenho%20uma%20den%C3%BAncia%20sobre%20Nova%20Friburgo!" target="_blank" rel="noopener"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-ui font-bold transition-all">
            <MessageCircle className="w-5 h-5" /> Denunciar pelo WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
