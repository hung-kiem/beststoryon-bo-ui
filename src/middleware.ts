import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  const currentPath = new URL(request.url).pathname;

  if (!accessToken && currentPath !== "/signIn") {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  if (accessToken && currentPath === "/signIn") {
    return NextResponse.redirect(new URL("/story", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
};
