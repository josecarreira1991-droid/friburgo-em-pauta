import { NextRequest, NextResponse } from "next/server";
import { generatePost } from "@/lib/openai/post-generator";

export async function POST(req: NextRequest) {
  try {
    const { tema, tipo, contexto } = await req.json();
    const content = await generatePost({ tema, tipo: tipo || "texto", contexto });
    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json({ error: "Falha ao gerar post" }, { status: 500 });
  }
}
