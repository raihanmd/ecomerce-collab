import { headers } from "next/headers";

import { prefixId } from "@/const/prefixId";
import { getNanoid } from "@/utils/getNanoid";
import { myResponse } from "@/utils/myResponse";
import { createWishlist } from "@/database/wishlist/createWishlist";

export async function POST(req) {
  try {
    const headersList = headers();

    const APIKey = headersList.get("API-Key");

    if (!APIKey || APIKey !== process.env.API_KEY) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Guest can't do the POST request.";
      throw err;
    }

    const { idUser, idProduct } = await req.json();

    if (!idUser || !idProduct) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const idWishlist = prefixId.Wishlist + getNanoid();

    const newWishlist = { idWishlist, idUser, idProduct };

    await createWishlist(newWishlist);

    return myResponse(200, { isSucceed: 1 }, `Wishlist added successfully.`);
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
