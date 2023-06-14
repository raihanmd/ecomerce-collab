export const fetchGET = async (url) => {
  return await (await fetch(process.env.MAIN_URL + url, { next: { revalidate: 10 } })).json();
};
