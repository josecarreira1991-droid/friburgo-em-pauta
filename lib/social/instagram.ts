export async function publishToInstagram({
  caption,
  imageUrl,
  videoUrl,
}: {
  caption: string;
  imageUrl?: string;
  videoUrl?: string;
}) {
  const userId = process.env.INSTAGRAM_USER_ID;
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const baseUrl = "https://graph.facebook.com/v19.0";

  const mediaPayload: Record<string, string> = { caption, access_token: token! };
  if (videoUrl) {
    mediaPayload.media_type = "REELS";
    mediaPayload.video_url = videoUrl;
  } else if (imageUrl) {
    mediaPayload.image_url = imageUrl;
  }

  const container = await fetch(`${baseUrl}/${userId}/media`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mediaPayload),
  }).then((r) => r.json());

  const publish = await fetch(`${baseUrl}/${userId}/media_publish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ creation_id: container.id, access_token: token }),
  }).then((r) => r.json());

  return publish;
}
