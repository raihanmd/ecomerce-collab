import { headers } from "next/headers";

import getUnixTimestamps from "@/utils/getUnixTimestamps";
import { prefixId } from "@/const/prefixId";
import { getNanoid } from "@/utils/getNanoid";
import { myResponse } from "@/utils/myResponse";
import { createReviews } from "@/database/reviews/createReviews";
import { editReviews } from "@/database/reviews/editReviews";

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

    const { idUser, idProduct, ratingReviews, commentReviews } = await req.json();

    if (!idUser || !idProduct || !ratingReviews || !commentReviews) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const idReviews = prefixId.Reviews + getNanoid(),
      createdAt = getUnixTimestamps();

    const newOrder = { idReviews, idUser, idProduct, ratingReviews, commentReviews, createdAt };

    await createReviews(newOrder);

    return myResponse(200, { isSucceed: 1 }, `Review added successfully.`);
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

    const { idRewies, idUser, idProduct, ratingReviews, commentReviews } = await req.json();

    if (!idRewies || !idUser || !idProduct || !ratingReviews || !commentReviews) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const updatedAt = getUnixTimestamps();

    const editedReviews = { idRewies, idUser, idProduct, ratingReviews, commentReviews, updatedAt };

    await editReviews(editedReviews);

    return myResponse(200, { isSucceed: 1 }, `Product edited successfully.`);
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
