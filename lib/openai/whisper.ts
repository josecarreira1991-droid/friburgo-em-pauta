export async function transcribeAudio(audioBuffer: ArrayBuffer, filename: string) {
  const formData = new FormData();
  formData.append("file", new Blob([audioBuffer]), filename);
  formData.append("model", "whisper-1");
  formData.append("language", "pt");

  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: formData,
  });
  return res.json();
}
