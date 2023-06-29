export const fetchGET = async (url, options) => {
  try {
    const res = await fetch(options?.component === "client" ? url : process.env.MAIN_URL + url, { next: { revalidate: 10 } });

    return await res.json();
  } catch (error) {
    return error;
  }
};
