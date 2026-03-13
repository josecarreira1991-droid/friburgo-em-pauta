"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, ExternalLink, RefreshCw } from "lucide-react";

interface Noticia {
  titulo: string;
  resumo: string;
  link: string;
  fonte: string;
  publicado_em?: string;
}

export default function NoticiasPage() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = () => {
    setLoading(true);
    fetch("/api/news-feed")
      .then((r) => r.json())
      .then((data) => setNoticias(data.noticias || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchNews(); }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      <section className="bg-[var(--primary)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Tempo Real</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">Noticias de Nova Friburgo</h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex justify-end mb-6">
          <button onClick={fetchNews} className="flex items-center gap-2 text-sm font-ui text-[var(--accent)] hover:underline">
            <RefreshCw className={"w-4 h-4 " + (loading ? "animate-spin" : "")} /> Atualizar
          </button>
        </div>

        {loading && noticias.length === 0 ? (
          <div className="space-y-4">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="bg-white rounded-xl p-6 border border-[var(--border)] animate-pulse">
                <div className="h-5 bg-[var(--bg-paper)] rounded w-3/4 mb-3" />
                <div className="h-4 bg-[var(--bg-paper)] rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {noticias.map((n, i) => (
              <motion.a
                key={i}
                href={n.link}
                target="_blank"
                rel="noopener"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="block bg-white rounded-xl p-6 border border-[var(--border)] hover:border-[var(--accent)]/30 hover:shadow-sm transition-all group"
              >
                <h3 className="font-display text-lg font-bold group-hover:text-[var(--accent)] transition-colors flex items-start gap-2">
                  {n.titulo}
                  <ExternalLink className="w-4 h-4 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <div className="flex items-center gap-3 mt-3 text-xs font-ui text-[var(--primary)]/40">
                  <span className="bg-[var(--bg-paper)] px-2 py-0.5 rounded">{n.fonte}</span>
                  {n.publicado_em && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(n.publicado_em).toLocaleDateString("pt-BR")}</span>}
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {!loading && noticias.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[var(--primary)]/40 font-ui">Nenhuma noticia encontrada no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}
