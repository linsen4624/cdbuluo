import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const protectedPaths = ["/console", "/services"];
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.includes(path),
  );

  if (isProtectedPath && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
