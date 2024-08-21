
const get = async (url: string, params?: Record<string, any>) => {
  const useMainKey = url.includes('/indexMain')
  const useBaseKey = url.includes('/indexBase')
  const data = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useMainKey ? process.env.NEXT_PUBLIC_MAINNET_API_KEY : useBaseKey ? process.env.NEXT_PUBLIC_BASE_API_KEY : process.env.NEXT_PUBLIC_API_KEY}`,
    },
  });
  return data.json();
};

const post = async (url: string, params: Record<string, any>) => {
  const useMainKey = url.includes('/indexMain')
  const useBaseKey = url.includes('/indexBase')
  const data = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useMainKey ? process.env.NEXT_PUBLIC_MAINNET_API_KEY : useBaseKey ? process.env.NEXT_PUBLIC_BASE_API_KEY : process.env.NEXT_PUBLIC_API_KEY}`,
    },
    body: JSON.stringify(params)
  });
  return data.json();
}

export { get, post };
