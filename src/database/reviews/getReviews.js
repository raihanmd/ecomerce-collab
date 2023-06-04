import { con } from "@/connection/db";

export async function getReviews(idProduct) {
  return await con
    .query(
      `SELECT   r.rating AS reviewRating,
                r.comment AS reviewComment,
                u.user_name AS writtenBy
          FROM reviews AS r 
              INNER JOIN user AS u ON (u.id = r.id_user)
                LIMIT 10`
    )
    .then(([rows]) => rows)
    .catch((err) => {
      throw err;
    });
}
