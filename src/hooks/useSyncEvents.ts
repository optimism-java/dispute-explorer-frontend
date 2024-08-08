import useSWR, { SWRResponse } from "swr";
import { get, post } from "@/service/index";
import { Credit, IndexResponse, LatestEvents, ListResponse } from "@/types";
import useApiPrefix from "./useApiPrefix";
import { useMemo } from "react";


const url = "/indexes/syncevents/search";
type EventsParams = {
  limit?: number,
  offset?: number,
  sort?: any
}
const defaultParams = {
  limit: 5,
  sort: ["block_number:desc"]
};

const getFetcher = (path: string, params?: EventsParams,) => async (): Promise<IndexResponse<LatestEvents>> => {
  return await post(path, {
    ...defaultParams,
    ... (params ? params : {})
  });
};

export const useSyncEvents = (params?: EventsParams): SWRResponse<IndexResponse<LatestEvents>, Error, boolean> => {
  const { indexApiPrefix } = useApiPrefix()
  const path = `${indexApiPrefix}${url}`
  const res = useSWR([path, params], getFetcher(path, params));
  return res;
};
