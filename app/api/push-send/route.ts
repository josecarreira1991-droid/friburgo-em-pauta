import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";
import fs from "fs/promises";

const SUBS_FILE = "/opt/friburgo-em-pauta/data/push-subscribers.json";

export async function POST(req: NextRequest) {
  try {
    const { title, body, url, image } = await req.json();

    const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    const privateKey = process.env.VAPID_PRIVATE_KEY;
    const subject = process.env.VAPID_SUBJECT || "mailto:contato@friburgoempauta.com.br";

    if (!publicKey || !privateKey) {
      return NextResponse.json({ error: "VAPID keys not configured" }, { status: 500 });
    }

    webpush.setVapidDetails(subject, publicKey, privateKey);

    let subs: any[] = [];
    try {
      const data = await fs.readFile(SUBS_FILE, "utf8");
      subs = JSON.parse(data);
    } catch {
      return NextResponse.json({ error: "No subscribers" }, { status: 404 });
    }

    const payload = JSON.stringify({
      title: title || "Marcos Medeiros AO VIVO!",
      body: body || "TV do Povo esta ao vivo agora. Assista!",
      url: url || "/tv",
      image: image || "/images/marcos-perfil.jpg",
      tag: "live-" + Date.now(),
    });

    let sent = 0;
    let failed = 0;
    const validSubs: any[] = [];

    for (const sub of subs) {
      try {
        await webpush.sendNotification(sub, payload);
        validSubs.push(sub);
        sent++;
      } catch (err: any) {
        if (err.statusCode === 404 || err.statusCode === 410) {
          failed++;
        } else {
          validSubs.push(sub);
          failed++;
        }
      }
    }

    // Remove expired subscriptions
    await fs.writeFile(SUBS_FILE, JSON.stringify(validSubs, null, 2));

    return NextResponse.json({ sent, failed, total: validSubs.length });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao enviar" }, { status: 500 });
  }
}
