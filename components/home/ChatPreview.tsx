"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

const MESSAGES = [
  { role: "user", text: "Marcos, qual sua principal proposta?" },
  { role: "assistant", text: "Minha proposta central e redirecionar incentivos fiscais de volta pra Nova Friburgo. Hoje o imposto vai embora e nao volta. Quero mudar isso com um projeto de lei federal que beneficie diretamente nossa regiao serrana." },
  { role: "user", text: "Como posso ajudar?" },
  { role: "assistant", text: "Compartilhe com seus amigos, vizinhos, familia. A forca do povo e a nossa maior arma. E me acompanhe na TV do Povo, todo dia ao vivo!" },
];

export function ChatPreview() {
  return (
    <section className="py-20 bg-[var(--bg-dark)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Chat</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">Fale com a Assessoria</h2>
          <p className="text-white/40 font-ui text-sm mt-2">Assessoria disponivel 24 horas</p>
        </motion.div>
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 max-w-lg mx-auto">
          <div className="space-y-4 mb-6">
            {MESSAGES.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className={"flex " + (m.role === "user" ? "justify-end" : "justify-start")}>
                <div className={"max-w-[80%] rounded-2xl px-4 py-3 text-sm font-ui " + (m.role === "user" ? "bg-[var(--accent)] text-[var(--primary)]" : "bg-white/10 text-white/80")}>
                  {m.text}
                </div>
              </motion.div>
            ))}
          </div>
          <Link href="/chat" className="w-full flex items-center justify-center gap-2 bg-[var(--accent)] text-[var(--primary)] py-3 rounded-xl font-ui font-bold hover:bg-[var(--accent)]/90 transition-all">
            <MessageCircle className="w-4 h-4" /> Comecar Conversa
          </Link>
        </div>
      </div>
    </section>
  );
}
