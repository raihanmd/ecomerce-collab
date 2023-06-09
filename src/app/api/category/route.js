import { getAllCategories } from "@/database/categories/getAllCategories";
import { myResponse } from "@/utils/myResponse";

export async function GET(req) {
  try {
    const categories = await getAllCategories();
    return myResponse(200, categories, "Data successfully retrieved.");
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
