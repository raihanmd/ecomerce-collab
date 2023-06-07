import { con } from "@/connection/db";

export async function getAllProducts() {
  return await con
    .query(
      `SELECT p.id AS productId,
              p.name AS productName,
              p.price AS productPrice,
              p.quantity AS productQuantity,
              AVG(r.rating) AS productRating,
              COUNT(o.id) AS totalOrders
        FROM products AS p
          LEFT JOIN reviews AS r ON r.id_products = p.id
            LEFT JOIN orders_detail AS od ON od.id_products = p.id
              LEFT JOIN orders AS o ON o.id = od.id_orders
                GROUP BY p.id, p.name, p.price, p.description, p.quantity
                  ORDER BY totalOrders DESC, productRating DESC
                    LIMIT 20;`
    )
    .then(([rows]) => rows)
    .catch((err) => {
      throw err;
    });
}
