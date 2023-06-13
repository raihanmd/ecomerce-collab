import { headers } from "next/headers";

import { myResponse } from "@/utils/myResponse";
import { createWallet } from "@/database/wallet/createWallet";

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

    const { userId } = await req.json();

    if (!userId) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const userBalance = 1000000;

    const newWallet = { userId, userBalance };

    await createWallet(newWallet);

    return myResponse(200, { isSucceed: 1 }, `Wallet added successfully, you now have Rp.1.000.000 free balance.`);
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
