"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Tv, Radio, Clock, Users, Play, MessageCircle, Youtube, Instagram, Facebook, Share2, Heart, Eye, Send, X } from "lucide-react";

interface Video {
  id: string;
  title: string;
  duration: number;
  duration_string: string;
  views: number;
  thumbnail: string;
  url: string;
  embed: string;
}

const SCHEDULE = [
  { hora: "07:00", programa: "Bom Dia Friburgo", desc: "Noticias da manha com Marcos Medeiros", ao_vivo: true },
  { hora: "12:00", programa: "TV do Povo — Edicao Meio-Dia", desc: "Os fatos do dia, direto do povo", ao_vivo: true },
  { hora: "18:00", programa: "Friburgo em Pauta", desc: "Debate politico e propostas para a cidade", ao_vivo: true },
  { hora: "20:00", programa: "Reprise — Melhores Momentos", desc: "Os destaques do dia na TV do Povo", ao_vivo: false },
];

export default function TVPage() {
  const [chatInput, setChatInput] = useState("");
  const [chatMsgs, setChatMsgs] = useState([
    { user: "Maria S.", msg: "Marcos, fala sobre a proposta!", time: "2min" },
    { user: "Joao P.", msg: "Boa noite Friburgo!", time: "1min" },
    { user: "Ana C.", msg: "Quando vem a proxima live?", time: "agora" },
  ]);
  const [recentVideos, setRecentVideos] = useState<Video[]>([]);
  const [mainVideoId, setMainVideoId] = useState("YlzQmJ-9HpA");
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);

  useEffect(() => {
    fetch("/data/youtube-videos.json")
      .then(r => r.json())
      .then((data: Video[]) => {
        const good = data.filter(v => v.title.length > 10 && v.duration > 60);
        setRecentVideos(good.length >= 6 ? good.slice(0, 12) : data.slice(0, 12));
        if (data[0]) setMainVideoId(data[0].id);
      });
  }, []);

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
              <h1 className="text-white font-display text-xl font-bold">TV DO POVO — CANAL 3</h1>
              <p className="text-white/60 text-xs font-ui">Marcos Medeiros — Nova Friburgo, RJ</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-white/60 text-sm font-ui">
            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 3.575 videos</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* PLAYER PRINCIPAL */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden mb-4">
              <iframe
                src={"https://www.youtube.com/embed/" + mainVideoId + "?rel=0"}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="TV do Povo — Ao Vivo"
              />
            </div>

            {/* INFO + ACOES */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="flex items-center gap-3">
                <Image src="/images/marcos-perfil.jpg" alt="Marcos Medeiros" width={44} height={44} className="rounded-full border-2 border-red-500" />
                <div>
                  <p className="font-ui font-bold text-white text-sm">Marcos Medeiros</p>
                  <p className="text-white/40 text-xs font-ui">Pre-candidato a Deputado Federal 2026 — DC 27</p>
                </div>
              </div>
              <a href="https://www.youtube.com/@tvdopovo-canal3566" target="_blank" rel="noopener" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-ui font-semibold flex items-center gap-2 transition-all">
                <Youtube className="w-4 h-4" /> Inscrever-se
              </a>
              <a href="https://instagram.com/marquinhosmedeirosnf" target="_blank" rel="noopener" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white px-4 py-2 rounded-full text-sm font-ui flex items-center gap-2 transition-all">
                <Instagram className="w-4 h-4" /> Seguir
              </a>
              <a href="https://wa.me/5522998954874" target="_blank" rel="noopener" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-ui flex items-center gap-2 transition-all">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
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
                    {s.ao_vivo && <span className="bg-red-600 text-white text-[10px] font-ui font-bold px-2 py-0.5 rounded animate-pulse">LIVE</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* PROGRAMAS ANTERIORES - REAL */}
            <h3 className="font-display text-xl font-bold text-white mb-4">Programas Anteriores</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recentVideos.map((v, i) => (
                <motion.div key={v.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="group cursor-pointer" onClick={() => setPlayingVideo(v)}>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-[var(--primary-med)] mb-2">
                    <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
                      </div>
                    </div>
                    <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] font-ui px-1.5 py-0.5 rounded">
                      {v.duration_string}
                    </div>
                  </div>
                  <h4 className="text-white text-xs font-ui font-medium leading-snug line-clamp-2 group-hover:text-red-400 transition-colors">{v.title}</h4>
                  {v.views > 0 && <span className="text-white/30 text-[10px] font-ui">{v.views} views</span>}
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
                <span className="ml-auto text-white/40 text-xs font-ui flex items-center gap-1"><Users className="w-3 h-3" /> online</span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ height: "480px" }}>
                {chatMsgs.map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-start gap-2">
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
                  </motion.div>
                ))}
              </div>

              <div className="p-3 border-t border-white/10">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!chatInput.trim()) return;
                  setChatMsgs(prev => [...prev, { user: "Voce", msg: chatInput, time: "agora" }]);
                  setChatInput("");
                }} className="flex gap-2">
                  <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Mande sua mensagem..."
                    className="flex-1 bg-white/5 rounded-full px-4 py-2 text-sm font-ui text-white outline-none border border-white/10 focus:border-red-500/50 placeholder:text-white/20" />
                  <button type="submit" className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setPlayingVideo(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="w-full max-w-5xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white font-ui font-bold line-clamp-1 flex-1 mr-4">{playingVideo.title}</h2>
                <button onClick={() => setPlayingVideo(null)} className="text-white/50 hover:text-white"><X className="w-6 h-6" /></button>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                <iframe src={`${playingVideo.embed}?autoplay=1&rel=0`} className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
