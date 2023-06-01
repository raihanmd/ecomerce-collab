import { myResponse } from "@/utils/myResponse";
import { createWallet } from "@/database/wallet/createWallet";

export async function POST(req) {
  try {
    const { token, idUser } = await req.json();

    if (!token || token !== process.env.OWNER_TOKEN) {
      const err = new Error("Forbidden.");
      err.satusCode = 403;
      err.payload = "Guest can't do the POST request.";
      throw err;
    }

    if (!idUser) {
      const err = new Error("Forbidden.");
      err.satusCode = 403;
      err.payload = "Invalid format body JSON.";
      throw err;
    }

    const balanceUser = 1000000;

    const newWallet = { idUser, balanceUser };

    await createWallet(newWallet);

    return myResponse(200, { isSucceed: 1 }, `Wallet added successfully, you now have Rp.1.000.000 free balance.`);
  } catch (err) {
    return myResponse(err.statusCode || 500, err.payload || "Internal server error.", err.message || "Internal server error.");
  }
}
