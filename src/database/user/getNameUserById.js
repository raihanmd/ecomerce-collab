import { con } from "@/connection/db";

export async function getNameUserById(userId) {
  return await con
    .query(`SELECT user_name AS userName FROM user WHERE id = '${userId}'`)
    .then(([rows]) => rows[0])
    .catch((err) => {
      throw err;
    });
}
