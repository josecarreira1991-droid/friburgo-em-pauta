"use client";

import { motion } from "framer-motion";

const TIMELINE = [
  { ano: 2005, titulo: "Inicio na politica", desc: "Marcos Medeiros comeca sua trajetoria politica em Nova Friburgo, ouvindo as demandas do povo.", icone: "🏛️", destaque: false },
  { ano: 2009, titulo: "Eleito vereador", desc: "Marcos Medeiros e eleito vereador pelo PTB com expressiva votacao.", icone: "🗳️", destaque: false },
  { ano: 2010, titulo: "A UPA de Nova Friburgo", desc: "Marcos luta no plenario e consegue a implantacao da UPA — atendimento de emergencia 24 horas para a populacao.", icone: "🏥", destaque: true },
  { ano: 2011, titulo: "Estacio de Sa em Friburgo", desc: "Ensino superior acessivel chega a Nova Friburgo. Milhares de jovens puderam cursar faculdade perto de casa.", icone: "🎓", destaque: true },
  { ano: 2012, titulo: "319 projetos em um ano", desc: "Ano recorde: 319 PLOs, 1.337 mocoes e 593 indicacoes. Produtividade sem precedentes na Camara.", icone: "📜", destaque: false },
  { ano: 2013, titulo: "Hospital do Cancer", desc: "A compra do predio do Hospital do Cancer foi garantida. Tratamento oncologico perto de casa para a regiao serrana.", icone: "🏛️", destaque: true },
  { ano: 2016, titulo: "Reeleito com forca", desc: "Nova Friburgo renova a confianca em Marcos Medeiros com outra votacao expressiva.", icone: "🗳️", destaque: false },
  { ano: 2020, titulo: "Vereador mais votado da historia", desc: "Marcos bate o recorde historico de votos para vereador em Nova Friburgo. O povo falou.", icone: "🏆", destaque: true },
  { ano: 2024, titulo: "1.842+ projetos de lei", desc: "Marcos atinge a marca de 1.842 projetos de lei criados — o maior legado legislativo da cidade.", icone: "📋", destaque: true },
  { ano: 2026, titulo: "Candidato a Deputado Federal", desc: "Nova Friburgo projeta Marcos para a Congresso Nacional. A luta agora e pelo povo de Nova Friburgo em Brasilia.", icone: "⭐", destaque: true },
];

export default function ConquistasPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      <section className="bg-[var(--primary)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Trajetoria</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">Conquistas de Marcos Medeiros</h1>
            <p className="text-white/60 font-ui mt-3">20 anos de luta por Nova Friburgo</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--border)]" />

          {TIMELINE.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={"relative flex items-start gap-8 mb-12 " + (i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse")}
            >
              <div className="hidden md:block md:w-1/2" />

              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                <div className={"w-16 h-16 rounded-full flex items-center justify-center text-2xl border-4 " +
                  (item.destaque
                    ? "bg-[var(--accent)] border-[var(--accent-hover)] shadow-lg shadow-[var(--accent)]/20"
                    : "bg-white border-[var(--border)]")
                }>
                  {item.icone}
                </div>
              </div>

              <div className={"ml-24 md:ml-0 md:w-1/2 " + (i % 2 === 0 ? "md:pr-12" : "md:pl-12")}>
                <div className={"bg-white rounded-xl p-6 border shadow-sm " +
                  (item.destaque ? "border-[var(--accent)]/30 shadow-[var(--accent)]/5" : "border-[var(--border)]")}>
                  <span className="text-[var(--accent)] font-ui font-bold text-sm">{item.ano}</span>
                  <h3 className="font-display text-xl font-bold mt-1 mb-2">{item.titulo}</h3>
                  <p className="text-sm text-[var(--primary)]/70 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
