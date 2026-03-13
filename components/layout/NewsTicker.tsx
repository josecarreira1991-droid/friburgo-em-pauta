"use client";

import { useEffect, useState } from "react";

export function NewsTicker() {
  const [news, setNews] = useState<string[]>([
    "Marcos Medeiros — Pre-candidato a Deputado Federal 2026 pelo DC 27",
    "TV do Povo ao vivo todos os dias — assista na pagina TV",
    "Mais de 3.500 programas no canal TV do Povo no YouTube",
    "Nova Friburgo: 203 mil habitantes na regiao serrana do RJ",
  ]);

  useEffect(() => {
    fetch("/data/news-feed.json")
      .then(r => r.json())
      .then((data: any[]) => {
        if (data.length > 0) {
          const titles = data.slice(0, 10).map((n: any) => n.title).filter(Boolean);
          if (titles.length > 0) setNews(titles);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-[var(--accent)] text-[var(--primary)] py-1.5 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex gap-12 font-ui text-xs font-semibold">
        {[...news, ...news].map((item, i) => (
          <span key={i} className="inline-block">{item}</span>
        ))}
      </div>
    </div>
  );
}
