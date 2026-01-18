import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "session";

export function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

  // Brak sesji → login
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Sesja istnieje → przepuszczamy dalej
  // Szczegóły (rola, user) sprawdzane są w getSession() na serwerze
  return NextResponse.next();
}

export const config = {
  matcher: ["/posts/new", "/admin/:path*"],
};
