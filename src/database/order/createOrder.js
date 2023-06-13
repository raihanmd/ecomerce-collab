import { con } from "@/connection/db";

export async function createOrder({ userId, productId, productQuantity, orderId, orderDate }) {
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
                WHERE p.id = '${productId}' FOR UPDATE`
        );
        if (detailProduct.length <= 0) {
          const err = new Error(`Forbidden.`);
          err.statusCode = 403;
          err.payload = "Invalid action.";
          throw err;
        }

        if (detailProduct[0].quantity < productQuantity) {
          const err = new Error(`Bad request.`);
          err.statusCode = 400;
          err.payload = "Quantity of product is lesser than you try to order.";
          throw err;
        }

        const paymentTotal = detailProduct[0].price * productQuantity;

        await connection
          .query(
            `INSERT INTO orders
                (id, id_user, payment_total, status, order_date)
                  VALUES ('${orderId}', '${userId}', ${paymentTotal}, 'UNPAID',
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
                  VALUES ('${productId}', '${orderId}', ${detailProduct[0].price},
                    ${productQuantity}, ${paymentTotal})`
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
                SET quantity = ${detailProduct[0].quantity - productQuantity}
                  WHERE id_products = '${productId}'`
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
              SET quantity = quantity - ${productQuantity}
                WHERE id_products = '${productId}'`
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
