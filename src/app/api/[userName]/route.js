import { getUserPage } from "@/database/user/getUserPage";
import { myResponse } from "@/utils/myResponse";

export async function GET(req, { params }) {
  try {
    const { userName } = params;

    const userPage = await getUserPage(userName);

    if (userPage.length === 0) {
      const err = new Error(`404 not found.`);
      err.statusCode = 404;
      err.payload = `No one user named ${userName}`;
      throw err;
    }

    if (!userPage[0].productId) {
      return myResponse(200, { userName: userPage[0].userName }, "Data retrieved successfully.");
    }

    return myResponse(200, userPage, "Data retrieved successfully.");
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
