import { NextRequest, NextResponse } from "next/server";
import { generateBRoll } from "@/lib/runway/client";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const result = await generateBRoll({ textPrompt: prompt });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Falha ao gerar video Runway" }, { status: 500 });
  }
}
