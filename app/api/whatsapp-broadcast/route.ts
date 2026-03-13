import { NextRequest, NextResponse } from "next/server";
import { broadcastMessage } from "@/lib/myceo/client";

export async function POST(req: NextRequest) {
  try {
    const { message, mediaUrl } = await req.json();
    const result = await broadcastMessage({ message, mediaUrl });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Falha no broadcast" }, { status: 500 });
  }
}
