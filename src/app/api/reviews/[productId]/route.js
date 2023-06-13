import { getReviews } from "@/database/reviews/getReviews";
import { myResponse } from "@/utils/myResponse";

export async function GET(req, { params }) {
  try {
    const { productId } = params;

    const reviewsProduct = await getReviews(productId);

    if (reviewsProduct.length === 0) {
      const err = new Error(`404 not found.`);
      err.statusCode = 404;
      err.payload = `No reviews yet for this product.`;
      throw err;
    }

    return myResponse(200, reviewsProduct, "Data retrieved successfully.");
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
