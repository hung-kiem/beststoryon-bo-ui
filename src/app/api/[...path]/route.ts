import { NextRequest, NextResponse } from "next/server";

function extendTokenExpiry(response: NextResponse, token: string) {
  response.cookies.set("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: process.env.TOKEN_EXPIRATION
      ? parseInt(process.env.TOKEN_EXPIRATION, 10)
      : 15 * 60,
  });
}

async function handleRequest(req: NextRequest, method: "GET" | "POST") {
  try {
    const cookies = req.cookies;
    const accessToken = cookies.get("accessToken");
    // if (!accessToken) {
    //   return NextResponse.json({ message: "Login failed" }, { status: 401 });
    // }

    const headers: { "Content-Type": string; Authorization?: string } = {
      "Content-Type": "application/json",
    };
    // if (accessToken) {
    //   headers["Authorization"] = `Bearer ${accessToken.value}`;
    // }

    const urlBase = `${process.env.CORE_API}${req.nextUrl.pathname.replace(
      `/api`,
      ""
    )}`;
    const searchParams = req.nextUrl.searchParams;
    const url = `${urlBase}?${searchParams.toString()}`;

    const fetchOptions: RequestInit = {
      method,
      headers,
    };

    if (method === "POST") {
      try {
        const body = await req.json();
        console.log("********************* req.body: ", body);
        fetchOptions.body = JSON.stringify(body);
      } catch (error) {
        console.error("Error parsing JSON body:", error);
      }
    }

    const response = await fetch(url, fetchOptions);
    console.log("********************* response: ", response);

    const data = await response.json();
    console.log("********************* data: ", data);
    const nextResponse = NextResponse.json(data, { status: response.status });

    // if (response.ok) {
    //   extendTokenExpiry(nextResponse, accessToken.value);
    // }

    return nextResponse;
  } catch (error) {
    console.error("********************* ERROR: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return handleRequest(req, "GET");
}

export async function POST(req: NextRequest) {
  return handleRequest(req, "POST");
}

export async function handler(req: NextRequest) {
  if (req.method === "GET") {
    return handleRequest(req, "GET");
  } else if (req.method === "POST") {
    return handleRequest(req, "POST");
  } else {
    return NextResponse.json(
      { error: `Method ${req.method} Not Allowed` },
      { status: 405 }
    );
  }
}
