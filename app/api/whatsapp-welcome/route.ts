import { NextRequest, NextResponse } from "next/server";
import { sendWhatsAppMessage } from "@/lib/myceo/client";

export async function POST(req: NextRequest) {
  try {
    const { to, nome } = await req.json();
    const result = await sendWhatsAppMessage({
      to,
      message: `Ola ${nome}! Bem-vindo ao Friburgo em Pauta. Aqui e o Marcos Medeiros. Pode me mandar mensagem a qualquer hora!`,
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Falha ao enviar" }, { status: 500 });
  }
}
