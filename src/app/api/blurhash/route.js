import { myResponse } from "@/utils/myResponse";
import { encodeImageToBlurhash } from "@/utils/encodeImageToBlurhash";

export async function POST(req) {
  try {
    const { productImage } = await req.json();

    if (!productImage) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const blurhash = await encodeImageToBlurhash(productImage);

    return myResponse(200, { blurhash }, `Blurhash returned successfully.`);
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
