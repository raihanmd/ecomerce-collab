import { con } from "@/connection/db";

export async function loginUser({ userGoogleId, userEmail }) {
  return await con
    .query(`SELECT * FROM user WHERE google_id = '${userGoogleId}' AND email = '${userEmail}'`)
    .then(([rows]) => rows[0])
    .catch((err) => {
      throw err;
    });
}
