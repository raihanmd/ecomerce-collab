import { getImageURL } from "@/firebase/getImageURL";
import { uploadImage } from "@/firebase/uploadImage";
import { getNanoid } from "@/utils/getNanoid";
import { imageHandler } from "@/utils/imageHandler";
import { myResponse } from "@/utils/myResponse";

export async function POST(req) {
  try {
    const { imageURL } = await req.json();

    if (!imageURL) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const res = await fetch(imageURL);

    console.log(res);

    const arrayBuffer = await res.arrayBuffer();

    const imageProduct = `${getNanoid(20)}.webp`;

    const resultBlob = await imageHandler(arrayBuffer, 250);

    await uploadImage(resultBlob, imageProduct).catch((err) => {
      throw err;
    });

    const productImageURL = await getImageURL(imageProduct).catch((err) => {
      throw err;
    });

    // URL.revokeObjectURL(imageURL);
    return myResponse(200, { productImageURL }, "User valid for login.");
  } catch (err) {
    // URL.revokeObjectURL(imageURL);
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
