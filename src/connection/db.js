const { createPool } = require("mysql2/promise");

export const con = createPool(process.env.DATABASE_URL);

// export const con = createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });
