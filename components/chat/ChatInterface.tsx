"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { TypingIndicator } from "./TypingIndicator";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME = "Ola! Pode falar a vontade sobre Nova Friburgo, sobre meu trabalho, ou qualquer coisa que queira saber. Estou aqui pelo povo de Friburgo!";

export function ChatInterface({ compact = false }: { compact?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef(
    typeof window !== "undefined"
      ? localStorage.getItem("chat_session") || crypto.randomUUID()
      : "default"
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chat_session", sessionRef.current);
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  async function handleSend() {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionRef.current, message: userMsg.content }),
      });
      const data = await res.json();
      await new Promise((r) => setTimeout(r, 1200));
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: data.reply || "Desculpa, tive um problema aqui. Tenta de novo?" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: "Eita, deu um problema na conexao. Tenta de novo daqui a pouco!" },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className={"flex flex-col h-full " + (compact ? "" : "min-h-[600px]")}>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={"flex " + (msg.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={
                "max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed font-ui " +
                (msg.role === "user"
                  ? "bg-[var(--primary)] text-white rounded-br-md"
                  : "bg-[var(--bg-paper)] text-[var(--primary)] rounded-bl-md border border-[var(--border)]")
              }
            >
              {msg.content}
            </div>
          </motion.div>
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      <div className="p-3 border-t border-[var(--border)] bg-white">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Fale com o Marcos..."
            className="flex-1 bg-[var(--bg-paper)] rounded-full px-4 py-2.5 text-sm font-ui outline-none border border-[var(--border)] focus:border-[var(--accent)] transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] flex items-center justify-center transition-all disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
