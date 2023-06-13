import { headers } from "next/headers";

import { prefixId } from "@/const/prefixId";
import { myResponse } from "@/utils/myResponse";
import { getNanoid } from "@/utils/getNanoid";
import { registerUser } from "@/database/user/registerUser";

export async function POST(req) {
  try {
    const headersList = headers();
    const APIKey = headersList.get("API-Key");

    if (!APIKey || APIKey !== process.env.API_KEY) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Guest can't do the POST request.";
      throw err;
    }

    const { userGoogleId, userEmail, userName } = await req.json();

    if (!userEmail || !userName || !userGoogleId) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const userId = prefixId.User + getNanoid();
    const newUser = { userId, userName, userEmail, userGoogleId };
    await registerUser(newUser);
    return myResponse(201, { isSucceed: 1 }, "Data added successfully.");
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
