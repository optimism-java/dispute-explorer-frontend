import useSWR, { SWRResponse } from "swr";
import { get } from "@/service/index";
import { BoundProgress, DetailResponse, ListResponse } from "@/types";

const url = "/api/disputegames/statistics/bond/inprogress";
const params = {};

const fetcher = async (): Promise<ListResponse<BoundProgress>> => {
  return await get(url, params);
};

export const useBoundProgress = (): SWRResponse<
  ListResponse<BoundProgress>,
  Error,
  boolean
> => {
  const res = useSWR(url, fetcher);
  return res;
};
