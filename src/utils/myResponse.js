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
    { status: statusCode }
  );
};
