import useSWR, { SWRResponse } from "swr";
import { get } from "@/service/index";
import { Credit, IndexResponse, ListResponse } from "@/types";

const url = "/api/disputegames/credit/rank";
type RankParams = {
  limit?: string,
  offset?: string,
}

const defaultParams: RankParams = {
  limit: '5',
  offset: '0',
};

const fetcher = async (): Promise<ListResponse<Credit>> => {
  return await get(url);
};

export const useCreditRank = (params?: RankParams): SWRResponse<ListResponse<Credit>, Error, boolean> => {
  const p = {
    ...defaultParams,
    ... (params ? params : {})
  }
  const queryString = new URLSearchParams(p);
  const requestUrl = `${url}?${queryString.toString()}`;
  const res = useSWR(requestUrl, fetcher);
  return res;
};
