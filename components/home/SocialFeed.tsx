"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Instagram, Play, ExternalLink, Newspaper } from "lucide-react";
import Link from "next/link";

interface FeedItem {
  id: string;
  type: string;
  title: string;
  thumbnail?: string;
  url: string;
  embed?: string;
  source?: string;
  views?: number;
  duration?: string;
  timestamp: string;
}

export function SocialFeed() {
  const [feed, setFeed] = useState<FeedItem[]>([]);

  useEffect(() => {
    fetch("/data/social-feed.json")
      .then(r => r.json())
      .then((data: FeedItem[]) => setFeed(data.slice(0, 8)))
      .catch(() => {});
  }, []);

  if (feed.length === 0) return null;

  return (
    <section className="py-20 bg-[var(--bg-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Feed</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Ultimas Atualizacoes</h2>
          <p className="text-[var(--primary)]/50 font-ui text-sm mt-2">Conteudo atualizado automaticamente a cada 30 minutos</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {feed.map((item, i) => (
            <motion.a key={item.id} href={item.url} target="_blank" rel="noopener"
              initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="group bg-white rounded-xl border border-[var(--border)] overflow-hidden hover:border-[var(--accent)]/30 hover:shadow-md transition-all">
              {item.thumbnail && (
                <div className="relative aspect-video bg-[var(--bg-paper)]">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                  {item.type === "youtube" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all">
                      <div className="w-10 h-10 rounded-full bg-red-600/90 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                        <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
                      </div>
                    </div>
                  )}
                  {item.duration && (
                    <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] font-ui px-1.5 py-0.5 rounded">{item.duration}</span>
                  )}
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {item.type === "youtube" ? (
                    <span className="text-red-500 text-[10px] font-ui font-bold uppercase flex items-center gap-1"><Play className="w-3 h-3" /> YouTube</span>
                  ) : (
                    <span className="text-blue-500 text-[10px] font-ui font-bold uppercase flex items-center gap-1"><Newspaper className="w-3 h-3" /> {item.source || "Noticia"}</span>
                  )}
                </div>
                <h3 className="text-sm font-ui font-medium leading-snug line-clamp-2 group-hover:text-[var(--accent)] transition-colors">{item.title}</h3>
              </div>
            </motion.a>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/videos" className="inline-flex items-center gap-2 text-[var(--accent)] font-ui font-semibold text-sm hover:underline">
            Ver todos os videos e noticias <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
