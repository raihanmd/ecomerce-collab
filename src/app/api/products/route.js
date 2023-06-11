import slugify from "slugify";
import { headers } from "next/headers";
import { ref, getDownloadURL } from "firebase/storage";

import { prefixId } from "@/const/prefixId";
import { getNanoid } from "@/utils/getNanoid";
import { myResponse } from "@/utils/myResponse";
import { addProduct } from "@/database/product/addProduct";
import { getAllProducts } from "@/database/product/getAllProduct";
import { getWalletById } from "@/database/wallet/getWalletById";
import { deleteProduct } from "@/database/product/deleteProduct";
import { editProduct } from "@/database/product/editProduct";
import getUnixTimestamps from "@/utils/getUnixTimestamps";
import { storage } from "@/connection/firebaseConfig";

export async function GET(req) {
  try {
    const products = await getAllProducts();
    const fixedProducts = await Promise.all(
      products.map(async (product) => {
        const downloadUrl = await getDownloadURL(ref(storage, `images/${product.productImage}`));
        return { ...product, productImage: downloadUrl };
      })
    );
    return myResponse(200, fixedProducts, "Data successfully retrieved.");
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

    const { idUser, nameProduct, priceProduct, categoryProduct, descriptionProduct, quantityProduct, imageProduct } = await req.json();

    const userWallet = await getWalletById(idUser);

    if (!userWallet) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "You must have the wallet first.";
      throw err;
    }

    const idProduct = prefixId.Products + getNanoid(),
      slugProduct = slugify(nameProduct, { lower: true }),
      createdAt = getUnixTimestamps();

    if (!idUser || !nameProduct || !priceProduct || !categoryProduct || !descriptionProduct || !quantityProduct || !idProduct || !slugProduct || !createdAt || !imageProduct) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const newProduct = { idProduct, nameProduct, priceProduct, categoryProduct, descriptionProduct, quantityProduct, slugProduct, idUser, createdAt, imageProduct };

    await addProduct(newProduct);

    return myResponse(200, { isSucceed: 1 }, `Product added successfully.`);
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}

export async function PUT(req) {
  try {
    const headersList = headers();
    const APIKey = headersList.get("API-Key");

    if (!APIKey || APIKey !== process.env.API_KEY) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Guest can't do the PUT request.";
      throw err;
    }

    const { idUser, idProduct, nameProduct, priceProduct, categoryProduct, descriptionProduct, quantityProduct } = await req.json();

    const userWallet = await getWalletById(idUser);

    if (!userWallet) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "You must have the wallet first.";
      throw err;
    }

    const slugProduct = slugify(nameProduct, { lower: true });

    if (!idUser || !nameProduct || !priceProduct || !categoryProduct || !descriptionProduct || !quantityProduct || !idProduct || !slugProduct) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const editedProduct = { idUser, idProduct, nameProduct, priceProduct, categoryProduct, descriptionProduct, quantityProduct, slugProduct };
    await editProduct(editedProduct);

    return myResponse(200, { isSucceed: 1 }, `Product edited successfully.`);
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}

export async function DELETE(req) {
  try {
    const headersList = headers();
    const APIKey = headersList.get("API-Key");

    if (!APIKey || APIKey !== process.env.API_KEY) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Guest can't do the DELETE request.";
      throw err;
    }

    const { idProduct, idUser } = await req.json();

    if (!idProduct || !idUser) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const deletedProduct = { idProduct, idUser };

    await deleteProduct(deletedProduct);

    return myResponse(200, { isSucceed: 1 }, `Product deleted successfully.`);
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
