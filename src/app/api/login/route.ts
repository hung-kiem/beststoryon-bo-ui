import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const headers: { "Content-Type": string; Authorization?: string } = {
      "Content-Type": "application/json",
    };

    const url = `${process.env.CORE_API}/api/auth/login`;
    console.log("********************* url: ", url);

    const fetchOptions: RequestInit = {
      method: "POST",
      headers,
    };

    const body = await req.json();
    console.log("********************* req.body: ", body);
    fetchOptions.body = JSON.stringify(body);

    const response = await fetch(url, fetchOptions);
    console.log("********************* response: ", response);

    if (response.status !== 200) {
      return NextResponse.json({ message: "Login failed" }, { status: 401 });
    }

    const data = await response.json();
    console.log("********************* data: ", data);

    const accessToken = data.jwtToken;
    const expiredAt = new Date();
    expiredAt.setSeconds(Number(process.env.TOKEN_EXPIRATION) || 15 * 60);
    if (accessToken && expiredAt) {
      const response = NextResponse.json(
        { message: "Login successful", data },
        { status: 200 }
      );

      response.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        expires: new Date(expiredAt),
        sameSite: "lax",
      });

      return response;
    } else {
      return NextResponse.json({ message: "Login failed" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
