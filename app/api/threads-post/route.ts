import { NextRequest, NextResponse } from "next/server";
import { publishToThreads } from "@/lib/social/threads";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await publishToThreads(body);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Falha ao publicar no Threads" }, { status: 500 });
  }
}
