import { con } from "@/connection/db";

export async function getAllCategories() {
  return await con
    .query(
      `SELECT name
        FROM categories`
    )
    .then(([rows]) => rows)
    .catch((err) => {
      throw err;
    });
}
