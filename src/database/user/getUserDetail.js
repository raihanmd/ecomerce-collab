import { con } from "@/connection/db";

export async function getUserDetail(userName) {
  return await con
    .query(
      `SELECT   image AS userImage
        FROM user
          WHERE user_name = '${userName}'`
    )
    .then(([rows]) => rows[0])
    .catch((err) => {
      throw err;
    });
}
