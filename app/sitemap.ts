import { MetadataRoute } from "next";

const BASE_URL = "http://187.77.210.204:3080";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { url: "/", priority: 1.0, changeFrequency: "daily" as const },
    { url: "/proposta", priority: 0.95, changeFrequency: "weekly" as const },
    { url: "/proposta/documento", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/apoiar", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/denuncias", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/enquete", priority: 0.85, changeFrequency: "daily" as const },
    { url: "/tv", priority: 0.8, changeFrequency: "daily" as const },
    { url: "/noticias", priority: 0.8, changeFrequency: "daily" as const },
    { url: "/conquistas", priority: 0.75, changeFrequency: "monthly" as const },
    { url: "/projetos", priority: 0.75, changeFrequency: "weekly" as const },
    { url: "/sobre", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/contato", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/chat", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  return staticPages.map(page => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
