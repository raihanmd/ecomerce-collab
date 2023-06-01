import { loginUser } from "@/database/user/loginUser";
import { myResponse } from "@/utils/myResponse";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { token, userName, password } = await req.json();

    if (!token || token !== process.env.OWNER_TOKEN) {
      const err = new Error("Forbidden.");
      err.satusCode = 403;
      err.payload = "Guest can't do the POST request.";
      throw err;
    }

    if (!userName || !password) {
      const err = new Error("Forbidden.");
      err.satusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const userData = await loginUser(userName);

    const isValidUser = await bcrypt.compare(password, userData.password);

    if (!isValidUser) {
      const err = new Error("Unauthorized.");
      err.satusCode = 401;
      err.payload = "Fatal: invalid username or password.";
      throw err;
    }

    return myResponse(200, { userValid: true }, "User valid for login.");
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
