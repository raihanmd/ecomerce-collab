const RajaOngkir = require("rajaongkir-nodejs").Starter(process.env.RAJAONGKIR_APIKEY);

import { myResponse } from "@/utils/myResponse";

export async function POST(req) {
  try {
    const { origin, destination, weight } = await req.json();

    if (!origin || !destination || !weight) {
      const err = new Error("Forbidden.");
      err.statusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const [{ costs }] = (await RajaOngkir.getJNECost({ origin, destination, weight })).rajaongkir.results;

    return myResponse(200, costs, "Data retrived successfully.");
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
