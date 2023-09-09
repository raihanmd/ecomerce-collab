export async function fetchGETRajaOngkir({ option }) {
  try {
    const response = await fetch(option === "province" ? `https://api.rajaongkir.com/starter/${option}` : `https://api.rajaongkir.com/starter/city?province=${option}`, {
      method: "GET",
      headers: {
        key: "3a5aa2e66c2684c52e8eeac0688828a3",
      },
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
}
