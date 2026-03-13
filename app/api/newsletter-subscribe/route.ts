import { NextRequest, NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email/resend";
import { sendWhatsAppMessage } from "@/lib/myceo/client";
import { appendFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

async function saveLeadToCSV(data: Record<string, string>) {
  try {
    const dir = path.join(process.cwd(), "data");
    if (!existsSync(dir)) await mkdir(dir, { recursive: true });

    const filePath = path.join(dir, "leads.csv");
    const timestamp = new Date().toISOString();
    const row = [
      timestamp,
      data.nome || "",
      data.email || "",
      data.whatsapp || "",
      data.bairro || "",
      data.profissao || "",
      data.origem || "newsletter",
    ].map(v => `"${v.replace(/"/g, '""')}"`).join(",");

    const header = '"timestamp","nome","email","whatsapp","bairro","profissao","origem"\n';
    if (!existsSync(filePath)) {
      await appendFile(filePath, header);
    }
    await appendFile(filePath, row + "\n");
  } catch {
    // Silently fail — não bloqueia o cadastro
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, email, whatsapp, bairro, profissao, origem } = body;

    // Salva lead em CSV local para exportação de campanha
    await saveLeadToCSV({ nome, email, whatsapp, bairro, profissao, origem });

    // Envia email de boas-vindas
    if (email && process.env.RESEND_API_KEY) {
      await sendWelcomeEmail({ to: email, nome: nome || "amigo" });
    }

    // Envia mensagem de boas-vindas no WhatsApp
    if (whatsapp && process.env.MYCEO_API_KEY) {
      const origemLabel = origem?.includes("apoio") ? "apoiador" :
                          origem?.includes("enquete") ? "participante da enquete" :
                          "amigo";
      await sendWhatsAppMessage({
        to: whatsapp.replace(/\D/g, ""),
        message: `Olá ${nome || "amigo"}! Aqui é o Marcos Medeiros. Que bom ter você como ${origemLabel}! A partir de agora você recebe as novidades de Nova Friburgo direto no WhatsApp. Juntos vamos levar Friburgo para Brasília! DC 27 🇧🇷`,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Falha ao cadastrar" }, { status: 500 });
  }
}
