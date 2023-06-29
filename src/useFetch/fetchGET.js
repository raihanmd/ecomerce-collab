export const fetchGET = async (url, options) => {
  return await (await fetch(options?.component === "client" ? url : process.env.MAIN_URL + url, { next: { revalidate: 10 } })).json();
};
