"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, CheckCircle2, Clock, Filter } from "lucide-react";

const CATEGORIAS = ["Todos", "Saude", "Educacao", "Cultura", "Esporte", "Meio Ambiente", "Infraestrutura", "Social"];

const PROJETOS = Array.from({ length: 50 }, (_, i) => ({
  numero: `PLO ${String(1842 - i).padStart(3, "0")}`,
  ano: 2024 - Math.floor(i / 10),
  ementa: [
    "Dispoe sobre a criacao de programa de incentivo fiscal para empresas locais",
    "Denomina logradouro publico no bairro de Olaria",
    "Institui a Semana Municipal de Prevencao ao Cancer",
    "Autoriza convenio para implantacao de ensino tecnico",
    "Cria programa de acessibilidade nos espacos publicos",
    "Dispoe sobre protecao ambiental nas areas serranas",
    "Institui programa municipal de apoio ao esporte amador",
    "Cria centro de referencia da mulher friburguense",
    "Dispoe sobre transparencia nas contas publicas",
    "Autoriza a criacao de polo tecnologico municipal",
  ][i % 10],
  status: i % 4 === 0 ? "Em tramitacao" : "Aprovado",
  aprovado: i % 4 !== 0,
  categoria: ["Social", "Infraestrutura", "Saude", "Educacao", "Social", "Meio Ambiente", "Esporte", "Social", "Social", "Educacao"][i % 10],
}));

export default function ProjetosPage() {
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [page, setPage] = useState(1);
  const PER_PAGE = 20;

  const filtered = PROJETOS.filter((p) => {
    const matchSearch = p.ementa.toLowerCase().includes(search.toLowerCase()) || p.numero.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoria === "Todos" || p.categoria === categoria;
    return matchSearch && matchCat;
  });

  const paginated = filtered.slice(0, page * PER_PAGE);

  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      <section className="bg-[var(--primary)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Trabalho Legislativo</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">1.842+ Projetos de Lei</h1>
            <p className="text-white/60 font-ui mt-3 max-w-2xl mx-auto">
              Cada projeto tem o nome de um bairro, uma escola, uma familia de Nova Friburgo
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--primary)]/30" />
            <input
              type="text"
              placeholder="Buscar por numero ou tema..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border)] bg-white font-ui text-sm outline-none focus:border-[var(--accent)]"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoria(cat)}
                className={"px-4 py-2 rounded-full text-sm font-ui font-medium whitespace-nowrap transition-all " +
                  (categoria === cat
                    ? "bg-[var(--accent)] text-[var(--primary)]"
                    : "bg-white border border-[var(--border)] text-[var(--primary)]/60 hover:border-[var(--accent)]")
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm font-ui text-[var(--primary)]/50 mb-4">
          <Filter className="w-4 h-4 inline mr-1" />
          {filtered.length} projetos encontrados
        </p>

        <div className="rounded-xl border border-[var(--border)] bg-white overflow-hidden">
          {paginated.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: Math.min(i * 0.02, 0.5) }}
              className="grid md:grid-cols-[120px_80px_1fr_120px_140px] gap-2 md:gap-4 px-6 py-4 border-b border-[var(--border)] hover:bg-[var(--bg-paper)]/50 transition-colors items-center"
            >
              <span className="font-ui font-semibold text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--accent)]" />
                {proj.numero}
              </span>
              <span className="font-ui text-sm text-[var(--primary)]/50">{proj.ano}</span>
              <span className="text-sm leading-relaxed">{proj.ementa}</span>
              <span className="text-xs font-ui bg-[var(--bg-paper)] px-2 py-1 rounded-full text-center">{proj.categoria}</span>
              <span className={"inline-flex items-center gap-1 text-xs font-ui font-semibold px-2 py-1 rounded-full w-fit " +
                (proj.aprovado ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700")}>
                {proj.aprovado ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                {proj.status}
              </span>
            </motion.div>
          ))}
        </div>

        {paginated.length < filtered.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setPage(page + 1)}
              className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--primary)] px-6 py-3 rounded-xl font-ui font-semibold transition-all"
            >
              Carregar mais projetos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
