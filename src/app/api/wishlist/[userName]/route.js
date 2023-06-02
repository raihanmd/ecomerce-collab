import { getWishlist } from "@/database/wishlist/getWishlist";
import { myResponse } from "@/utils/myResponse";

export async function GET(req, { params }) {
  try {
    const { userName } = params;

    const wishlistUser = await getWishlist(userName);

    if (wishlistUser.length === 0) {
      const err = new Error(`404 not found.`);
      err.statusCode = 404;
      err.payload = `No one user named ${userName}`;
      throw err;
    }

    if (!wishlistUser[0].productId) {
      return myResponse(404, `${userName} has never placed an cart yet.`, "404 not found.");
    }

    return myResponse(200, wishlistUser, "Data retrieved successfully.");
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
