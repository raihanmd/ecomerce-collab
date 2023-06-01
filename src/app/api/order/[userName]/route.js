import { getOrder } from "@/database/order/getOrder";
import { myResponse } from "@/utils/myResponse";

export async function GET(req, { params }) {
  try {
    const { userName } = params;

    const orderUser = await getOrder(userName);

    if (orderUser.length === 0) {
      const err = new Error(`404 not found.`);
      err.statusCode = 404;
      err.payload = `No one user named ${userName}`;
      throw err;
    }

    if (!orderUser[0].productId) {
      return myResponse(404, `${userName} has never placed an order yet.`, "404 not found.");
    }

    return myResponse(200, orderUser, "Data retrieved successfully.");
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
