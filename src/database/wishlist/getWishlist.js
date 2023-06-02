import { con } from "@/connection/db";

export async function getWishlist(userName) {
  return await con
    .query(
      `SELECT   w.id AS wishlistId,
                p.id AS productId,
                p.name AS productName,
                p.slug AS productSlug
          FROM wishlist AS w
            RIGHT JOIN products AS p ON (p.id = w.id_products)
                RIGHT JOIN user AS u ON (u.id = w.id_user)
                    WHERE u.user_name = '${userName}'`
    )
    .then(([rows]) => rows)
    .catch((err) => {
      throw err;
    });
}
