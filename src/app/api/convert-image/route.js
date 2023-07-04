import { myResponse } from "@/utils/myResponse";
import { convertToMinResolutionAndWebP } from "@/utils/convertToMinResolutionAndWebP";

export async function POST(req) {
  try {
    const { image } = await req.json();

    if (!image) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const uint8Array = new Uint8Array(
      atob(image)
        .split("")
        .map((char) => char.charCodeAt(0))
    );

    const { blobImage, base64Image } = await convertToMinResolutionAndWebP(uint8Array);

    return myResponse(200, { blobImage, base64Image }, "Image converted successfully.");
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
