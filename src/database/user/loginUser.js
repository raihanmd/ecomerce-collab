import { con } from "@/connection/db";

export async function loginUser(name) {
  return await con
    .query(`SELECT * FROM user WHERE user_name = '${name}'`)
    .then(([rows]) => rows[0])
    .catch((err) => {
      throw err;
    });
}
