import { NextRequest, NextResponse } from "next/server";
import { publishToInstagram } from "@/lib/social/instagram";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await publishToInstagram(body);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Falha ao publicar no Instagram" }, { status: 500 });
  }
}
