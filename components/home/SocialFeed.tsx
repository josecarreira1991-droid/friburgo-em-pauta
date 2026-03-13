"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook, MessageSquare, Heart, MessageCircle, Share2, ExternalLink } from "lucide-react";

const DEMO_POSTS = [
  {
    platform: "instagram",
    icon: <Instagram className="w-4 h-4" />,
    author: "@marquinhosmedeirosnf",
    content: "O imposto vai embora do municipio, nao volta. Minha proposta: manter esse dinheiro AQUI, financiando cultura, esporte e educacao em Nova Friburgo.",
    likes: 234,
    comments: 45,
    time: "2h",
  },
  {
    platform: "facebook",
    icon: <Facebook className="w-4 h-4" />,
    author: "Marcos Medeiros",
    content: "Voce sabia que a UPA de Nova Friburgo nasceu de uma luta no plenario? Saude nao se negocia — se conquista. E a gente conquistou!",
    likes: 189,
    comments: 32,
    time: "5h",
  },
  {
    platform: "threads",
    icon: <MessageSquare className="w-4 h-4" />,
    author: "marquinhosmedeirosnf",
    content: "1.842 projetos de lei. Cada um deles tem o nome de um bairro, uma escola, uma familia de Friburgo. Trabalho nao e promessa — e numero.",
    likes: 156,
    comments: 28,
    time: "8h",
  },
];

const PLATFORM_COLORS: Record<string, string> = {
  instagram: "bg-gradient-to-r from-purple-500 to-pink-500",
  facebook: "bg-blue-600",
  threads: "bg-black",
};

export function SocialFeed() {
  return (
    <section className="py-20 bg-[var(--bg-paper)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Redes Sociais</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Marcos nas Redes</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {DEMO_POSTS.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl border border-[var(--border)] overflow-hidden card-hover"
            >
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={"w-8 h-8 rounded-full flex items-center justify-center text-white " + PLATFORM_COLORS[post.platform]}>
                    {post.icon}
                  </div>
                  <div>
                    <p className="font-ui font-semibold text-sm">{post.author}</p>
                    <p className="text-xs text-[var(--primary)]/40 font-ui">{post.time} atras</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-4">{post.content}</p>
                <div className="flex items-center gap-4 text-[var(--primary)]/40 text-xs font-ui">
                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{post.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" />{post.comments}</span>
                  <span className="flex items-center gap-1 ml-auto"><Share2 className="w-3.5 h-3.5" /></span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-10">
          <a href="https://instagram.com/marquinhosmedeirosnf" target="_blank" rel="noopener" className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-5 py-2.5 rounded-full text-sm font-ui font-semibold hover:bg-[var(--primary-med)] transition-all">
            <Instagram className="w-4 h-4" /> Seguir no Instagram <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
