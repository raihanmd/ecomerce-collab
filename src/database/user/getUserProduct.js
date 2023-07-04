import { con } from "@/connection/db";

export async function getUserProduct(userName) {
  return await con
    .query(
      `SELECT   p.id as productId, 
      	        p.name as productName,
                p.slug as productSlug,
                p.price as productPrice,
                user.user_name as userName
        FROM products AS p
         RIGHT JOIN user ON (user.id = p.id_user)
          WHERE user.user_name = '${userName}'`
    )
    .then(([rows]) => rows)
    .catch((err) => {
      throw err;
    });
}
