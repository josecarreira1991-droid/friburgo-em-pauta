"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Tv, Radio, Clock, Users, Play, MessageCircle, Youtube, Instagram, Facebook, Share2, Heart, Eye, Send } from "lucide-react";

const SCHEDULE = [
  { hora: "07:00", programa: "Bom Dia Friburgo", desc: "Noticias da manha com Marcos Medeiros", ao_vivo: true },
  { hora: "12:00", programa: "TV do Povo — Edicao Meio-Dia", desc: "Os fatos do dia, direto do povo", ao_vivo: true },
  { hora: "18:00", programa: "Friburgo em Pauta", desc: "Debate politico e propostas para a cidade", ao_vivo: true },
  { hora: "20:00", programa: "Reprise — Melhores Momentos", desc: "Os destaques do dia na TV do Povo", ao_vivo: false },
];

const RECENT_LIVES = [
  { titulo: "O imposto vai embora e nao volta — entenda minha proposta", views: "2.3K", data: "Ontem" },
  { titulo: "UPA de Friburgo: a conquista que salvou vidas", views: "1.8K", data: "2 dias" },
  { titulo: "Estacio de Sa — como trouxemos a faculdade pra cidade", views: "1.5K", data: "3 dias" },
  { titulo: "Hospital do Cancer — tratamento perto de casa", views: "2.1K", data: "4 dias" },
  { titulo: "Banco de dados municipal — como funciona na pratica", views: "1.2K", data: "5 dias" },
  { titulo: "Ao vivo do centro de Nova Friburgo — ouvindo o povo", views: "3.4K", data: "1 semana" },
];

export default function TVPage() {
  const [chatInput, setChatInput] = useState("");
  const [chatMsgs, setChatMsgs] = useState([
    { user: "Maria S.", msg: "Marcos, fala sobre a UPA!", time: "2min" },
    { user: "João P.", msg: "Boa noite Friburgo!", time: "1min" },
    { user: "Ana C.", msg: "Quando vem a proxima live?", time: "agora" },
  ]);

  return (
    <div className="min-h-screen bg-[var(--bg-dark)]">
      {/* HEADER TV */}
      <section className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5">
              <span className="w-3 h-3 rounded-full bg-white animate-pulse" />
              <span className="text-white font-ui font-bold text-sm">AO VIVO</span>
            </div>
            <div>
              <h1 className="text-white font-display text-xl font-bold">TV DO POVO</h1>
              <p className="text-white/60 text-xs font-ui">Marcos Medeiros — Nova Friburgo</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-white/60 text-sm font-ui">
            <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> 847 assistindo</span>
            <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> 2.3K</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* PLAYER PRINCIPAL */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden mb-4">
              {/* YouTube Embed do canal TV do Povo */}
              <iframe
                src="https://www.youtube.com/embed/live_stream?channel=UC_tvdopovo-canal3566&autoplay=0"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="TV do Povo — Ao Vivo"
              />
              {/* Overlay quando nao tem live */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-600 text-white text-xs font-ui font-bold px-2 py-0.5 rounded">AO VIVO</span>
                    <span className="text-white/60 text-xs font-ui">TV DO POVO</span>
                  </div>
                  <h2 className="text-white font-display text-lg md:text-xl font-bold">Friburgo em Pauta — Edicao da Noite</h2>
                </div>
              </div>
            </div>

            {/* INFO + ACOES */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <Image src="/images/marcos-perfil.jpg" alt="Marcos" width={44} height={44} className="rounded-full border-2 border-red-500" />
                <div>
                  <p className="font-ui font-bold text-white text-sm">Marcos Medeiros</p>
                  <p className="text-white/40 text-xs font-ui">@marcos_medeiros_noticias</p>
                </div>
              </div>
              <a href="https://www.youtube.com/@tvdopovo-canal3566" target="_blank" rel="noopener" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-ui font-semibold flex items-center gap-2 transition-all">
                <Youtube className="w-4 h-4" /> Inscrever-se
              </a>
              <a href="https://instagram.com/marcos_medeiros_noticias" target="_blank" rel="noopener" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-ui flex items-center gap-2 transition-all">
                <Instagram className="w-4 h-4" /> Seguir
              </a>
              <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-ui flex items-center gap-2 transition-all">
                <Share2 className="w-4 h-4" /> Compartilhar
              </button>
            </div>

            {/* GRADE DE PROGRAMACAO */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6 mb-8">
              <h3 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[var(--accent)]" /> Programacao Diaria
              </h3>
              <div className="space-y-3">
                {SCHEDULE.map((s, i) => (
                  <div key={i} className={"flex items-center gap-4 p-3 rounded-xl transition-all " + (s.ao_vivo ? "bg-red-500/10 border border-red-500/20" : "hover:bg-white/5")}>
                    <span className="font-ui font-bold text-[var(--accent)] text-lg w-16">{s.hora}</span>
                    <div className="flex-1">
                      <p className="font-ui font-semibold text-white text-sm">{s.programa}</p>
                      <p className="text-white/40 text-xs font-ui">{s.desc}</p>
                    </div>
                    {s.ao_vivo && (
                      <span className="bg-red-600 text-white text-[10px] font-ui font-bold px-2 py-0.5 rounded animate-pulse">LIVE</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* LIVES ANTERIORES */}
            <h3 className="font-display text-xl font-bold text-white mb-4">Lives Anteriores</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {RECENT_LIVES.map((v, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-red-500/30 transition-all cursor-pointer group">
                  <div className="relative aspect-video bg-[var(--primary-med)] rounded-lg mb-3 flex items-center justify-center">
                    <Play className="w-10 h-10 text-white/30 group-hover:text-red-500 transition-colors" />
                    <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-ui px-1.5 py-0.5 rounded">{v.data}</span>
                  </div>
                  <h4 className="text-white text-sm font-ui font-medium leading-snug mb-1">{v.titulo}</h4>
                  <span className="text-white/30 text-xs font-ui flex items-center gap-1"><Eye className="w-3 h-3" />{v.views} views</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CHAT AO VIVO */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden sticky top-24" style={{ height: "600px" }}>
              <div className="bg-red-600/20 border-b border-white/10 px-4 py-3 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-red-400" />
                <span className="text-white font-ui font-semibold text-sm">Chat ao Vivo</span>
                <span className="ml-auto text-white/40 text-xs font-ui">847 online</span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ height: "480px" }}>
                {chatMsgs.map((m, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-[var(--accent)]/20 flex items-center justify-center shrink-0">
                      <span className="text-[var(--accent)] text-xs font-bold">{m.user[0]}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--accent)] text-xs font-ui font-bold">{m.user}</span>
                        <span className="text-white/20 text-[10px] font-ui">{m.time}</span>
                      </div>
                      <p className="text-white/70 text-sm font-ui">{m.msg}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-white/10">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!chatInput.trim()) return;
                  setChatMsgs(prev => [...prev, { user: "Voce", msg: chatInput, time: "agora" }]);
                  setChatInput("");
                }} className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Mande sua mensagem..."
                    className="flex-1 bg-white/5 rounded-full px-4 py-2 text-sm font-ui text-white outline-none border border-white/10 focus:border-red-500/50 placeholder:text-white/20"
                  />
                  <button type="submit" className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
