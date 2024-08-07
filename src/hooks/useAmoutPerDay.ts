import useSWR, { SWRResponse } from "swr";
import { get } from "@/service/index";
import { Amountperday, DetailResponse, ListResponse } from "@/types";
import useApiPrefix from "./useApiPrefix";

const url = "/disputegames/overview/amountperday";
const params = {};

const getFetcher = (path: string) => async (): Promise<ListResponse<Amountperday>> => {
  return await get(path, params);
};

export const useAmountPerDay = (): SWRResponse<
  ListResponse<Amountperday>,
  Error,
  boolean
> => {
  const { apiPrefix } = useApiPrefix()
  const res = useSWR(apiPrefix + url, getFetcher(apiPrefix + url));
  return res;
};
