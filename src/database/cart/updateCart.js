import { con } from "@/connection/db";

export async function updateCart({ idUser, idProduct, quantityProduct }) {
  return await con
    .query(
      `UPDATE cart
        SET quantity = ${quantityProduct}
          WHERE id_user = '${idUser}' AND id_products = '${idProduct}'`
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
