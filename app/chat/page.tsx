"use client";

import { motion } from "framer-motion";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { MessageCircle, Phone } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      <section className="bg-[var(--primary)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center mx-auto mb-4">
              <span className="text-[var(--primary)] font-bold text-2xl">M</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Fale com Marcos Medeiros</h1>
            <p className="text-white/60 font-ui mt-2">Assessoria do Marcos — disponivel 24 horas</p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-sm font-ui">Online agora</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden shadow-lg" style={{ height: "600px" }}>
          <ChatInterface />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-[var(--primary)]/40 font-ui mb-4">Prefere conversar por WhatsApp?</p>
          <a
            href={"https://wa.me/" + (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5522998954874")}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-ui font-semibold transition-all"
          >
            <Phone className="w-5 h-5" />
            Continuar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
