const get = async (url: string, params?: Record<string, any>) => {
  const data = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  });
  return data.json();
};

const post = async (url: string, params: Record<string, any>) => {
  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    body: JSON.stringify(params),
  });
  return data.json();
};

export { get, post };
