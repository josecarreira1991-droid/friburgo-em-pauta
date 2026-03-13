import { NextRequest, NextResponse } from "next/server";
import { chatWithAgent } from "@/lib/myceo/client";

const FALLBACK_RESPONSES: Record<string, string> = {
  saude: "Olha, saude e prioridade numero um. Ja conseguimos a UPA pra Friburgo e garantimos o Hospital do Cancer. Agora o proximo passo e levar mais investimento pro estado todo. Morou?",
  educacao: "Educacao transforma vida, morou? Trouxemos a Estacio de Sa pra Friburgo. Milhares de jovens formados. E isso e so o comeco.",
  imposto: "O imposto vai embora do municipio, nao volta. Minha proposta e simples: o dinheiro que ja existe, que ja e pago, que ja e lei — fica aqui em Nova Friburgo.",
  projeto: "Sao mais de 1.842 projetos de lei. Cada um tem o nome de um bairro, uma escola, uma familia de Friburgo. Acessa la no portal em /projetos pra ver todos.",
  default: "Que bom que voce quer saber mais! Me fala especificamente o que te interessa — saude, educacao, projetos de lei, ou qualquer tema de Nova Friburgo. Estou aqui!",
};

function getFallbackReply(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("saude") || lower.includes("upa") || lower.includes("hospital")) return FALLBACK_RESPONSES.saude;
  if (lower.includes("educa") || lower.includes("escola") || lower.includes("estacio")) return FALLBACK_RESPONSES.educacao;
  if (lower.includes("imposto") || lower.includes("fiscal") || lower.includes("dinheiro")) return FALLBACK_RESPONSES.imposto;
  if (lower.includes("projeto") || lower.includes("lei")) return FALLBACK_RESPONSES.projeto;
  return FALLBACK_RESPONSES.default;
}

export async function POST(req: NextRequest) {
  try {
    const { sessionId, message } = await req.json();

    if (process.env.MYCEO_API_KEY) {
      const result = await chatWithAgent({ sessionId, userMessage: message });
      return NextResponse.json({ reply: result.reply, sessionId: result.sessionId || sessionId });
    }

    return NextResponse.json({ reply: getFallbackReply(message), sessionId });
  } catch {
    return NextResponse.json(
      { reply: "Eita, deu um problema aqui. Tenta de novo daqui a pouco!", sessionId: "" },
      { status: 500 }
    );
  }
}
