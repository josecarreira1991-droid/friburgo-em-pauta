let resendInstance: any = null;

async function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resendInstance) {
    const { Resend } = await import("resend");
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
}

export async function sendNewsletterEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const resend = await getResend();
  if (!resend) return { error: "No API key" };
  return resend.emails.send({
    from: process.env.RESEND_FROM || "marcos@friburgoempautam.com.br",
    to,
    subject,
    html,
  });
}

export async function sendWelcomeEmail({ to, nome }: { to: string; nome: string }) {
  return sendNewsletterEmail({
    to,
    subject: "Bem-vindo ao Friburgo em Pauta!",
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="color: #0F2447; font-size: 28px;">Olha, ${nome}!</h1>
        <p style="color: #333; font-size: 18px; line-height: 1.6;">
          Que bom ter voce com a gente. A partir de agora voce vai receber
          as novidades mais importantes de Nova Friburgo direto no seu email.
        </p>
        <p style="color: #333; font-size: 18px; line-height: 1.6;">
          Pode contar comigo. Estamos juntos por Friburgo!
        </p>
        <p style="color: #D4A017; font-size: 20px; font-weight: bold;">
          Marcos Medeiros
        </p>
        <hr style="border: 1px solid #E2DDD3; margin: 30px 0;" />
        <p style="color: #666; font-size: 14px;">
          Siga no Instagram: @marquinhosmedeirosnf
        </p>
      </div>
    `,
  });
}
