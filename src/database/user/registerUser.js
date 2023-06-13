const { con } = require("@/connection/db");

export async function registerUser({ userId, userName, userEmail, userGoogleId }) {
  return await con
    .getConnection()
    .then(async (connection) => {
      connection.beginTransaction();
      try {
        await connection.query(`INSERT INTO user (id, google_id, user_name, email) VALUES ('${userId}', '${userGoogleId}', '${userName}', '${userEmail}')`).then(([fields]) => {
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
