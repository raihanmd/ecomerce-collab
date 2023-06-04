import { con } from "@/connection/db";

export async function editReviews({ idRewies, idUser, idProduct, ratingReviews, commentReviews, updatedAt }) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        await connection
          .query(
            `UPDATE reviews 
                SET rating = ${ratingReviews}, 
                    comment = '${commentReviews}', 
                    updated_at = ${updatedAt}
                WHERE id = '${idRewies}' AND id_user = '${idUser}' AND id_products = '${idProduct}'`
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
