import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const VOTOS_FILE = path.join(DATA_DIR, "votos.json");

const VOTOS_INICIAIS: Record<string, number> = {
  saude: 847, educacao: 623, seguranca: 589, infraestrutura: 712,
  esporte: 234, cultura: 198, meio_ambiente: 445, transporte: 378,
  saneamento: 312, emprego: 534,
};

async function lerVotos(): Promise<Record<string, number>> {
  try {
    if (!existsSync(VOTOS_FILE)) return VOTOS_INICIAIS;
    const raw = await readFile(VOTOS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return VOTOS_INICIAIS;
  }
}

async function salvarVotos(votos: Record<string, number>) {
  if (!existsSync(DATA_DIR)) await mkdir(DATA_DIR, { recursive: true });
  await writeFile(VOTOS_FILE, JSON.stringify(votos, null, 2));
}

export async function GET() {
  const votos = await lerVotos();
  return NextResponse.json(votos);
}

export async function POST(req: NextRequest) {
  try {
    const { temas } = await req.json();
    if (!Array.isArray(temas) || temas.length === 0) {
      return NextResponse.json({ error: "Temas inválidos" }, { status: 400 });
    }
    const votos = await lerVotos();
    temas.forEach((t: string) => {
      if (typeof t === "string" && t.length < 50) {
        votos[t] = (votos[t] || 0) + 1;
      }
    });
    await salvarVotos(votos);
    return NextResponse.json({ ok: true, votos });
  } catch {
    return NextResponse.json({ error: "Erro ao salvar votos" }, { status: 500 });
  }
}
