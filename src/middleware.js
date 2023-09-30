import { NextResponse } from "next/server";

import { myResponse } from "./utils/myResponse";

const allowedOrigins = process.env.NODE_ENV === "production" ? ["https://www.ecomerce.raihanmd.site", "https://ecomerce.raihanmd.site", "https://next-auth.js.org"] : ["http://localhost:3000"];

export async function middleware(request) {
  const origin = request.headers.get("origin");

  if (origin && !allowedOrigins.includes(origin)) {
    return myResponse(400, "Bad request.", "Bad request.");
  }

  if (request.nextUrl.pathname.startsWith("/api") && !request.nextUrl.pathname.startsWith("/api/auth") && request.method === "POST") {
    if (request.headers.get("API-Key") !== process.env.NEXT_PUBLIC_API_KEY) {
      return myResponse(400, "Guest can't do the POST request.", "Bad request.");
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
