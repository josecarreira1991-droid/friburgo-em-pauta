"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatInterface } from "@/components/chat/ChatInterface";

export function ChatFAB() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] shadow-2xl flex items-center justify-center transition-all animate-[pulseGold_2s_ease-in-out_infinite] hover:scale-110"
        aria-label="Chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[520px] bg-white rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden flex flex-col"
          >
            <div className="bg-[var(--primary)] text-white p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center">
                <span className="text-[var(--primary)] font-bold">M</span>
              </div>
              <div>
                <p className="font-ui font-semibold text-sm">Marcos Medeiros</p>
                <p className="text-white/60 text-xs font-ui">Online agora</p>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <ChatInterface compact />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
