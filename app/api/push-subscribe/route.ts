import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";

const SUBS_FILE = "/opt/friburgo-em-pauta/data/push-subscribers.json";

async function getSubscribers(): Promise<any[]> {
  try {
    const data = await fs.readFile(SUBS_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveSubscribers(subs: any[]) {
  await fs.mkdir("/opt/friburgo-em-pauta/data", { recursive: true });
  await fs.writeFile(SUBS_FILE, JSON.stringify(subs, null, 2));
}

export async function POST(req: NextRequest) {
  try {
    const { subscription, action } = await req.json();

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json({ error: "Subscription invalida" }, { status: 400 });
    }

    const subs = await getSubscribers();

    if (action === "unsubscribe") {
      const filtered = subs.filter((s: any) => s.endpoint !== subscription.endpoint);
      await saveSubscribers(filtered);
      return NextResponse.json({ success: true, total: filtered.length });
    }

    // Subscribe
    const exists = subs.find((s: any) => s.endpoint === subscription.endpoint);
    if (!exists) {
      subs.push({
        ...subscription,
        subscribedAt: new Date().toISOString(),
        city: "Nova Friburgo",
      });
      await saveSubscribers(subs);
    }

    return NextResponse.json({ success: true, total: subs.length });
  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function GET() {
  const subs = await getSubscribers();
  return NextResponse.json({ total: subs.length });
}
