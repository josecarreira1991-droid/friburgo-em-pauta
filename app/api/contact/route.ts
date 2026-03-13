import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { sendWhatsAppMessage } from "@/lib/myceo/client";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "contato@friburgoempauta.com.br";
// WhatsApp do Marcos para receber notificações de denúncias
const MARCOS_WHATSAPP = process.env.MARCOS_WHATSAPP || "5522998954874";

async function saveToDenunciasCSV(data: Record<string, string>) {
  try {
    const dir = path.join(process.cwd(), "data");
    if (!existsSync(dir)) await mkdir(dir, { recursive: true });

    const filePath = path.join(dir, "denuncias.csv");
    const timestamp = new Date().toISOString();
    const row = [
      timestamp,
      data.nome || "Anônimo",
      data.email || "",
      data.whatsapp || "",
      data.mensagem || "",
    ].map(v => `"${v.replace(/"/g, '""')}"`).join(",");

    const header = '"timestamp","nome","email","whatsapp","mensagem"\n';
    if (!existsSync(filePath)) {
      await appendFile(filePath, header);
    }
    await appendFile(filePath, row + "\n");
  } catch {
    // Silently fail
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, email, whatsapp, mensagem } = body;

    if (!mensagem) {
      return NextResponse.json({ error: "Mensagem é obrigatória" }, { status: 400 });
    }

    const isDenuncia = mensagem.includes("[DENÚNCIA");
    const isApoiador = mensagem.includes("[NOVO APOIADOR]");

    // Salva denúncias em CSV
    if (isDenuncia) {
      await saveToDenunciasCSV({ nome: nome || "Anônimo", email, whatsapp, mensagem });
    }

    // Notifica Marcos via WhatsApp sobre denúncias e apoiadores
    if ((isDenuncia || isApoiador) && process.env.MYCEO_API_KEY) {
      const tipoMsg = isDenuncia ? "🚨 NOVA DENÚNCIA" : "🤝 NOVO APOIADOR";
      const preview = mensagem.substring(0, 200);
      await sendWhatsAppMessage({
        to: MARCOS_WHATSAPP,
        message: `${tipoMsg} no portal Friburgo em Pauta!\n\nDe: ${nome || "Anônimo"}\nWhatsApp: ${whatsapp || "Não informado"}\n\n${preview}${mensagem.length > 200 ? "..." : ""}`,
      });
    }

    // Tenta enviar via Resend se configurado
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      const subject = isDenuncia ? `[DENÚNCIA] ${nome || "Anônimo"} — Portal Friburgo em Pauta` :
                      isApoiador ? `[APOIADOR] ${nome || "Novo apoiador"} — Portal Friburgo em Pauta` :
                      `[Portal] Mensagem de ${nome || "Visitante"}`;
      await resend.emails.send({
        from: "Portal Marcos Medeiros <noreply@friburgoempauta.com.br>",
        to: [CONTACT_EMAIL],
        replyTo: email || undefined,
        subject,
        html: `
          <h2 style="color: #0F2447;">${subject}</h2>
          <p><strong>Nome:</strong> ${nome || "Anônimo"}</p>
          <p><strong>Email:</strong> ${email || "Não informado"}</p>
          <p><strong>WhatsApp:</strong> ${whatsapp || "Não informado"}</p>
          <hr />
          <pre style="background: #f5f5f5; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${mensagem}</pre>
          <hr />
          <p style="color: #999; font-size: 12px;">Enviado via portal Friburgo em Pauta — ${new Date().toLocaleString("pt-BR")}</p>
        `,
      });
      return NextResponse.json({ success: true, method: "email" });
    }

    // Fallback: salva em arquivo
    const fs = await import("fs/promises");
    const timestamp = new Date().toISOString();
    const logLine = `\n[${timestamp}] Nome: ${nome} | Email: ${email} | WhatsApp: ${whatsapp}\n${mensagem}\n${"=".repeat(60)}\n`;
    try {
      await fs.appendFile(path.join(process.cwd(), "data", "messages.log"), logLine);
    } catch {
      await fs.appendFile("/tmp/friburgo-messages.log", logLine);
    }

    return NextResponse.json({ success: true, method: "log" });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Erro ao enviar" }, { status: 500 });
  }
}
