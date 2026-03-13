"use client";

import { useEffect, useState } from "react";

export function NewsTicker() {
  const [news, setNews] = useState<string[]>([
    "Marcos Medeiros — Pre-candidato a Deputado Federal 2026 pelo DC 27",
    "TV do Povo ao vivo todos os dias — assista na pagina TV",
    "Mais de 3.500 programas no canal TV do Povo no YouTube",
    "Nova Friburgo: 203 mil habitantes na regiao serrana do RJ",
    "Proposta de incentivos fiscais: o imposto vai embora do municipio. Nao volta.",
    "Denuncie um problema em Nova Friburgo — sua voz chega direto ao Marcos",
  ]);

  useEffect(() => {
    fetch("/data/news-feed.json")
      .then(r => r.json())
      .then((data: { title?: string }[]) => {
        if (data.length > 0) {
          const titles = data.slice(0, 8).map((n) => n.title).filter(Boolean) as string[];
          if (titles.length > 0) setNews(titles);
        }
      })
      .catch(() => {});
  }, []);

  // Duplica apenas uma vez para criar o efeito de loop contínuo sem repetição visual
  const items = news.length < 6 ? [...news, ...news] : news;

  return (
    <div className="bg-[var(--accent)] text-[var(--primary)] py-1.5 overflow-hidden" role="marquee" aria-label="Últimas notícias">
      <div className="animate-marquee whitespace-nowrap inline-flex gap-16 font-ui text-xs font-semibold">
        {items.map((item, i) => (
          <span key={i} className="inline-block">
            <span className="mr-4 opacity-50">◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
