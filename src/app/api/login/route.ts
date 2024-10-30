import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { LoginResponse } from "@/types/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionState = searchParams.get("session_state");
  const code = searchParams.get("code");

  if (!sessionState || !code) {
    return NextResponse.json(
      { message: "Missing session_state or code" },
      { status: 400 }
    );
  }

  const targetUrl = `${process.env.CORE_API}/v1/authentication/authorized_sso`;

  try {
    const response = await axios.get<LoginResponse>(targetUrl, {
      params: {
        session_state: sessionState,
        code: code,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = response.data;
    if (data.code !== "00") {
      return NextResponse.json({ message: "Login failed" }, { status: 401 });
    }

    const accessToken = data.data.accessToken;
    const expiredAt = new Date();
    expiredAt.setSeconds(Number(process.env.TOKEN_EXPIRATION) || 15 * 60);
    if (accessToken && expiredAt) {
      const response = NextResponse.json(
        { message: "Login successful", data: data.data },
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
