import { con } from "@/connection/db";

export async function getDetailProduct({ userName, slugProduct }) {
  return await con
    .query(
      `SELECT p.id as productId, 
                p.name as productName,
                p.price as productPrice,
                pd.sold as productSold,
                pd.rating as productRating,
                pd.description as productDescription,
                pd.quantity as productQuantity,
                user.user_name as ownedBy
          FROM products AS p
            INNER JOIN user ON (user.id = p.id_user)
              INNER JOIN products_detail AS pd ON (pd.id_products = p.id)
                WHERE p.slug = '${slugProduct}' AND user.user_name = '${userName}'`
    )
    .then(([rows]) => rows[0])
    .catch((err) => {
      throw err;
    });
}
