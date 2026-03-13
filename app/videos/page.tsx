"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Clock, Eye, X, ExternalLink, Search, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filtered, setFiltered] = useState<Video[]>([]);
  const [visible, setVisible] = useState(24);
  const [selected, setSelected] = useState<Video | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "short" | "medium" | "long">("all");
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/data/youtube-videos.json")
      .then(r => r.json())
      .then((data: Video[]) => {
        setVideos(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    let result = videos;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(v => v.title.toLowerCase().includes(q));
    }
    if (filter === "short") result = result.filter(v => v.duration < 300);
    else if (filter === "medium") result = result.filter(v => v.duration >= 300 && v.duration < 1800);
    else if (filter === "long") result = result.filter(v => v.duration >= 1800);
    setFiltered(result);
    setVisible(24);
  }, [search, filter, videos]);

  const loadMore = useCallback(() => {
    setVisible(v => Math.min(v + 12, filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) loadMore();
    }, { threshold: 0.1 });
    if (loader.current) obs.observe(loader.current);
    return () => obs.disconnect();
  }, [loadMore]);

  return (
    <div className="min-h-screen bg-[var(--bg-dark)]">
      {/* Hero */}
      <section className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-red-500 font-ui font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              TV do Povo — Canal 3
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mt-3">
              +{videos.length} Videos Reais
            </h1>
            <p className="text-white/50 font-ui mt-3 max-w-2xl mx-auto">
              Todos os programas da TV do Povo com Marcos Medeiros.
              Entrevistas, coberturas, eventos e o dia a dia de Nova Friburgo.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3 text-sm text-white/40 font-ui">
              <a href="https://www.youtube.com/channel/UCpTkVug_tbEUPdBNKsGfxuw" target="_blank" rel="noopener"
                className="flex items-center gap-1 hover:text-red-400 transition-colors">
                <ExternalLink className="w-4 h-4" /> YouTube Original
              </a>
              <span>|</span>
              <Link href="/tv" className="flex items-center gap-1 hover:text-red-400 transition-colors">
                <Play className="w-4 h-4" /> Assistir AO VIVO
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              placeholder="Buscar videos..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-ui placeholder:text-white/30 focus:outline-none focus:border-[var(--accent)]/50"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "short", "medium", "long"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2.5 rounded-lg font-ui text-sm transition-all ${filter === f ? "bg-[var(--accent)] text-[var(--primary)] font-bold" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
                {f === "all" ? "Todos" : f === "short" ? "< 5min" : f === "medium" ? "5-30min" : "30min+"}
              </button>
            ))}
          </div>
        </div>
        <p className="text-white/30 font-ui text-sm mt-3">{filtered.length} videos encontrados</p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.slice(0, visible).map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(i * 0.03, 0.5) }}
              className="group cursor-pointer"
              onClick={() => setSelected(v)}
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-[var(--primary-med)] mb-2">
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-ui px-1.5 py-0.5 rounded">
                  {v.duration_string || formatDuration(v.duration)}
                </div>
              </div>
              <h3 className="text-white text-sm font-ui font-medium leading-snug line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                {v.title}
              </h3>
              {v.views > 0 && (
                <p className="text-white/30 text-xs font-ui mt-1 flex items-center gap-1">
                  <Eye className="w-3 h-3" /> {v.views.toLocaleString("pt-BR")} visualizacoes
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {visible < filtered.length && (
          <div ref={loader} className="flex justify-center mt-12">
            <button onClick={loadMore} className="px-8 py-3 bg-[var(--accent)] text-[var(--primary)] rounded-full font-ui font-bold hover:bg-[var(--accent)]/90 transition-all">
              Carregar mais videos ({filtered.length - visible} restantes)
            </button>
          </div>
        )}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-ui font-bold text-lg line-clamp-1 flex-1 mr-4">{selected.title}</h2>
                <div className="flex items-center gap-3">
                  <a href={selected.url} target="_blank" rel="noopener"
                    className="text-white/50 hover:text-white flex items-center gap-1 text-sm font-ui">
                    <ExternalLink className="w-4 h-4" /> YouTube
                  </a>
                  <button onClick={() => setSelected(null)} className="text-white/50 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                <iframe
                  src={`${selected.embed}?autoplay=1&rel=0`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="mt-3 flex items-center gap-4 text-white/40 text-sm font-ui">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {selected.duration_string || formatDuration(selected.duration)}</span>
                {selected.views > 0 && <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {selected.views.toLocaleString("pt-BR")} views</span>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
