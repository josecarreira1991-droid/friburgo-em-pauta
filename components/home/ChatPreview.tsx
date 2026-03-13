"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const PREVIEW_MSGS = [
  { role: "user", text: "Marcos, o que voce vai fazer pela saude?" },
  { role: "assistant", text: "Olha, saude e prioridade numero um. Ja conseguimos a UPA pra Friburgo e garantimos o Hospital do Cancer. Agora o proximo passo e levar mais investimento pro estado todo. Morou?" },
];

export function ChatPreview() {
  return (
    <section className="py-20 bg-[var(--primary)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Inteligencia Artificial</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">Fale com o Marcos 24/7</h2>
          <p className="text-white/60 font-ui mt-2">Agente de IA treinado com a personalidade e propostas do Marcos</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-6 max-w-lg mx-auto"
        >
          <div className="space-y-3 mb-6">
            {PREVIEW_MSGS.map((msg, i) => (
              <div key={i} className={"flex " + (msg.role === "user" ? "justify-end" : "justify-start")}>
                <div className={"max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed font-ui " +
                  (msg.role === "user"
                    ? "bg-[var(--primary)] text-white rounded-br-md"
                    : "bg-[var(--bg-paper)] text-[var(--primary)] rounded-bl-md border border-[var(--border)]")}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/chat"
            className="w-full flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] py-3 rounded-xl font-ui font-semibold transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Iniciar Conversa
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
