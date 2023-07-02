import { myResponse } from "@/utils/myResponse";
import { convertToMinResolutionAndWebP } from "@/utils/resizeAndConvertWEBP";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { image } = await req.json();

    const convertedImage = await convertToMinResolutionAndWebP(image);

    // return NextResponse.json(
    //   {
    //     statusCode: 200,
    //     payload: convertedImage,
    //     message: "Image successfully converted.",
    //     metadata: {
    //       prev: "",
    //       next: "",
    //       current: "",
    //     },
    //   },
    //   {
    //     status: 200,
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    //       "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
    //       "Content-Type": "image/*",
    //     },
    //   }
    // );
    return myResponse(200, { blobImage: convertedImage }, "Image converted successfully.");
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
