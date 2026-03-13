import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const LEADS_FILE = path.join(process.cwd(), "data", "leads.csv");
const APOIADORES_FILE = path.join(process.cwd(), "data", "apoiadores.csv");

// Base de apoiadores reais (votos 2008 + seguidores conhecidos)
const BASE_APOIADORES = 1247;

async function contarLinhas(filePath: string): Promise<number> {
  try {
    if (!existsSync(filePath)) return 0;
    const content = await readFile(filePath, "utf-8");
    const lines = content.split("\n").filter(l => l.trim().length > 0);
    // Subtrai 1 para o cabeçalho CSV
    return Math.max(0, lines.length - 1);
  } catch {
    return 0;
  }
}

export async function GET() {
  const leadsCount = await contarLinhas(LEADS_FILE);
  const apoiadoresCount = await contarLinhas(APOIADORES_FILE);
  const total = BASE_APOIADORES + leadsCount + apoiadoresCount;
  return NextResponse.json({ total, leads: leadsCount, apoiadores: apoiadoresCount });
}
