import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  let response: NextResponse;
  if (new URL(request.url).pathname == "/") {
    response = NextResponse.redirect(new URL("/story", request.url));
    return response;
  } else {
    response = NextResponse.next();
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|login|images).*)",
};
