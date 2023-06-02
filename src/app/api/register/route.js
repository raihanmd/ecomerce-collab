import bcrypt from "bcrypt";
import { headers } from "next/headers";

import { prefixId } from "@/const/prefixId";
import { myResponse } from "@/utils/myResponse";
import { getNanoid } from "@/utils/getNanoid";
import { getErrMessage, passwordIsValid } from "@/utils/passwordValid";
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

    const { firstName, lastName, userName, password, cityUser } = await req.json();

    if (!firstName || !lastName || !userName || !password || !city) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    if (!passwordIsValid(password)) {
      const errorValidate = getErrMessage(password);
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = errorValidate.map((err) => err.message);
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 13);
    const idUser = prefixId.User + getNanoid();
    const newUser = { idUser, firstName, lastName, userName: userName.toLowerCase(), hashedPassword, cityUser };
    await registerUser(newUser);
    return myResponse(201, { isSucceed: 1 }, "Data added successfully.");
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
