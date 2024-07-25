import useSWR, { SWRResponse } from "swr";
import { get } from "@/service/index";
import { DetailResponse, Overview } from "@/types";

const url = "/api/disputegames/overview";
const params = {};

const fetcher = async (): Promise<DetailResponse<Overview>> => {
  return await get(url, params);
};

export const useOverview = (): SWRResponse<
  DetailResponse<Overview>,
  Error,
  Boolean
> => {
  const res = useSWR(url, fetcher);
  return res;
};
