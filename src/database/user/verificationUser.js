const { con } = require("@/connection/db");

export async function verificationUser({ userId, userProvince, userProvinceId, userCity, userCityId, userBio, userShopDesc }) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        await connection.query(`INSERT INTO wallet (id_user, balance) VALUES ('${userId}', 1000000)`).then(([fields]) => {
          if (fields.affectedRows <= 0) {
            if (fields.affectedRows <= 0) {
              const err = new Error(`Internal server error.`);
              err.statusCode = 500;
              err.payload = "Failed to insert data.";
              throw err;
            }
          }
        });
        await connection.query(`INSERT INTO addresses (id_user, province, city, province_id, city_id) VALUES ('${userId}', '${userProvince}', '${userCity}', '${userProvinceId}', '${userCityId}')`).then(([fields]) => {
          if (fields.affectedRows <= 0) {
            if (fields.affectedRows <= 0) {
              const err = new Error(`Internal server error.`);
              err.statusCode = 500;
              err.payload = "Failed to insert data.";
              throw err;
            }
          }
        });
        await connection
          .query(
            `UPDATE user_detail AS ud 
              SET bio = '${userBio}', 
                  shop_description = '${userShopDesc}'
              WHERE id_user = '${userId}';`
          )
          .then(([fields]) => {
            if (fields.affectedRows <= 0) {
              if (fields.affectedRows <= 0) {
                const err = new Error(`Internal server error.`);
                err.statusCode = 500;
                err.payload = "Failed to insert data.";
                throw err;
              }
            }
          });
        await connection.commit();
      } catch (err) {
        await connection.rollback();
        throw err;
      }
    })
    .catch((err) => {
      throw err;
    });
}
