import { con } from "@/connection/db";

export async function getWalletById(idUser) {
  return await con
    .query(`SELECT balance FROM wallet WHERE id_user = '${idUser}'`)
    .then(([rows]) => rows[0])
    .catch((err) => {
      throw err;
    });
}
