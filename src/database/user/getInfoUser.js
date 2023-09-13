import { con } from "@/connection/db";

export async function getInfoUser(userName) {
  return await con
    .query(
      `SELECT u.id AS userId,
              a.city AS userCity,
              a.city_id AS userCityId
            FROM user AS u
              LEFT JOIN addresses AS a ON u.id = a.id_user
                WHERE u.user_name = '${userName}'`
    )
    .then(([rows]) => rows[0])
    .catch((err) => {
      throw err;
    });
}
