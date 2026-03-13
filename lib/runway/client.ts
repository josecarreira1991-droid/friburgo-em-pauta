const RUNWAY_API = "https://api.dev.runwayml.com/v1";

export async function generateBRoll({ textPrompt }: { textPrompt: string }) {
  const res = await fetch(`${RUNWAY_API}/image_to_video`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RUNWAY_API_KEY}`,
      "X-Runway-Version": "2024-11-06",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gen3a_turbo",
      promptText: textPrompt,
      duration: 10,
      ratio: "9:16",
    }),
  });
  return res.json();
}

export const VIDEO_PROMPTS: Record<string, string> = {
  saude: "Modern Brazilian healthcare clinic golden hour, community feeling, cinematic shallow depth of field",
  educacao: "Brazilian university campus students walking, hopeful atmosphere, documentary style",
  meio_ambiente: "Aerial view green mountains Nova Friburgo Brazil, misty morning, cinematic drone",
  cultura: "Vibrant Brazilian street festival, colorful flags, warm evening light",
  esporte: "Community sports field in Brazilian mountain town, kids playing, golden light",
  default: "Nova Friburgo Brazil mountain city aerial, beautiful landscape, golden hour cinematic",
};
