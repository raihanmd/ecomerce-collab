import { myResponse } from "@/utils/myResponse";
import { encodeImageToBlurhash } from "@/utils/encodeImageToBlurhash";

export async function POST(req) {
  try {
    const { productImage } = await req.json();

    const blurhash = await encodeImageToBlurhash(productImage);

    return myResponse(200, { blurhash }, `Blurhash returned successfully.`);
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
