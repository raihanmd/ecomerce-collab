import { verificationUser } from "@/database/user/verificationUser";
import { myResponse } from "@/utils/myResponse";

export async function POST(req) {
  try {
    const { userId, userProvince, userProvinceId, userCity, userCityId, userBio, userShopDesc } = await req.json();

    if (!userId || !userProvince || !userProvinceId || !userCity || !userCityId || !userBio || !userShopDesc) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const verif = { userId, userProvince, userCity, userProvinceId, userCityId, userBio, userShopDesc };

    await verificationUser(verif);

    return myResponse(200, { isSucceed: 1 }, `User validation successfully, you now have Rp.1.000.000 free balance.`);
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
