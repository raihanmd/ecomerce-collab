export const fetchPOST = async (url, data, options) => {
  return await fetch(options?.component === "client" ? url : process.env.MAIN_URL + url, {
    method: "POST",
    headers: {
      "API-Key": process.env.API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};
