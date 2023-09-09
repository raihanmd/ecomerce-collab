const RajaOngkir = require("rajaongkir-nodejs").Starter(process.env.RAJAONGKIR_APIKEY);

import { myResponse } from "@/utils/myResponse";

export async function GET(req, { params }) {
  try {
    const { provinceId } = params;
    const {
      rajaongkir: { results },
    } = await RajaOngkir.getCities();

    const filteredCity = results.filter((city) => city.province_id === provinceId);

    return myResponse(200, filteredCity, "Data retrived successfully.");
  } catch (err) {
    console.error("Error:", err);
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
