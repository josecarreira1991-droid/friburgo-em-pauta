"use client";

import { useEffect, useState } from "react";

const FALLBACK_NEWS = [
  "Nova Friburgo investe em infraestrutura para 2026",
  "Marcos Medeiros apresenta proposta para reter impostos no municipio",
  "UPA de Nova Friburgo completa mais um ano de funcionamento",
  "Estacio de Sa forma nova turma em Nova Friburgo",
  "Camara Municipal aprova novos projetos para a cidade",
  "Hospital do Cancer amplia atendimento na regiao serrana",
];

export function NewsTicker() {
  const [news, setNews] = useState<string[]>(FALLBACK_NEWS);

  useEffect(() => {
    fetch("/api/news-feed")
      .then((r) => r.json())
      .then((data) => {
        if (data.noticias?.length) {
          setNews(data.noticias.map((n: { titulo: string }) => n.titulo));
        }
      })
      .catch(() => {});
  }, []);

  const duplicated = [...news, ...news];

  return (
    <div className="bg-[var(--bg-dark)] text-white/90 py-2 overflow-hidden font-ui text-sm relative z-50">
      <div className="flex items-center">
        <span className="bg-[var(--accent)] text-[var(--primary)] font-bold px-4 py-1 text-xs uppercase tracking-wider shrink-0 mr-4">
          AO VIVO
        </span>
        <div className="overflow-hidden flex-1">
          <div className="news-ticker flex whitespace-nowrap gap-12">
            {duplicated.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
