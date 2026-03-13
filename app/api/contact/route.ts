import { NextRequest, NextResponse } from "next/server";

// Email de destino — trocar quando tiver domínio próprio
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "contato@marcosmedeiros.net";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, email, whatsapp, mensagem } = body;

    if (!nome || !mensagem) {
      return NextResponse.json({ error: "Nome e mensagem são obrigatórios" }, { status: 400 });
    }

    // Tenta enviar via Resend se configurado
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Portal Marcos Medeiros <noreply@marcosmedeiros.net>",
        to: [CONTACT_EMAIL],
        replyTo: email || undefined,
        subject: `[Portal] Mensagem de ${nome}`,
        html: `
          <h2>Nova mensagem do portal</h2>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>Email:</strong> ${email || "Não informado"}</p>
          <p><strong>WhatsApp:</strong> ${whatsapp || "Não informado"}</p>
          <hr />
          <p>${mensagem.replace(/\n/g, "<br />")}</p>
          <hr />
          <p style="color: #999; font-size: 12px;">Enviado via portal Friburgo em Pauta</p>
        `,
      });
      return NextResponse.json({ success: true, method: "email" });
    }

    // Fallback: salva em arquivo no servidor
    const fs = await import("fs/promises");
    const timestamp = new Date().toISOString();
    const logLine = `\n[${timestamp}] Nome: ${nome} | Email: ${email} | WhatsApp: ${whatsapp} | Msg: ${mensagem}\n`;
    await fs.appendFile("/opt/friburgo-em-pauta/contact-messages.log", logLine);

    return NextResponse.json({ success: true, method: "log" });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Erro ao enviar" }, { status: 500 });
  }
}
