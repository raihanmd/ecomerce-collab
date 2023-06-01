import { prefixId } from "@/const/prefixId";
import { getNanoid } from "@/utils/getNanoid";
import { myResponse } from "@/utils/myResponse";
import getUnixTimestamps from "@/utils/getUnixTimestamps";
import { createOrder } from "@/database/order/createOrder";

export async function POST(req) {
  try {
    const { token, idUser, idProduct, quantityProduct } = await req.json();

    if (!token || token !== process.env.OWNER_TOKEN) {
      const err = new Error("Forbidden.");
      err.satusCode = 403;
      err.payload = "Guest can't do the POST request.";
      throw err;
    }

    if (!idUser || !idProduct || !quantityProduct) {
      const err = new Error("Forbidden.");
      err.satusCode = 403;
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
