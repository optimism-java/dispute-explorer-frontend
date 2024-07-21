import useSWR from "swr";
import { get } from "@/service/index";

const url = "/index/indexes/disputegame/search";
const params = {
  limit: 10,
  sort: ["block_number:desc"],
};

const fetcher = async () => {
  return await get(url, params);
};

export const useLatestGame = () => {
  const res = useSWR(url, fetcher);
  return res;
};
