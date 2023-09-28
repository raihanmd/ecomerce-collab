const { createPool } = require("mysql2/promise");

export const con = createPool(process.env.DATABASE_URL);
