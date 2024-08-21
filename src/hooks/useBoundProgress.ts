import useSWR, { SWRResponse } from "swr";
import { get } from "@/service/index";
import { BoundProgress, DetailResponse, ListResponse } from "@/types";

const url = "/disputegames/statistics/bond/inprogress";
const params = {};

const getFetcher = (path: string) => async (): Promise<ListResponse<BoundProgress>> => {
  return await get(path, params);
};

export const useBoundProgress = (): SWRResponse<
  ListResponse<BoundProgress>,
  Error,
  boolean
> => {
  const res = useSWR('/api' + url, getFetcher('/api' + url));
  return res;
};
