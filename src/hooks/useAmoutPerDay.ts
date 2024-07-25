import useSWR, { SWRResponse } from "swr";
import { get } from "@/service/index";
import { Amountperday, DetailResponse, ListResponse } from "@/types";

const url = "/api/disputegames/overview/amountperdays";
const params = {};

const fetcher = async (): Promise<ListResponse<Amountperday>> => {
  return await get(url, params);
};

export const useAmoutPerDay = (): SWRResponse<
  ListResponse<Amountperday>,
  Error,
  Boolean
> => {
  const res = useSWR(url, fetcher);
  return res;
};