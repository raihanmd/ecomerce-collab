import { NextResponse } from "next/server";

export const myResponse = (statusCode, payload, message) => {
  return NextResponse.json(
    {
      statusCode,
      payload,
      message,
      metadata: {
        prev: "",
        next: "",
        current: "",
      },
    },
    {
      status: statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
      },
    }
  );
};
