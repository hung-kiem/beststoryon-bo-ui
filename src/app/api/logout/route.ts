import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 },
    );

    response.cookies.set("accessToken", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "lax",
    });
    return response;
  } catch (error) {
    console.error("Proxy error:", error);

    return new NextResponse(
      JSON.stringify({
        message: "An error occurred while forwarding the request",
      }),
      { status: 500 },
    );
  }
}
