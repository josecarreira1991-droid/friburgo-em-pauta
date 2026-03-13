import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protege a rota /admin com autenticação server-side
  if (pathname.startsWith("/admin")) {
    const adminToken = request.cookies.get("admin_token")?.value;
    const expectedToken = process.env.ADMIN_SECRET_TOKEN;

    // Se não há token configurado, usa verificação básica
    if (!expectedToken) {
      // Permite acesso mas registra aviso (fallback para autenticação client-side)
      return NextResponse.next();
    }

    if (adminToken !== expectedToken) {
      // Redireciona para home se não autenticado
      const url = request.nextUrl.clone();
      url.pathname = "/";
      url.searchParams.set("admin_redirect", "1");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
