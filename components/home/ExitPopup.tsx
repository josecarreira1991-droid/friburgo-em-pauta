"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, MessageCircle, ArrowRight, Loader2, CheckCircle } from "lucide-react";

export function ExitPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [form, setForm] = useState({ nome: "", whatsapp: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    // Não mostra se já foi dispensado nesta sessão
    if (sessionStorage.getItem("popup_dismissed")) return;

    // Mostra após 45 segundos na página
    const timer = setTimeout(() => {
      if (!dismissed) setShow(true);
    }, 45000);

    // Exit intent — mouse saindo pelo topo
    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 5 && !dismissed && !sessionStorage.getItem("popup_dismissed")) {
        setShow(true);
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [dismissed]);

  function handleDismiss() {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("popup_dismissed", "1");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, origem: "exit_popup" }),
      });
      setStatus("success");
      setTimeout(handleDismiss, 3000);
    } catch {
      setStatus("idle");
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full pointer-events-auto overflow-hidden">
              {/* Header */}
              <div className="bg-[var(--primary)] p-6 relative">
                <button onClick={handleDismiss}
                  className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-[var(--accent)]/20 border-2 border-[var(--accent)] flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-7 h-7 text-[var(--accent)]" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-white mb-1">
                    Antes de ir...
                  </h2>
                  <p className="text-white/60 font-ui text-sm">
                    Receba as novidades de Nova Friburgo direto no WhatsApp
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                {status === "success" ? (
                  <div className="text-center py-4">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <h3 className="font-display text-xl font-bold text-[var(--primary)] mb-1">Cadastrado!</h3>
                    <p className="text-[var(--primary)]/50 font-ui text-sm">Você vai receber as novidades em breve.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <input type="text" required placeholder="Seu nome"
                        value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors" />
                    </div>
                    <div>
                      <input type="tel" required placeholder="WhatsApp: (22) 99999-0000"
                        value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors" />
                    </div>
                    <button type="submit" disabled={status === "loading"}
                      className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] py-3 rounded-xl font-ui font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                      {status === "loading" ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Cadastrando...</>
                      ) : (
                        <><MessageCircle className="w-4 h-4" /> Quero receber novidades</>
                      )}
                    </button>
                    <button type="button" onClick={handleDismiss}
                      className="w-full text-[var(--primary)]/30 hover:text-[var(--primary)]/60 font-ui text-xs transition-colors py-1">
                      Não, obrigado
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
