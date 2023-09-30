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

    const [{ costs: JNE }] = (await RajaOngkir.getJNECost({ origin, destination, weight })).rajaongkir.results;
    const [{ costs: TIKI }] = (await RajaOngkir.getTIKICost({ origin, destination, weight })).rajaongkir.results;
    const [{ costs: POS }] = (await RajaOngkir.getPOSCost({ origin, destination, weight })).rajaongkir.results;

    const response = {};

    if (JNE.length > 0) response.JNE = JNE;
    if (TIKI.length > 0) response.TIKI = TIKI;
    if (POS.length > 0) response.POS = POS;

    return myResponse(200, response, "Data retrived successfully.");
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
