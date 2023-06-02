import { headers } from "next/headers";

import getUnixTimestamps from "@/utils/getUnixTimestamps";
import { prefixId } from "@/const/prefixId";
import { getNanoid } from "@/utils/getNanoid";
import { myResponse } from "@/utils/myResponse";
import { createOrder } from "@/database/order/createOrder";

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

    const { idUser, idProduct, quantityProduct } = await req.json();

    if (!idUser || !idProduct || !quantityProduct) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const idOrder = prefixId.Orders + getNanoid(),
      orderDate = getUnixTimestamps();

    const newOrder = { idUser, idProduct, quantityProduct, idOrder, orderDate };

    await createOrder(newOrder);

    return myResponse(200, { isSucceed: 1 }, `Order added successfully.`);
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
