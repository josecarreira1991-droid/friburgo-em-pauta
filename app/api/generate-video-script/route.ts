import { NextRequest, NextResponse } from "next/server";
import { generateVideoScript } from "@/lib/openai/video-script";

export async function POST(req: NextRequest) {
  try {
    const { tema } = await req.json();
    const script = await generateVideoScript(tema);
    return NextResponse.json({ script });
  } catch {
    return NextResponse.json({ error: "Falha ao gerar roteiro" }, { status: 500 });
  }
}
