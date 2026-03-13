const HEYGEN_API = "https://api.heygen.com";

export async function createAvatarVideo({
  script,
  avatarId,
  voiceId,
}: {
  script: string;
  avatarId?: string;
  voiceId?: string;
}) {
  const res = await fetch(`${HEYGEN_API}/v2/video/generate`, {
    method: "POST",
    headers: {
      "X-Api-Key": process.env.HEYGEN_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      video_inputs: [
        {
          character: {
            type: "avatar",
            avatar_id: avatarId || process.env.HEYGEN_AVATAR_ID,
            avatar_style: "normal",
          },
          voice: {
            type: "text",
            input_text: script,
            voice_id: voiceId || process.env.HEYGEN_VOICE_ID,
          },
          background: { type: "color", value: "#0F2447" },
        },
      ],
      dimension: { width: 1080, height: 1920 },
    }),
  });
  return res.json();
}

export async function getVideoStatus(videoId: string) {
  const res = await fetch(`${HEYGEN_API}/v1/video_status.get?video_id=${videoId}`, {
    headers: { "X-Api-Key": process.env.HEYGEN_API_KEY! },
  });
  return res.json();
}
