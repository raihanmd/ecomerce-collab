import bcrypt from "bcrypt";
import { headers } from "next/headers";

import { loginUser } from "@/database/user/loginUser";
import { myResponse } from "@/utils/myResponse";

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

    const { userName, password } = await req.json();

    if (!userName || !password) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const userData = await loginUser(userName);

    const isValidUser = await bcrypt.compare(password, userData.password);

    if (!isValidUser) {
      const err = new Error("Unauthorized.");
      err.statusCode = 401;
      err.payload = "Fatal: invalid username or password.";
      throw err;
    }

    return myResponse(200, { userValid: true }, "User valid for login.");
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
