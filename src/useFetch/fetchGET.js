export const fetchGET = async (url, options) => {
  try {
    const res = await fetch(options?.component === "client" ? url : process.env.NEXT_PUBLIC_MAIN_URL + url, { next: { revalidate: 10 } });

    return await res.json();
  } catch (error) {
    throw error;
  }
};
