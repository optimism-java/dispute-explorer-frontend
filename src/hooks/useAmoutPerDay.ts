import useSWR, { SWRResponse } from "swr";
import { get } from "@/service/index";
import { Amountperday, DetailResponse, ListResponse } from "@/types";

const url = "/api/disputegames/overview/amountperday";
const params = {};

const fetcher = async (): Promise<ListResponse<Amountperday>> => {
  return await get(url, params);
};

export const useAmountPerDay = (): SWRResponse<
  ListResponse<Amountperday>,
  Error,
  boolean
> => {
  const res = useSWR(url, fetcher);
  return res;
};
