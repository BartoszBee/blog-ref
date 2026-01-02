import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type Role = "author" | "admin";

function parseSession(value: string): { userId: string; role: Role } | null {
  const [userId, role] = value.split(":");

  if (!userId || (role !== "author" && role !== "admin")) {
    return null;
  }

  return { userId, role };
}

export function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get("session");

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const session = parseSession(sessionCookie.value);

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const pathname = request.nextUrl.pathname;


  if (pathname.startsWith("/admin") && session.role !== "admin") {
    return NextResponse.redirect(new URL("/posts", request.url));
  }
 
  // test jan:author
  if (pathname.startsWith("/posts/new") && session.role === "author") {
    return NextResponse.next();
  }

  // test jan:admin
  if (pathname.startsWith("/posts/new") && session.role === "admin") {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/posts/new",
    "/admin/:path*",
  ],
};
