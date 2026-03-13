import { NextResponse } from "next/server";
import { generatePost } from "@/lib/openai/post-generator";

export const dynamic = "force-dynamic";

const TEMAS_ROTACAO = [
  { tema: "incentivos fiscais para municipio", tipo: "texto" as const },
  { tema: "conquistas de Marcos Medeiros na saude", tipo: "texto" as const },
  { tema: "educacao em Nova Friburgo", tipo: "texto" as const },
  { tema: "meio ambiente na regiao serrana", tipo: "texto" as const },
  { tema: "esporte e cultura local", tipo: "texto" as const },
  { tema: "projetos de lei aprovados", tipo: "texto" as const },
];

export async function GET() {
  try {
    const hour = new Date().getHours();
    const temaIndex = Math.floor(hour / 4) % TEMAS_ROTACAO.length;
    const { tema, tipo } = TEMAS_ROTACAO[temaIndex];

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ status: "skipped", reason: "No API key" });
    }

    const content = await generatePost({ tema, tipo });

    // TODO: Save to DB and publish to social when APIs are connected

    return NextResponse.json({
      status: "generated",
      tema,
      preview: content.substring(0, 200),
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Content generation failed" }, { status: 500 });
  }
}
