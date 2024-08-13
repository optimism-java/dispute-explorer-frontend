import useSWR, { SWRResponse } from "swr";
import { get, post } from "@/service/index";
import { Credit, IndexResponse, LatestEvents, ListResponse } from "@/types";
import useApiPrefix from "./useApiPrefix";
import { useMemo } from "react";


const url = "/indexes/syncevents/search";
type EventsParams = {
  hitsPerPage?: number,
  page?: number,
  sort?: any
}
const defaultParams = {
  hitsPerPage: 5,
  sort: ["block_number:desc"]
};

const getFetcher = (path: string, params?: EventsParams,) => async (): Promise<IndexResponse<LatestEvents>> => {
  const p = {
    ...defaultParams,
    ... (params ? params : {})
  }
  return await post(path, p);
};

export const useSyncEvents = (params?: EventsParams): SWRResponse<IndexResponse<LatestEvents>, Error, boolean> => {
  const { indexApiPrefix } = useApiPrefix()
  const path = `${indexApiPrefix}${url}`
  const res = useSWR([path, params], getFetcher(path, params));
  return res;
};
