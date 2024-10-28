import { NextRequest, NextResponse } from "next/server";

const scopeKey = "_next__sc" as any;
const redirectKey = "_next__rd" as any;

export async function middleware(request: NextRequest) {
  let response: NextResponse;
  if (new URL(request.url).pathname == "/") {
    response = NextResponse.redirect(new URL("/dashboard", request.url));
    return response;
  } else {
    response = NextResponse.next();
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|login|images).*)",
};
