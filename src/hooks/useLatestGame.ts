import useSWR, { SWRResponse } from "swr";
import { get } from "@/service/index";
import { Game, IndexResponse } from "@/types";
import { useEffect, useState } from "react";
import useApiPrefix from "./useApiPrefix";

const url = "/indexes/disputegames/search";

type GamesParams = {
  limit?: string;
  offset?: string;
  sort?: any;
  q?: string;
};

const defaultParams: GamesParams = {
  limit: "5",
  offset: "0",
  sort: ["block_number:desc"],
};

const getFetcher = (u: string) => {
  return async (): Promise<IndexResponse<Game>> => {
    return await get(u);
  };
};

export const useLatestGame = (
  params?: GamesParams
): SWRResponse<IndexResponse<Game>, Error, boolean> => {

  const { indexApiPrefix } = useApiPrefix()
  const p = {
    ...defaultParams,
    ...(params ? params : {}),
  };
  const queryString = new URLSearchParams(p);
  const requestUrl = `${indexApiPrefix}${url}?${queryString.toString()}`;
  const res = useSWR(requestUrl, getFetcher(requestUrl));
  return res;
};
