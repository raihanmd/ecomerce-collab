import { headers } from "next/headers";

import { myResponse } from "@/utils/myResponse";
import { checkoutOrder } from "@/database/order/checkoutOrder";
import getUnixTimestamps from "@/utils/getUnixTimestamps";

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

    const { userId, orderId } = await req.json(),
      checkoutAt = getUnixTimestamps();

    if (!userId || !orderId) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const paidOrder = { userId, orderId, checkoutAt };

    await checkoutOrder(paidOrder);

    return myResponse(200, { isSucceed: 1 }, `Checkout succeed.`);
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
