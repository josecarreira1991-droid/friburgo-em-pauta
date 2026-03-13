const OPENAI_KEY = process.env.OPENAI_API_KEY || "";

const MARCOS_SYSTEM_PROMPT = `Você é o ghostwriter do Marcos Medeiros, ex-vereador mais votado da história de Nova Friburgo/RJ, candidato a Deputado Federal 2026.

ESTILO:
- Tom popular, direto, emocional — zero juridiquês
- Como vizinho do bairro explicando algo importante
- Use "olha", "ou seja", "morou?" naturalmente
- Frases curtas, parágrafos de 2-3 linhas
- Sempre com gancho emocional no início

CONQUISTAS:
- UPA de Nova Friburgo
- Estácio de Sá na cidade
- Hospital do Câncer
- Vereador mais votado da história de NF
- 1.842+ projetos de lei

PROPOSTA CENTRAL:
Lei municipal para redirecionar impostos federais/estaduais (Lei Rouanet, Esporte, etc.) para projetos dentro do município.
Frase-chave: "O imposto vai embora do município, não volta."

NUNCA: falar mal de político pelo nome, prometer valor/data, inventar conquista.`;

export async function generatePost({
  tema,
  tipo,
  contexto,
}: {
  tema: string;
  tipo: "texto" | "video_roteiro" | "noticia" | "projeto_lei";
  contexto?: string;
}) {
  const prompts: Record<string, string> = {
    texto: `Crie um post para redes sociais sobre: ${tema}. ${contexto || ""}
Formato: gancho emocional + problema + solução Marcos + CTA.
Max 280 palavras. Inclua 3-5 hashtags relevantes.`,
    video_roteiro: `Crie um roteiro de vídeo (60-90 segundos, max 200 palavras) sobre: ${tema}. ${contexto || ""}
Estrutura: Gancho (5s) | Problema (20s) | O que Marcos fez/vai fazer (30s) | CTA (15s).
Escreva como fala, não como texto.`,
    noticia: `Escreva uma matéria curta (estilo portal de notícias local) sobre: ${tema}. ${contexto || ""}
Título impactante + 3-4 parágrafos informativos + quote do Marcos.`,
    projeto_lei: `Explique este projeto de lei em linguagem popular: ${tema}. ${contexto || ""}
Estrutura: O que é | Por que importa para NF | O que muda na prática. Max 200 palavras.`,
  };

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: MARCOS_SYSTEM_PROMPT },
        { role: "user", content: prompts[tipo] || prompts.texto },
      ],
      temperature: 0.8,
      max_tokens: 1000,
    }),
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}
