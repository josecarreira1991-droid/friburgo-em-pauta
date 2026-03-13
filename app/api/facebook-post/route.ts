import { NextRequest, NextResponse } from "next/server";
import { publishToFacebook } from "@/lib/social/facebook";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await publishToFacebook(body);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Falha ao publicar no Facebook" }, { status: 500 });
  }
}
