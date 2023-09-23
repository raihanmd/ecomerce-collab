import { con } from "@/connection/db";

export async function getUserDetail(userName) {
  return await con
    .query(
      `SELECT ud.image AS userImage,
              ud.banner AS userBanner,
              ud.bio AS userBio,
              ud.shop_description AS userShopDescription,
              a.province AS userProvince,
              a.province_id AS userProvinceId,
              a.city AS userCity,
              a.city_id AS userCityId,
              AVG(r.rating) AS totalRating
        FROM user AS u
          RIGHT JOIN user_detail AS ud ON u.id = ud.id_user
           LEFT JOIN reviews AS r ON u.id = r.id_user
            LEFT JOIN addresses AS a ON u.id = a.id_user
              WHERE user_name = '${userName}'
                GROUP BY ud.image, ud.banner, ud.bio;`
    )
    .then(([rows]) => rows[0])
    .catch((err) => {
      throw err;
    });
}
