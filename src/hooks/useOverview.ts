import useSWR, { SWRResponse } from "swr";
import { get } from "@/service/index";
import { DetailResponse, Overview } from "@/types";

const params = {};


export const useOverview = (): SWRResponse<
  DetailResponse<Overview>,
  Error,
  boolean
> => {
  const url = "/api/disputegames/overview";
  const fetcher = async (): Promise<DetailResponse<Overview>> => {
    return await get(url, params);
  };
  const res = useSWR(url, fetcher);
  return res;
};
