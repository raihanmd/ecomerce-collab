import { getDetailProduct } from "@/database/product/getDetailProduct";
import { getUserDetail } from "@/database/user/getUserDetail";
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
    const { userImage: ownerImage, userShopDescription: ownerShopDescription } = await getUserDetail(params.userName);

    const detailProduct = { ...product, ownerImage, ownerShopDescription };

    return myResponse(200, detailProduct, "Data successfully retrieved.");
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
