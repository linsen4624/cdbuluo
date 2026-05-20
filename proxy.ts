import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  // 1. 获取 session
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const isLoggedIn = !!session;
  const { pathname } = request.nextUrl;
  // 2. 定义公开路由（无需认证）
  const exactPublicPaths = ["/"]; //这里需要精确匹配才会生效，而不是下面那种前缀匹配
  const publicPaths = [
    "/login",
    "/signup",
    "/api/auth",
    "/forgetpassword",
    "/resetpassword",
  ]; // Better Auth 的 API 路由
  const isPublicPath =
    exactPublicPaths.includes(pathname) ||
    publicPaths.some((path) => pathname.startsWith(path));

  // 3. 保护私有路由
  if (!isLoggedIn && !isPublicPath) {
    // 未登录用户访问受保护页面：重定向到登录页
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 4. 已登录用户访问登录/注册页：重定向到首页
  if (isLoggedIn && (pathname === "/login" || pathname === "/signup")) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  // 5. 其他情况正常响应
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images).*)"],
};
