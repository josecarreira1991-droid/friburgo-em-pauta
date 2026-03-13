"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Tv, FileText, Send, Youtube, Radio, Eye, Users, MessageCircle, Settings, LogOut } from "lucide-react";
import Image from "next/image";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "marcos2027";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [activeTab, setActiveTab] = useState<"live" | "content" | "broadcast">("live");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("admin_auth");
      if (saved === "true") setAuthed(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      sessionStorage.setItem("admin_auth", "true");
      setError("");
    } else {
      setError("Senha incorreta");
    }
  };

  const handleLogout = () => {
    setAuthed(false);
    sessionStorage.removeItem("admin_auth");
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[var(--bg-dark)] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white/5 rounded-2xl border border-white/10 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[var(--accent)]/20 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-[var(--accent)]" />
            </div>
            <h1 className="font-display text-2xl font-bold text-white">Painel Admin</h1>
            <p className="text-white/40 font-ui text-sm mt-1">Acesso restrito — Marcos Medeiros</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Senha de acesso"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-ui placeholder:text-white/30 focus:outline-none focus:border-[var(--accent)]/50"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm font-ui">{error}</p>}
            <button type="submit" className="w-full py-3 bg-[var(--accent)] text-[var(--primary)] rounded-xl font-ui font-bold hover:bg-[var(--accent)]/90 transition-all">
              Entrar
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-dark)]">
      {/* Admin Header */}
      <div className="bg-white/5 border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/images/marcos-perfil.jpg" alt="Marcos" width={40} height={40} className="rounded-full" />
            <div>
              <h1 className="font-ui font-bold text-white text-sm">Painel Admin</h1>
              <p className="text-white/40 text-xs font-ui">Marcos Medeiros — DC 27</p>
            </div>
          </div>
          <button onClick={handleLogout} className="text-white/40 hover:text-white flex items-center gap-2 text-sm font-ui">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {[
            { id: "live" as const, icon: Tv, label: "Live / TV" },
            { id: "content" as const, icon: FileText, label: "Conteudo" },
            { id: "broadcast" as const, icon: Send, label: "Broadcast" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-ui text-sm font-semibold transition-all whitespace-nowrap ${activeTab === tab.id ? "bg-[var(--accent)] text-[var(--primary)]" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* LIVE TAB */}
        {activeTab === "live" && (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Radio className="w-5 h-5 text-red-500" /> Controle de Live
              </h2>
              <p className="text-white/50 font-ui text-sm mb-6">
                Para ir ao vivo, abra o YouTube pelo celular ou OBS Studio e inicie uma transmissao. O portal automaticamente mostra sua live na pagina /tv.
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <p className="text-white font-ui font-semibold text-sm">Status da Live</p>
                    <p className="text-white/40 text-xs font-ui">O portal puxa automaticamente do YouTube</p>
                  </div>
                  <button onClick={() => setIsLive(!isLive)}
                    className={`px-4 py-2 rounded-full font-ui text-sm font-bold transition-all ${isLive ? "bg-red-600 text-white" : "bg-white/10 text-white/50"}`}>
                    {isLive ? "🔴 AO VIVO" : "⚫ OFFLINE"}
                  </button>
                </div>

                <div>
                  <label className="text-white/60 font-ui text-sm mb-2 block">URL customizada do YouTube (opcional)</label>
                  <input
                    type="text"
                    value={liveUrl}
                    onChange={e => setLiveUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-ui placeholder:text-white/30 focus:outline-none focus:border-[var(--accent)]/50"
                  />
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                  <p className="text-blue-300 font-ui text-sm font-semibold mb-1">Como fazer live:</p>
                  <ol className="text-blue-300/70 font-ui text-xs space-y-1 list-decimal pl-4">
                    <li>Abra o app do YouTube no celular</li>
                    <li>Toque no botao + e depois em "Transmitir ao vivo"</li>
                    <li>Coloque o titulo do programa e inicie</li>
                    <li>O portal mostra automaticamente na pagina /tv</li>
                    <li>Quando terminar, os espectadores verao a reprise</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-xl border border-white/10 p-5">
                <Youtube className="w-6 h-6 text-red-500 mb-2" />
                <p className="text-2xl font-display font-bold text-white">3.575</p>
                <p className="text-white/40 text-xs font-ui">Videos no canal</p>
              </div>
              <div className="bg-white/5 rounded-xl border border-white/10 p-5">
                <Eye className="w-6 h-6 text-[var(--accent)] mb-2" />
                <p className="text-2xl font-display font-bold text-white">289</p>
                <p className="text-white/40 text-xs font-ui">Videos no portal</p>
              </div>
              <div className="bg-white/5 rounded-xl border border-white/10 p-5">
                <Users className="w-6 h-6 text-green-500 mb-2" />
                <p className="text-2xl font-display font-bold text-white">5.550</p>
                <p className="text-white/40 text-xs font-ui">Votos em 2020</p>
              </div>
            </div>
          </div>
        )}

        {/* CONTENT TAB */}
        {activeTab === "content" && (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h2 className="font-display text-xl font-bold text-white mb-4">Gerar Conteudo</h2>
              <p className="text-white/50 font-ui text-sm mb-4">
                Use a IA para gerar posts para redes sociais com base no seu estilo.
              </p>
              <textarea
                placeholder="Sobre o que voce quer postar? Ex: Fale sobre a importancia dos incentivos fiscais..."
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-ui placeholder:text-white/30 focus:outline-none focus:border-[var(--accent)]/50 resize-none"
              />
              <div className="flex gap-3 mt-4">
                <button className="px-5 py-2.5 bg-[var(--accent)] text-[var(--primary)] rounded-xl font-ui font-bold text-sm hover:bg-[var(--accent)]/90 transition-all">
                  Gerar com IA
                </button>
                <button className="px-5 py-2.5 bg-white/5 text-white/50 rounded-xl font-ui text-sm hover:bg-white/10 transition-all">
                  Postar Direto
                </button>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h2 className="font-display text-xl font-bold text-white mb-4">Atualizar Videos do YouTube</h2>
              <p className="text-white/50 font-ui text-sm mb-4">
                Sincronize os videos mais recentes do canal TV do Povo com o portal.
              </p>
              <button className="px-5 py-2.5 bg-red-600 text-white rounded-xl font-ui font-bold text-sm hover:bg-red-700 transition-all flex items-center gap-2">
                <Youtube className="w-4 h-4" /> Sincronizar Agora
              </button>
            </div>
          </div>
        )}

        {/* BROADCAST TAB */}
        {activeTab === "broadcast" && (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-500" /> Broadcast WhatsApp
              </h2>
              <p className="text-white/50 font-ui text-sm mb-4">
                Envie mensagem para todos os contatos do WhatsApp via My CEO.
              </p>
              <textarea
                placeholder="Digite a mensagem para enviar em massa..."
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-ui placeholder:text-white/30 focus:outline-none focus:border-[var(--accent)]/50 resize-none"
              />
              <button className="mt-4 px-5 py-2.5 bg-green-600 text-white rounded-xl font-ui font-bold text-sm hover:bg-green-700 transition-all flex items-center gap-2">
                <Send className="w-4 h-4" /> Enviar Broadcast
              </button>
            </div>

            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h2 className="font-display text-xl font-bold text-white mb-4">Newsletter por Email</h2>
              <p className="text-white/50 font-ui text-sm mb-4">
                Envie atualizacoes para os inscritos da newsletter.
              </p>
              <input
                type="text"
                placeholder="Assunto do email..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-ui placeholder:text-white/30 focus:outline-none focus:border-[var(--accent)]/50 mb-3"
              />
              <textarea
                placeholder="Conteudo do email..."
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-ui placeholder:text-white/30 focus:outline-none focus:border-[var(--accent)]/50 resize-none"
              />
              <button className="mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-ui font-bold text-sm hover:bg-blue-700 transition-all flex items-center gap-2">
                <Send className="w-4 h-4" /> Enviar Newsletter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
