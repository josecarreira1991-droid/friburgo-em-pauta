import { NextRequest, NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email/resend";
import { sendWhatsAppMessage } from "@/lib/myceo/client";

export async function POST(req: NextRequest) {
  try {
    const { nome, email, whatsapp, bairro } = await req.json();

    // TODO: Save to database when connected

    if (email && process.env.RESEND_API_KEY) {
      await sendWelcomeEmail({ to: email, nome: nome || "amigo" });
    }

    if (whatsapp && process.env.MYCEO_API_KEY) {
      await sendWhatsAppMessage({
        to: whatsapp.replace(/\D/g, ""),
        message: `Ola ${nome || "amigo"}! Aqui e o Marcos Medeiros. Que bom ter voce com a gente! A partir de agora voce recebe as novidades de Nova Friburgo direto no WhatsApp. Estamos juntos!`,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Falha ao cadastrar" }, { status: 500 });
  }
}
