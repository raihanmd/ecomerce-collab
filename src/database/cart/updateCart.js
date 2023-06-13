import { con } from "@/connection/db";

export async function updateCart({ userId, productId, productQuantity }) {
  return await con
    .query(
      `UPDATE cart
        SET quantity = ${productQuantity}
          WHERE id_user = '${userId}' AND id_products = '${productId}'`
    )
    .then(([fields]) => {
      if (fields.affectedRows <= 0) {
        const err = new Error(`Internal server error.`);
        err.statusCode = 500;
        err.payload = "Failed to insert data.";
        throw err;
      }
    })
    .catch((err) => {
      throw err;
    });
}
