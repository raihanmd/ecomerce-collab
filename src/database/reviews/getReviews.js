import { con } from "@/connection/db";

export async function getReviews(productId) {
  return await con
    .query(
      `SELECT   r.rating AS reviewsRating,
                r.comment AS reviewsComment,
                u.user_name AS writtenBy
          FROM reviews AS r 
              INNER JOIN user AS u ON (u.id = r.id_user)
                INNER JOIN products AS p ON (p.id = r.id_products)  
                  WHERE p.id = ${productId}
                    LIMIT 10`
    )
    .then(([rows]) => rows)
    .catch((err) => {
      throw err;
    });
}
