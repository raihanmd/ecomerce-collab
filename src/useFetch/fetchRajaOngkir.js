export async function fetchRajaOngkir({ origin, destination, weight, type }) {
  try {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const bodyRequest = {
      origin,
      destination,
      weight,
      courier: "jne",
    };

    const res = await fetch("https://api.rajaongkir.com/starter/cost", {
      signal,
      method: "POST",
      headers: {
        key: "3a5aa2e66c2684c52e8eeac0688828a3",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyRequest),
    });
    return await res.json();
  } catch (error) {
    throw error;
  }
}
