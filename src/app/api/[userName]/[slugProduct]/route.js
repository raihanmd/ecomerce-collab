import { getDetailProduct } from "@/database/product/getDetailProduct";
import { myResponse } from "@/utils/myResponse";

export async function GET(req, { params }) {
  try {
    const product = await getDetailProduct(params);

    if (!product) {
      const err = new Error(`404 not found.`);
      err.statusCode = 404;
      err.payload = "Product not found.";
      throw err;
    }

    return myResponse(200, product, "Data successfully retrieved.");
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
