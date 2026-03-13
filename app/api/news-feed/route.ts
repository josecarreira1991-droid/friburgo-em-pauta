import { NextResponse } from "next/server";
import { fetchLocalNews } from "@/lib/news/aggregator";

export async function GET() {
  try {
    const noticias = await fetchLocalNews();
    return NextResponse.json({ noticias });
  } catch {
    return NextResponse.json({ noticias: [] });
  }
}
