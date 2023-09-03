import slugify from "slugify";

import { prefixId } from "@/const/prefixId";
import { getNanoid } from "@/utils/getNanoid";
import { myResponse } from "@/utils/myResponse";
import { addProduct } from "@/database/product/addProduct";
import { getAllProducts } from "@/database/product/getAllProduct";
import { getWalletById } from "@/database/wallet/getWalletById";
import { deleteProduct } from "@/database/product/deleteProduct";
import { editProduct } from "@/database/product/editProduct";
import getUnixTimestamps from "@/utils/getUnixTimestamps";

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
    const { userId, productName, productPrice, productCategory, productDescription, productQuantity, productWeight, productImage, blurhash } = await req.json();

    const userWallet = await getWalletById(userId);

    if (!userWallet) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "You must have the wallet first.";
      throw err;
    }

    const productId = prefixId.Products + getNanoid(),
      productSlug = slugify(productName, { lower: true }),
      createdAt = getUnixTimestamps();

    if (!userId || !productName || !productPrice || !productCategory || !productDescription || !productQuantity || !productWeight || !productId || !productSlug || !createdAt || !productImage || !blurhash) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const newProduct = { productId, productName, productPrice, productCategory, productDescription, productQuantity, productWeight, productSlug, userId, createdAt, productImage, blurhash };

    await addProduct(newProduct);

    return myResponse(200, { isSucceed: 1 }, `Product added successfully.`);
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}

export async function PUT(req) {
  try {
    const { userId, productId, productName, productPrice, productCategory, productDescription, productQuantity, productWeight } = await req.json();

    const userWallet = await getWalletById(userId);

    if (!userWallet) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "You must have the wallet first.";
      throw err;
    }

    const productSlug = slugify(productName, { lower: true });

    if (!userId || !productName || !productPrice || !productCategory || !productDescription || !productQuantity || !productWeight || !productId || !productSlug) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const editedProduct = { userId, productId, productName, productPrice, productCategory, productDescription, productQuantity, productWeight, productSlug };
    await editProduct(editedProduct);

    return myResponse(200, { isSucceed: 1 }, `Product edited successfully.`);
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}

export async function DELETE(req) {
  try {
    const { productId, userId } = await req.json();

    if (!productId || !userId) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const deletedProduct = { productId, userId };

    await deleteProduct(deletedProduct);

    return myResponse(200, { isSucceed: 1 }, `Product deleted successfully.`);
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
