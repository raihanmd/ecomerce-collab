import { NextResponse } from "next/server";
import { myResponse } from "./utils/myResponse";

const authMiddleware = ["/api/login", "/api/cart", "/api/checkout", "/api/order", "/api/products", "/api/wishlist", "/api/wallet"];

const allowedOrigins = process.env.NODE_ENV === "production" ? ["https://www.ecomerce.raihanmd.site", "https://ecomerce.raihanmd.site"] : ["http://localhost:3000"];

export async function middleware(request) {
  const origin = request.headers.get("origin");

  if (origin && !allowedOrigins.includes(origin)) {
    return myResponse(400, "Bad request.", "Bad request.");
  }

  if (request.nextUrl.pathname.startsWith("/api") && !request.nextUrl.pathname.startsWith("/api/auth") && request.method === "POST") {
    if (request.headers.get("API-Key") !== process.env.API_KEY) {
      return myResponse(403, "Guest can't do the POST request.", "Forbidden.");
    }
    //! masi ambigu di bawah
    // if (authMiddleware.includes(request.nextUrl.pathname) && !request.headers.get("Authentication")) {
    //   return myResponse(403, "Authentication required.", "Forbidden.");
    // }
  }

  return NextResponse.next();
}

export const config = {
  mather: "/api/:path*",
};
