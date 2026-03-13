export interface NewsItem {
  titulo: string;
  resumo: string;
  link: string;
  fonte: string;
  imagem_url?: string;
  publicado_em?: string;
}

export async function fetchLocalNews(): Promise<NewsItem[]> {
  const feeds = [
    {
      url: "https://news.google.com/rss/search?q=Nova+Friburgo+RJ&hl=pt-BR&gl=BR&ceid=BR:pt-419",
      fonte: "Google News",
    },
  ];

  const allNews: NewsItem[] = [];

  for (const feed of feeds) {
    try {
      const res = await fetch(feed.url, { next: { revalidate: 1800 } });
      const text = await res.text();
      const itemRegex = new RegExp("<item>(.*?)</item>", "gs");
      const items: string[] = [];
      let match;
      while ((match = itemRegex.exec(text)) !== null) {
        items.push(match[0]);
      }

      for (const item of items.slice(0, 10)) {
        const titleMatch = item.match(/<title>(.*?)<\/title>/);
        const linkMatch = item.match(/<link>(.*?)<\/link>/);
        const dateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);

        const titulo = titleMatch?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, "") || "";
        const link = linkMatch?.[1] || "";
        const pubDate = dateMatch?.[1] || "";

        if (titulo && link) {
          allNews.push({
            titulo,
            resumo: "",
            link,
            fonte: feed.fonte,
            publicado_em: pubDate,
          });
        }
      }
    } catch {
      // Skip failed feeds
    }
  }

  return allNews;
}
