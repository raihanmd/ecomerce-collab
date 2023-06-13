import { con } from "@/connection/db";

export async function getIdUser(userName) {
  return await con
    .query(`SELECT id AS userId FROM user WHERE user_name = '${userName}'`)
    .then(([rows]) => rows[0])
    .catch((err) => {
      throw err;
    });
}
