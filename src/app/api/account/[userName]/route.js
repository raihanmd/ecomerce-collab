import { getInfoUser } from "@/database/user/getInfoUser";
import { myResponse } from "@/utils/myResponse";

export async function GET(req, { params }) {
  try {
    const { userName } = params;

    const { userId, userCity, userCityId } = await getInfoUser(userName);

    return myResponse(200, { userId, userCity, userCityId }, "Data retrieved successfully.");
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
