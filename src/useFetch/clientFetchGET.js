export const clientFetchGET = async (url) => {
  return await (await fetch(url, { next: { revalidate: 10 } })).json();
};
