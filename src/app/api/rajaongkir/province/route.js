const RajaOngkir = require("rajaongkir-nodejs").Starter(process.env.RAJAONGKIR_APIKEY);

import { myResponse } from "@/utils/myResponse";

export async function GET(req) {
  try {
    const {
      rajaongkir: { results },
    } = await RajaOngkir.getProvinces();

    return myResponse(200, results, "Data retrived successfully.");
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
