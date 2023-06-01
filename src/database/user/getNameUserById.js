import { con } from "@/connection/db";

export async function getNameUserById(idUser) {
  return await con
    .query(`SELECT user_name AS userName FROM user WHERE id = '${idUser}'`)
    .then(([rows]) => rows[0])
    .catch((err) => {
      throw err;
    });
}
