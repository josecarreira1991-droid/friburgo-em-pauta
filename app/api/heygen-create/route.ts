import { NextRequest, NextResponse } from "next/server";
import { createAvatarVideo } from "@/lib/heygen/client";

export async function POST(req: NextRequest) {
  try {
    const { script } = await req.json();
    const result = await createAvatarVideo({ script });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Falha ao criar video HeyGen" }, { status: 500 });
  }
}
