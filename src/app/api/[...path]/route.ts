import { NextRequest, NextResponse } from "next/server";

async function handleRequest(req: NextRequest, method: "GET" | "POST") {
  try {
    const headers: { "Content-Type": string; Authorization?: string } = {
      "Content-Type": "application/json",
    };

    const urlBase = `${process.env.CORE_API}${req.nextUrl.pathname.replace(
      `/api`,
      ""
    )}`;
    const searchParams = req.nextUrl.searchParams;
    const url = searchParams.toString()
      ? `${urlBase}?${searchParams.toString()}`
      : urlBase;

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
