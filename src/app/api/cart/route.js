import { prefixId } from "@/const/prefixId";
import { createCart } from "@/database/cart/createCart";
import { getCart } from "@/database/cart/getCart";
import { updateCart } from "@/database/cart/updateCart";
import { getNameUserById } from "@/database/user/getNameUserById";
import { getNanoid } from "@/utils/getNanoid";
import { myResponse } from "@/utils/myResponse";

export async function POST(req) {
  try {
    const { token, idUser, idProduct, quantityProduct } = await req.json();

    if (!token || token !== process.env.OWNER_TOKEN) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Guest can't do the POST request.";
      throw err;
    }

    if (!idUser || !idProduct || !quantityProduct) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const { userName } = await getNameUserById(idUser);
    const userCart = await getCart(userName);

    if (userCart.length > 0) {
      const prevCart = { idUser, idProduct, quantityProduct };

      await updateCart(prevCart);

      return myResponse(200, { isSucceed: 1 }, `Cart updated successfully.`);
    }

    const idCart = prefixId.Cart + getNanoid();

    const newCart = { idCart, idUser, idProduct, quantityProduct };

    await createCart(newCart);

    return myResponse(200, { isSucceed: 1 }, `Cart added successfully.`);
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
