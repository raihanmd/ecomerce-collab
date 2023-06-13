import { getIdUser } from "@/database/user/getIdUser";
import { myResponse } from "@/utils/myResponse";

export async function GET(req, { params }) {
  try {
    const { userName } = params;

    const userId = await getIdUser(userName);

    if (userId.length === 0) {
      const err = new Error(`404 not found.`);
      err.statusCode = 404;
      err.payload = `No one user named ${userName}`;
      throw err;
    }

    return myResponse(200, userId, "Data retrieved successfully.");
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
