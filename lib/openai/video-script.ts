export async function generateVideoScript(tema: string) {
  const { generatePost } = await import("./post-generator");
  return generatePost({ tema, tipo: "video_roteiro" });
}
