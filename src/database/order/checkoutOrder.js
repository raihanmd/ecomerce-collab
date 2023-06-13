import { con } from "@/connection/db";

export async function checkoutOrder({ userId, orderId, checkoutAt }) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        const [walletUser = rows] = await connection.query(
          `SELECT balance
            FROM wallet
              WHERE id_user = '${userId}' FOR UPDATE`
        );

        const [orderUser = rows] = await connection.query(
          `SELECT payment_total AS paymentTotal
            FROM orders
              WHERE id = '${orderId}' FOR UPDATE`
        );

        if (walletUser.length <= 0) {
          const err = new Error(`404 not found.`);
          err.statusCode = 404;
          err.payload = "Invalid user.";
          throw err;
        }

        if (walletUser[0].balance < orderUser[0].paymentTotal) {
          const err = new Error(`Forbidden.`);
          err.statusCode = 403;
          err.payload = "Yout balance is not enough for do this action.";
          throw err;
        }

        await connection
          .query(
            `UPDATE orders
                SET status = 'PAID'
                   WHERE id = '${orderId}'`
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
            `UPDATE orders
                SET checkout_at = ${checkoutAt}
                   WHERE id = '${orderId}'`
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
            `UPDATE wallet
                SET balance = ${walletUser[0].balance - orderUser[0].paymentTotal}
                  WHERE id_user = '${userId}'`
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
