import useSWR, { SWRResponse } from "swr";
import { get } from "@/service/index";
import { Credit, IndexResponse, LatestEvents, ListResponse } from "@/types";


const url = "/index/indexes/syncevents/search";
const params = {
  limit: 5,
};

const fetcher = async (): Promise<IndexResponse<LatestEvents>> => {
  return await get(url, params);
};

export const useSyncEvents = (): SWRResponse<IndexResponse<LatestEvents>, Error, boolean> => {
  const res = useSWR(url, fetcher);
  return res;
};
