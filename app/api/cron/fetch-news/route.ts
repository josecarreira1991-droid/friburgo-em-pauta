import { NextResponse } from "next/server";
import { fetchLocalNews } from "@/lib/news/aggregator";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const news = await fetchLocalNews();
    // TODO: save to database when connected
    return NextResponse.json({ fetched: news.length, timestamp: new Date().toISOString() });
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
