import { NextRequest, NextResponse } from "next/server";
import { publishToInstagram } from "@/lib/social/instagram";
import { publishToFacebook } from "@/lib/social/facebook";
import { broadcastMessage } from "@/lib/myceo/client";
import webpush from "web-push";
import fs from "fs/promises";

const SUBS_FILE = "/opt/friburgo-em-pauta/data/push-subscribers.json";
const LIVE_STATE_FILE = "/opt/friburgo-em-pauta/data/live-state.json";

async function getSubscribers(): Promise<any[]> {
  try {
    const data = await fs.readFile(SUBS_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveLiveState(state: object) {
  await fs.mkdir("/opt/friburgo-em-pauta/data", { recursive: true });
  await fs.writeFile(LIVE_STATE_FILE, JSON.stringify(state, null, 2));
}

export async function GET() {
  try {
    const data = await fs.readFile(LIVE_STATE_FILE, "utf8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({ isLive: false, startedAt: null, title: "", viewers: 0 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { action, title, streamUrl, thumbnailUrl } = await req.json();

    if (action === "stop") {
      await saveLiveState({ isLive: false, startedAt: null, title: "", viewers: 0, stoppedAt: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }) });
      return NextResponse.json({ success: true, action: "stopped" });
    }

    // START LIVE
    const liveTitle = title || "Marcos Medeiros AO VIVO — TV do Povo";
    const liveUrl = streamUrl || "https://friburgoempauta.com.br/tv";
    const thumb = thumbnailUrl || "https://friburgoempauta.com.br/images/marcos-perfil.jpg";
    const now = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit" });

    await saveLiveState({
      isLive: true,
      startedAt: new Date().toISOString(),
      startedAtBR: now,
      title: liveTitle,
      viewers: 0,
      streamUrl: liveUrl,
    });

    const caption = `🔴 AO VIVO AGORA — ${liveTitle}\n\n📺 Assista em: ${liveUrl}\n\n#NovafriburgoAoVivo #MarcosMediaeiros #TvdoPovo #NovafriburgoRJ #DeputadoFederal2026 #DC27`;
    const whatsappMsg = `🔴 *MARCOS MEDEIROS AO VIVO AGORA!*\n\n📺 *${liveTitle}*\n\nAssista agora: ${liveUrl}\n\n_TV do Povo — Nova Friburgo_`;

    const results: Record<string, any> = {};

    // Instagram
    try {
      results.instagram = await publishToInstagram({
        caption,
        imageUrl: thumb,
      });
    } catch (e: any) {
      results.instagram = { error: e?.message || "Falha" };
    }

    // Facebook
    try {
      results.facebook = await publishToFacebook({
        message: caption,
        link: liveUrl,
        imageUrl: thumb,
      });
    } catch (e: any) {
      results.facebook = { error: e?.message || "Falha" };
    }

    // Threads (via Instagram API)
    try {
      const threadsRes = await fetch("https://graph.threads.net/v1.0/me/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          media_type: "TEXT",
          text: caption,
          access_token: process.env.THREADS_ACCESS_TOKEN || process.env.INSTAGRAM_ACCESS_TOKEN,
        }),
      });
      const threadsData = await threadsRes.json();
      if (threadsData.id) {
        await fetch("https://graph.threads.net/v1.0/me/threads_publish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            creation_id: threadsData.id,
            access_token: process.env.THREADS_ACCESS_TOKEN || process.env.INSTAGRAM_ACCESS_TOKEN,
          }),
        });
      }
      results.threads = threadsData;
    } catch (e: any) {
      results.threads = { error: e?.message || "Falha" };
    }

    // WhatsApp Broadcast
    try {
      results.whatsapp = await broadcastMessage({ message: whatsappMsg, mediaUrl: thumb });
    } catch (e: any) {
      results.whatsapp = { error: e?.message || "Falha" };
    }

    // Push Notifications
    const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    const privateKey = process.env.VAPID_PRIVATE_KEY;
    const subject = process.env.VAPID_SUBJECT || "mailto:contato@friburgoempauta.com.br";

    if (publicKey && privateKey) {
      webpush.setVapidDetails(subject, publicKey, privateKey);
      const subs = await getSubscribers();
      const payload = JSON.stringify({
        title: "🔴 " + liveTitle,
        body: "Marcos Medeiros está AO VIVO agora! Toque para assistir.",
        url: "/tv",
        image: thumb,
        tag: "live-" + Date.now(),
      });
      let sent = 0;
      const validSubs: any[] = [];
      for (const sub of subs) {
        try {
          await webpush.sendNotification(sub, payload);
          validSubs.push(sub);
          sent++;
        } catch {
          // expired subscription, skip
        }
      }
      await fs.writeFile(SUBS_FILE, JSON.stringify(validSubs, null, 2));
      results.push = { sent, total: validSubs.length };
    } else {
      results.push = { error: "VAPID keys not configured" };
    }

    return NextResponse.json({ success: true, action: "started", title: liveTitle, notifications: results });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Erro interno" }, { status: 500 });
  }
}
