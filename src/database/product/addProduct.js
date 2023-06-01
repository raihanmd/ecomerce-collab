import { con } from "@/connection/db";

export async function addProduct(newProduct) {
  const { idProduct, nameProduct, priceProduct, categoryProduct, descriptionProduct, quantityProduct, slugProduct, idUser } = newProduct;
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        const [idCategory = rows] = await connection.query(`SELECT id FROM categories WHERE name = '${categoryProduct}'`);
        if (idCategory.length <= 0) {
          const err = new Error(`Invalid category name (${categoryProduct}).`);
          err.statusCode = 404;
          err.payload = "Category not found.";
          throw err;
        }
        await connection
          .query(
            `INSERT INTO products 
                (id, id_user, id_categories, name, slug, price)
                  VALUES ('${idProduct}', '${idUser}', '${idCategory[0].id}', 
                    '${nameProduct}', '${slugProduct}', ${priceProduct})`
          )
          .then(([fields]) => {
            if (fields.affectedRows <= 0) {
              const err = new Error(`Internal server error.`);
              err.statusCode = 500;
              err.payload = "Failed to insert data.";
              throw err;
            }
          });
        await connection
          .query(
            `INSERT INTO products_detail 
                (id_products, description, quantity) 
                  VALUES ('${idProduct}', '${descriptionProduct}', ${quantityProduct})`
          )
          .then(([fields]) => {
            if (fields.affectedRows <= 0) {
              if (fields.affectedRows <= 0) {
                const err = new Error(`Internal server error.`);
                err.statusCode = 500;
                err.payload = "Failed to insert data.";
                throw err;
              }
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
