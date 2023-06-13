import { con } from "@/connection/db";

export async function getDetailProduct({ userName, productSlug }) {
  return await con
    .query(
      `SELECT   p.id as productId, 
                p.name as productName,
                p.price as productPrice,
                p.description as productDescription,
                p.quantity as productQuantity,
                user.user_name as ownedBy,
                AVG(r.rating) AS productRating,
                COUNT(o.id) AS totalOrders
          FROM products AS p
            INNER JOIN user ON (user.id = p.id_user)
              LEFT JOIN reviews AS r ON (r.id_products = p.id)
                LEFT JOIN orders_detail AS od ON od.id_products = p.id
                  LEFT JOIN orders AS o ON o.id = od.id_orders
                    WHERE p.slug = '${productSlug}' AND user.user_name = '${userName}'
                      GROUP BY p.id, p.name, p.price, p.description, p.quantity, user.user_name`
    )
    .then(([rows]) => rows[0])
    .catch((err) => {
      throw err;
    });
}
