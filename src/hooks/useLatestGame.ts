import useSWR, { SWRResponse } from "swr";
import { get } from "@/service/index";
import { Game, IndexResponse } from "@/types";

const url = "/index/indexes/disputegames/search";
const params = {
  limit: 5,
  sort: ["block_number:desc"],
};

const fetcher = async (): Promise<IndexResponse<Game>> => {
  return await get(url, params);
};

export const useLatestGame = (): SWRResponse<IndexResponse<Game>, Error, boolean> => {
  const res = useSWR(url, fetcher);
  return res;
};
