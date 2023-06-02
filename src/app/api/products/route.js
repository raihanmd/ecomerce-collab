import slugify from "slugify";
import { headers } from "next/headers";

import { prefixId } from "@/const/prefixId";
import { getNanoid } from "@/utils/getNanoid";
import { myResponse } from "@/utils/myResponse";
import { addProduct } from "@/database/product/addProduct";
import { getAllProducts } from "@/database/product/getAllProduct";
import { getWalletById } from "@/database/wallet/getWalletById";

export async function GET(req) {
  try {
    const products = await getAllProducts();
    return myResponse(200, products, "Data successfully retrieved.");
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}

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

    const { idUser, nameProduct, priceProduct, categoryProduct, descriptionProduct, quantityProduct } = await req.json();

    const userWallet = await getWalletById(idUser);

    if (!userWallet) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "You must have the wallet first.";
      throw err;
    }

    const idProduct = prefixId.Products + getNanoid(),
      slugProduct = slugify(nameProduct, { lower: true });

    if (!idUser || !nameProduct || !priceProduct || !categoryProduct || !descriptionProduct || !quantityProduct || !idProduct || !slugProduct) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const newProduct = { idProduct, nameProduct, priceProduct, categoryProduct, descriptionProduct, quantityProduct, slugProduct, idUser };
    await addProduct(newProduct);
    return myResponse(200, { isSucceed: 1 }, `Product added successfully.`);
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
