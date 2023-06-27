import getUnixTimestamps from "@/utils/getUnixTimestamps";
import { prefixId } from "@/const/prefixId";
import { getNanoid } from "@/utils/getNanoid";
import { myResponse } from "@/utils/myResponse";
import { createOrder } from "@/database/order/createOrder";

export async function POST(req) {
  try {
    const { userId, productId, productQuantity } = await req.json();

    if (!userId || !productId || !productQuantity) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const orderId = prefixId.Orders + getNanoid(),
      orderDate = getUnixTimestamps();

    const newOrder = { userId, productId, productQuantity, orderId, orderDate };

    await createOrder(newOrder);

    return myResponse(200, { isSucceed: 1 }, `Order added successfully.`);
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
