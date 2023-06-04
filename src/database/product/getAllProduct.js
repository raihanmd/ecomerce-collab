import { con } from "@/connection/db";

export async function getAllProducts() {
  return await con
    .query(
      `SELECT   p.id AS productId,
                p.name AS productName,
                p.slug AS productSlug,
                p.price AS productPrice,
                p.sold AS productSold,
                AVG(r.rating) AS productRating,
                u.user_name AS ownedBy
          FROM products AS p 
            INNER JOIN reviews AS r ON (r.id_products = p.id)
              INNER JOIN user AS u ON (u.id = p.id_user)
                GROUP BY p.id, p.name, p.slug, p.price, p.sold, u.user_name
                  ORDER BY productSold DESC, productRating DESC
                    LIMIT 50`
    )
    .then(([rows]) => rows)
    .catch((err) => {
      throw err;
    });
}
