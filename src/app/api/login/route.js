import { loginUser } from "@/database/user/loginUser";
import { myResponse } from "@/utils/myResponse";

export async function POST(req) {
  try {
    const { userOAuthId, userEmail, userProvider } = await req.json();

    if (!userOAuthId || !userEmail || !userProvider) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const userData = { userOAuthId, userEmail, userProvider };
    const validUser = await loginUser(userData);

    if (validUser === undefined) {
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
