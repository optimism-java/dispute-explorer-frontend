const latestGames = async () => {
  const res = await fetch("index/indexes/disputegames/search?limit=10&");
  //"sort": ["block_number:desc"]
};

const get = async (url: string, params: Record<string, any>) => {
  const queryString = new URLSearchParams(params);
  const requestUrl = `${url}?${queryString.toString()}`;
  const data = await fetch(requestUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  });
  return data.json();
};

export { get };
