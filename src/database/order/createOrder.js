import { con } from "@/connection/db";

export async function createOrder({ idUser, idProduct, quantityProduct, idOrder, orderDate }) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        const [detailProduct = rows] = await connection.query(
          `SELECT p.price, 
                  pd.quantity 
            FROM products AS p
              INNER JOIN products_detail AS pd ON p.id = pd.id_products
                WHERE p.id = '${idProduct}' FOR UPDATE`
        );
        if (detailProduct.length <= 0) {
          const err = new Error(`Forbidden.`);
          err.statusCode = 403;
          err.payload = "Invalid action.";
          throw err;
        }

        if (detailProduct[0].quantity < quantityProduct) {
          const err = new Error(`Bad request.`);
          err.statusCode = 400;
          err.payload = "Quantity of product is lesser than you try to order.";
          throw err;
        }

        const paymentTotal = detailProduct[0].price * quantityProduct;

        await connection
          .query(
            `INSERT INTO orders
                (id, id_user, payment_total, status, order_date)
                  VALUES ('${idOrder}', '${idUser}', ${paymentTotal}, 'UNPAID',
                    ${orderDate})`
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
            `INSERT INTO orders_detail
                (id_products, id_orders, price, quantity, subtotal)
                  VALUES ('${idProduct}', '${idOrder}', ${detailProduct[0].price},
                    ${quantityProduct}, ${paymentTotal})`
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
            `UPDATE products
                SET quantity = ${detailProduct[0].quantity - quantityProduct}
                  WHERE id_products = '${idProduct}'`
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
            `UPDATE products_detail
              SET quantity = quantity - ${quantityProduct}
                WHERE id_products = '${idProduct}'`
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
