import { con } from "@/connection/db";

export async function getAllProducts() {
  return await con
    .query(
      `SELECT p.name AS productName,
                p.slug AS productSlug,
                p.price AS productPrice,
                pd.sold AS productSold,
                pd.rating AS productRating
          FROM products AS p 
            INNER JOIN products_detail AS pd ON (pd.id_products = p.id)
              ORDER BY pd.sold DESC, pd.rating DESC
                LIMIT 50`
    )
    .then(([rows]) => rows)
    .catch((err) => {
      throw err;
    });
}
