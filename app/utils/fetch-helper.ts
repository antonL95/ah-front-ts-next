export const fetchData = async (
  endpoint: string,
  query: string,
  options = {}
) => {
  const res = await fetch(`${process.env.STRAPI_URL}/${endpoint}?${query}`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_KEY}`,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(
      `Unsuccessful request : ${process.env.STRAPI_URL}/${endpoint}?${query}`
    );
  }

  return res;
};


