import { con } from "@/connection/db";

export async function loginUser({ userOAuthId, userEmail, userProvider }) {
  return await con
    .query(`SELECT * FROM user WHERE oauth_id = '${userOAuthId}' AND email = '${userEmail}' AND provider = '${userProvider}'`)
    .then(([rows]) => rows[0])
    .catch((err) => {
      throw err;
    });
}
