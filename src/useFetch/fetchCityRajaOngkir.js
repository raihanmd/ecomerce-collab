export async function fetchRajaOngkir(cityId) {
  try {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const res = await fetch("https://api.rajaongkir.com/starter/city", {
      signal,
      method: "POST",
      headers: {
        key: "3a5aa2e66c2684c52e8eeac0688828a3",
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (error) {
    throw error;
  }
}
