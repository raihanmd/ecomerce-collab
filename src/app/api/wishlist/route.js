import { headers } from "next/headers";

import { prefixId } from "@/const/prefixId";
import { getNanoid } from "@/utils/getNanoid";
import { myResponse } from "@/utils/myResponse";
import { createWishlist } from "@/database/wishlist/createWishlist";
import { deleteWishlist } from "@/database/wishlist/deleteWishlist";

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

    const { userId, productId } = await req.json();

    if (!userId || !productId) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const wishlistId = prefixId.Wishlist + getNanoid();

    const newWishlist = { wishlistId, userId, productId };

    await createWishlist(newWishlist);

    return myResponse(200, { isSucceed: 1 }, `Wishlist added successfully.`);
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}

export async function DELETE(req) {
  try {
    const headersList = headers();
    const APIKey = headersList.get("API-Key");

    if (!APIKey || APIKey !== process.env.API_KEY) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Guest can't do the DELETE request.";
      throw err;
    }

    const { wishlistId, userId } = await req.json();

    if (!wishlistId || !userId) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const deletedWishlist = { wishlistId, userId };

    await deleteWishlist(deletedWishlist);

    return myResponse(200, { isSucceed: 1 }, `Wishlist deleted successfully.`);
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
