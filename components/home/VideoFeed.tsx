"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Clock, Eye, ExternalLink, X } from "lucide-react";
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

export function VideoFeed() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selected, setSelected] = useState<Video | null>(null);

  useEffect(() => {
    fetch("/data/youtube-videos.json")
      .then(r => r.json())
      .then((data: Video[]) => {
        const featured = data.filter(v => v.title.length > 10 && v.duration > 60).slice(0, 8);
        setVideos(featured.length >= 4 ? featured : data.slice(0, 8));
      });
  }, []);

  return (
    <section className="py-20 bg-[var(--bg-dark)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-12">
          <div>
            <span className="text-red-500 font-ui font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              TV do Povo — Canal 3
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">Videos e Programas</h2>
            <p className="text-white/40 font-ui text-sm mt-1">Direto do canal com +3.500 videos</p>
          </div>
          <Link href="/videos" className="text-[var(--accent)] font-ui text-sm hover:underline hidden sm:flex items-center gap-1">
            Ver todos os 289 videos <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Featured video - large */}
        {videos[0] && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <div className="relative aspect-video max-h-[480px] rounded-2xl overflow-hidden bg-[var(--primary-med)] cursor-pointer group"
              onClick={() => setSelected(videos[0])}>
              <img src={videos[0].thumbnail} alt={videos[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-red-600/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-xl md:text-2xl font-display font-bold">{videos[0].title}</h3>
                <div className="flex items-center gap-4 mt-2 text-white/50 text-sm font-ui">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {videos[0].duration_string}</span>
                  {videos[0].views > 0 && <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {videos[0].views.toLocaleString("pt-BR")}</span>}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {videos.slice(1, 9).map((video, i) => (
            <motion.div key={video.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="group cursor-pointer" onClick={() => setSelected(video)}>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-[var(--primary-med)] mb-2">
                <img src={video.thumbnail} alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                    <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
                  </div>
                </div>
                <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] font-ui px-1.5 py-0.5 rounded">
                  {video.duration_string}
                </div>
              </div>
              <h3 className="text-white text-xs sm:text-sm font-ui font-medium leading-snug line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                {video.title}
              </h3>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/videos" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--primary)] rounded-full font-ui font-bold text-sm">
            Ver todos os videos <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white font-ui font-bold text-lg line-clamp-1 flex-1 mr-4">{selected.title}</h2>
                <div className="flex items-center gap-3">
                  <a href={selected.url} target="_blank" rel="noopener" className="text-white/50 hover:text-white flex items-center gap-1 text-sm font-ui">
                    <ExternalLink className="w-4 h-4" /> YouTube
                  </a>
                  <button onClick={() => setSelected(null)} className="text-white/50 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                <iframe src={selected.embed + "?autoplay=1&rel=0"} className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
