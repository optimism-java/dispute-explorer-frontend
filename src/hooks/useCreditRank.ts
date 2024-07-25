import useSWR, { SWRResponse } from "swr";
import { get } from "@/service/index";
import { Credit, IndexResponse, ListResponse } from "@/types";

const url = "/api/disputegames/credit/rank";
const params = {
  limit: 5,
};

const fetcher = async (): Promise<ListResponse<Credit>> => {
  return await get(url, params);
};

export const useCreditRank = (): SWRResponse<ListResponse<Credit>, Error, boolean> => {
  const res = useSWR(url, fetcher);
  return res;
};
