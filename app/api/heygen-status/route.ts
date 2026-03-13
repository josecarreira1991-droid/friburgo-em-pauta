import { NextRequest, NextResponse } from "next/server";
import { getVideoStatus } from "@/lib/heygen/client";

export async function GET(req: NextRequest) {
  const videoId = req.nextUrl.searchParams.get("id");
  if (!videoId) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  try {
    const result = await getVideoStatus(videoId);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Falha ao verificar status" }, { status: 500 });
  }
}
