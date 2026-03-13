const MYCEO_URL = process.env.MYCEO_API_URL || "https://myceo.store";
const MYCEO_KEY = process.env.MYCEO_API_KEY || "";
const MYCEO_TENANT = process.env.MYCEO_TENANT_ID || "";

const headers = {
  Authorization: `Bearer ${MYCEO_KEY}`,
  "Content-Type": "application/json",
};

export async function sendWhatsAppMessage({
  to,
  message,
  mediaUrl,
}: {
  to: string;
  message: string;
  mediaUrl?: string;
}) {
  const res = await fetch(`${MYCEO_URL}/api/whatsapp/send`, {
    method: "POST",
    headers,
    body: JSON.stringify({ tenant: MYCEO_TENANT, to, message, mediaUrl }),
  });
  return res.json();
}

export async function broadcastMessage({
  message,
  mediaUrl,
}: {
  message: string;
  mediaUrl?: string;
}) {
  const res = await fetch(`${MYCEO_URL}/api/whatsapp/broadcast`, {
    method: "POST",
    headers,
    body: JSON.stringify({ tenant: MYCEO_TENANT, message, mediaUrl }),
  });
  return res.json();
}

export async function chatWithAgent({
  sessionId,
  userMessage,
}: {
  sessionId: string;
  userMessage: string;
}) {
  const res = await fetch(`${MYCEO_URL}/api/chat`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      tenant: MYCEO_TENANT,
      sessionId,
      message: userMessage,
    }),
  });
  return res.json();
}
