import { con } from "@/connection/db";

export async function getUserProduct(userName) {
  return await con
    .query(
      `SELECT p.id AS productId,
        p.slug AS productSlug,
        p.name AS productName,
        p.price AS productPrice,
        AVG(r.rating) AS productRating,
        COUNT(o.id) AS totalOrders,
        p.image AS productImage,
        p.blurhash AS productBlurhash,
        u.user_name AS ownedBy,
        p.created_at AS createdAt
  FROM products AS p
    LEFT JOIN reviews AS r ON r.id_products = p.id
      LEFT JOIN orders_detail AS od ON od.id_products = p.id
        LEFT JOIN orders AS o ON o.id = od.id_orders
          INNER JOIN user AS u ON u.id = p.id_user
            WHERE u.user_name = '${userName}'
              GROUP BY u.id, p.id, p.name, p.price, p.description
                ORDER BY p.created_at DESC;`
    )
    .then(([rows]) => rows)
    .catch((err) => {
      throw err;
    });
}
