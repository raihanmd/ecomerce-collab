import { con } from "@/connection/db";

export async function addProduct({ productId, productName, productPrice, productCategory, productDescription, productQuantity, productWeight, productSlug, userId, createdAt, productImage, blurhash }) {
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
            `INSERT INTO products 
                (id, id_user, id_categories, name, slug, image, blurhash, description, price, quantity, weight, created_at)
                  VALUES ('${productId}', '${userId}', '${idCategory[0].id}', 
                    '${productName}', '${productSlug}', '${productImage}', '${blurhash}', '${productDescription}', ${productPrice}, ${productQuantity}, ${productWeight}, ${createdAt})`
          )
          .then(([fields]) => {
            if (fields.affectedRows <= 0) {
              const err = new Error(`Internal server error.`);
              err.statusCode = 500;
              err.payload = "Failed to insert data.";
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
