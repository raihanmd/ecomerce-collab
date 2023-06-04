import { con } from "@/connection/db";

export async function getDetailProduct({ userName, slugProduct }) {
  return await con
    .query(
      `SELECT   p.id as productId, 
                p.name as productName,
                p.price as productPrice,
                p.sold as productSold,
                AVG(r.rating) AS productRating,
                p.description as productDescription,
                p.quantity as productQuantity,
                user.user_name as ownedBy
          FROM products AS p
            INNER JOIN user ON (user.id = p.id_user)
              RIGHT JOIN reviews AS r ON (r.id_products = p.id)
                WHERE p.slug = '${slugProduct}' AND user.user_name = '${userName}'
                  GROUP BY p.id, p.name, p.price, p.sold, p.description, p.quantity, user.user_name`
    )
    .then(([rows]) => rows[0])
    .catch((err) => {
      throw err;
    });
}
