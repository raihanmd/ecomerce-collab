import { prefixId } from "@/const/prefixId";
import { myResponse } from "@/utils/myResponse";
import { getNanoid } from "@/utils/getNanoid";
import { registerUser } from "@/database/user/registerUser";

export async function POST(req) {
  try {
    const { userOAuthId, userEmail, userName, userProvider, userImage } = await req.json();

    if (!userEmail || !userName || !userOAuthId || !userProvider || !userImage) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const userId = prefixId.User + getNanoid();
    const newUser = { userId, userName, userEmail, userOAuthId, userProvider, userImage };
    await registerUser(newUser);
    return myResponse(201, { isSucceed: 1 }, "Data added successfully.");
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
