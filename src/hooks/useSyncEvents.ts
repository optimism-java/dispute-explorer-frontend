import useSWR, { SWRResponse } from "swr";
import { get, post } from "@/service/index";
import { Credit, IndexResponse, LatestEvents, ListResponse } from "@/types";


const url = "/index/indexes/syncevents/search";
type EventsParams = {
  limit?: number,
  offset?: number,
  sort?: any
}
const defaultParams = {
  limit: 5,
  sort: ["block_number:desc"]
};

const getFetcher = (params?: EventsParams) => async (): Promise<IndexResponse<LatestEvents>> => {
  return await post(url, {
    ...defaultParams,
    ... (params ? params : {})
  });
};

export const useSyncEvents = (params?: EventsParams): SWRResponse<IndexResponse<LatestEvents>, Error, boolean> => {
  const res = useSWR([url, params], getFetcher(params));
  return res;
};
