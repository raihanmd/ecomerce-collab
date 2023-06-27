import getUnixTimestamps from "@/utils/getUnixTimestamps";
import { prefixId } from "@/const/prefixId";
import { getNanoid } from "@/utils/getNanoid";
import { myResponse } from "@/utils/myResponse";
import { createReviews } from "@/database/reviews/createReviews";
import { editReviews } from "@/database/reviews/editReviews";

export async function POST(req) {
  try {
    const { userId, productId, reviewsRating, reviewsComment } = await req.json();

    if (!userId || !productId || !reviewsRating || !reviewsComment) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const reviewsId = prefixId.Reviews + getNanoid(),
      createdAt = getUnixTimestamps();

    const newOrder = { reviewsId, userId, productId, reviewsRating, reviewsComment, createdAt };

    await createReviews(newOrder);

    return myResponse(200, { isSucceed: 1 }, `Review added successfully.`);
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}

export async function PUT(req) {
  try {
    const { reviewsId, userId, productId, reviewsRating, reviewsComment } = await req.json();

    if (!reviewsId || !userId || !productId || !reviewsRating || !reviewsComment) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const updatedAt = getUnixTimestamps();

    const editedReviews = { reviewsId, userId, productId, reviewsRating, reviewsComment, updatedAt };

    await editReviews(editedReviews);

    return myResponse(200, { isSucceed: 1 }, `Product edited successfully.`);
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
