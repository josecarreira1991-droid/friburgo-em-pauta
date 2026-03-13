"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

const DEMO_PROJETOS = [
  { numero: "PLO 001", ano: 2024, ementa: "Cria o banco de dados municipal de empresas para redirecionamento de incentivos fiscais", status: "Em tramitacao", aprovado: false },
  { numero: "PLO 892", ano: 2023, ementa: "Institui a Semana Municipal de Consciencia sobre o Cancer", status: "Aprovado", aprovado: true },
  { numero: "PLO 756", ano: 2023, ementa: "Denomina logradouro publico no bairro de Olaria", status: "Aprovado", aprovado: true },
  { numero: "PLO 634", ano: 2022, ementa: "Dispoe sobre a criacao de programa municipal de incentivo ao esporte", status: "Aprovado", aprovado: true },
  { numero: "PLO 589", ano: 2022, ementa: "Autoriza o poder executivo a criar centro de referencia da mulher", status: "Aprovado", aprovado: true },
  { numero: "PLO 423", ano: 2021, ementa: "Institui programa de acessibilidade nos espacos publicos municipais", status: "Em tramitacao", aprovado: false },
  { numero: "PLO 312", ano: 2021, ementa: "Cria programa de protecao ambiental nas areas de preservacao", status: "Aprovado", aprovado: true },
  { numero: "PLO 198", ano: 2020, ementa: "Denomina praca publica no bairro de Conselheiro Paulino", status: "Aprovado", aprovado: true },
  { numero: "PLO 087", ano: 2020, ementa: "Dispoe sobre transparencia nas contas publicas municipais", status: "Aprovado", aprovado: true },
  { numero: "PLO 045", ano: 2019, ementa: "Autoriza convenio para implantacao de ensino tecnico profissionalizante", status: "Aprovado", aprovado: true },
];

export function ProjectsPreview() {
  const [search, setSearch] = useState("");
  const filtered = DEMO_PROJETOS.filter(
    (p) =>
      p.ementa.toLowerCase().includes(search.toLowerCase()) ||
      p.numero.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
        >
          <div>
            <span className="text-[var(--accent)] font-ui font-semibold text-sm uppercase tracking-wider">Trabalho Legislativo</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">1.842+ Projetos de Lei</h2>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--primary)]/30" />
            <input
              type="text"
              placeholder="Buscar projetos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-paper)] font-ui text-sm outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>
        </motion.div>

        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <div className="hidden md:grid grid-cols-[120px_80px_1fr_140px] bg-[var(--bg-paper)] px-6 py-3 text-xs font-ui font-semibold uppercase tracking-wider text-[var(--primary)]/50">
            <span>Numero</span>
            <span>Ano</span>
            <span>Ementa</span>
            <span>Status</span>
          </div>
          {filtered.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-[120px_80px_1fr_140px] gap-2 md:gap-0 px-6 py-4 border-t border-[var(--border)] hover:bg-[var(--bg-paper)]/50 transition-colors items-center"
            >
              <span className="font-ui font-semibold text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--accent)]" />
                {proj.numero}
              </span>
              <span className="font-ui text-sm text-[var(--primary)]/50">{proj.ano}</span>
              <span className="text-sm leading-relaxed">{proj.ementa}</span>
              <span className={"inline-flex items-center gap-1 text-xs font-ui font-semibold px-2 py-1 rounded-full w-fit " +
                (proj.aprovado
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700")}>
                {proj.aprovado ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                {proj.status}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 text-[var(--accent)] font-ui font-semibold hover:underline"
          >
            Ver todos os 1.842+ projetos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
