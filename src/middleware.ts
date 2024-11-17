import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Lấy token từ cookie
  const accessToken = request.cookies.get("accessToken");
  const currentPath = new URL(request.url).pathname;

  // Trường hợp: Nếu không có token và không phải yêu cầu vào /signIn
  if (!accessToken && currentPath !== "/signIn") {
    // Chuyển hướng đến /signIn
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  // Trường hợp: Nếu có token và đang cố truy cập vào /signIn
  if (accessToken && currentPath === "/signIn") {
    // Chuyển hướng đến /story
    return NextResponse.redirect(new URL("/story", request.url));
  }

  // Nếu có token hoặc yêu cầu vào /signIn khi không có token, tiếp tục xử lý yêu cầu
  return NextResponse.next();
}

export const config = {
  // Áp dụng middleware cho tất cả các đường dẫn trừ các đường dẫn được loại trừ
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
};
