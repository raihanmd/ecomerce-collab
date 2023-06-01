const { con } = require("@/connection/db");

export async function registerUser({ idUser, firstName, lastName, userName, hashedPassword, cityUser }) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        await connection.query(`INSERT INTO user (id, first_name, last_name, user_name, password, city) VALUES ('${idUser}', '${firstName}', '${lastName}', '${userName}', '${hashedPassword}', '${cityUser}')`).then(([fields]) => {
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
