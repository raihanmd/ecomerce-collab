import { getUserDetail } from "@/database/user/getUserDetail";
import { getUserProduct } from "@/database/user/getUserProduct";
import { myResponse } from "@/utils/myResponse";

export async function GET(req, { params }) {
  try {
    const { userName } = params;

    const userProduct = await getUserProduct(userName);

    if (userProduct.length === 0) {
      const err = new Error(`404 not found.`);
      err.statusCode = 404;
      err.payload = `No one user named ${userName}`;
      throw err;
    }

    const { userImage, userBanner, userBio, totalRating, userShopDescription, userProvince, userCity } = await getUserDetail(userName);

    if (!userProduct[0].productId) {
      return myResponse(200, { userName: userProduct[0].userName }, "Data retrieved successfully.");
    }

    const response = {
      userName,
      userImage,
      userBanner,
      userBio,
      userShopDescription,
      userProvince,
      userCity,
      totalRating,
      userProduct,
    };

    return myResponse(200, response, "Data retrieved successfully.");
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
