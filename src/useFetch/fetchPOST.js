export const fetchPOST = async (url, data, options) => {
  try {
    const res = await fetch(options?.component === "client" ? url : process.env.MAIN_URL + url, {
      method: "POST",
      headers: {
        "API-Key": process.env.API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    throw error;
  }
};
