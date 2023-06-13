import { con } from "@/connection/db";

export async function editReviews({ reviewsId, userId, productId, reviewsRating, reviewsComment, updatedAt }) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        await connection
          .query(
            `UPDATE reviews 
                SET rating = ${reviewsRating}, 
                    comment = '${reviewsComment}', 
                    updated_at = ${updatedAt}
                WHERE id = '${reviewsId}' AND id_user = '${userId}' AND id_products = '${productId}'`
          )
          .then(([fields]) => {
            if (fields.affectedRows <= 0) {
              const err = new Error(`Internal server error.`);
              err.statusCode = 500;
              err.payload = "Failed to update data, only accept updating your own review.";
              throw err;
            }
          });

        await connection.commit();
      } catch (err) {
        await connection.rollback();
        throw err;
      }
    })
    .catch((err) => {
      throw err;
    });
}
