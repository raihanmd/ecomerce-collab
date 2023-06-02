import { con } from "@/connection/db";

export async function getOrder(userName) {
  return await con
    .query(
      `SELECT   o.id as orderId,
                p.id as productId, 
                p.name as productName,
                od.quantity as productQuantity,
                od.price as productPrice,
                od.subtotal as productSubtotal,
                o.status as orderStatus,
                o.order_date AS orderDate
          FROM products AS p
            RIGHT JOIN orders_detail AS od ON (od.id_products = p.id)
              RIGHT JOIN orders AS o ON (o.id = od.id_orders)
                RIGHT JOIN user AS u ON (u.id = o.id_user)
                  WHERE u.user_name = '${userName}'`
    )
    .then(([rows]) => rows)
    .catch((err) => {
      throw err;
    });
}
