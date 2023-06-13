import { con } from "@/connection/db";

export async function createReviews({ reviewsId, userId, productId, reviewsRating, reviewsComment, createdAt }) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        await connection
          .query(
            `INSERT INTO reviews
                (id, id_user, id_products, rating, comment, created_at)
                  VALUES ('${reviewsId}', '${userId}', '${productId}', ${reviewsRating},
                  '${reviewsComment}', ${createdAt})`
          )
          .then(([fields]) => {
            if (fields.affectedRows <= 0) {
              const err = new Error(`Internal server error.`);
              err.statusCode = 500;
              err.payload = "Failed to insert data.";
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
