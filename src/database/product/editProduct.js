import { con } from "@/connection/db";

export async function editProduct({ userId, productId, productName, productPrice, productCategory, productDescription, productQuantity, productWeight, productSlug }) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        const [idCategory = rows] = await connection.query(`SELECT id FROM categories WHERE name = '${productCategory}'`);
        if (idCategory.length <= 0) {
          const err = new Error(`Invalid category name (${productCategory}).`);
          err.statusCode = 404;
          err.payload = "Category not found.";
          throw err;
        }
        await connection
          .query(
            `UPDATE products 
                SET id_categories = '${idCategory[0].id}', 
                    name = '${productName}', 
                    slug = '${productSlug}',
                    description = '${productDescription}', 
                    price = ${productPrice},
                    quantity = ${productQuantity},
                    weight = ${productWeight},
                WHERE id = '${productId}' AND id_user = '${userId}'`
          )
          .then(([fields]) => {
            if (fields.affectedRows <= 0) {
              const err = new Error(`Internal server error.`);
              err.statusCode = 500;
              err.payload = "Failed to update data, only accept updating your own product.";
              throw err;
            }
          });

        await connection.commit();
      } catch (err) {
        await connection.rollback();
        throw err;
      }
    })
    .catch((err) => {
      throw err;
    });
}
