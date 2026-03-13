export async function publishToFacebook({
  message,
  link,
  imageUrl,
}: {
  message: string;
  link?: string;
  imageUrl?: string;
}) {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const token = process.env.FACEBOOK_ACCESS_TOKEN;

  const payload: Record<string, string> = { message, access_token: token! };
  if (link) payload.link = link;

  const endpoint = imageUrl
    ? `https://graph.facebook.com/v19.0/${pageId}/photos`
    : `https://graph.facebook.com/v19.0/${pageId}/feed`;

  if (imageUrl) payload.url = imageUrl;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
