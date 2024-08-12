import useSWR, { SWRResponse } from "swr";
import { get, post } from "@/service/index";
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

const getFetcher = (u: string, p: GamesParams) => {
  return async (): Promise<IndexResponse<Game>> => {
    return await post(u, p);
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
  const requestUrl = `${indexApiPrefix}${url}}`;
  const res = useSWR([requestUrl, p], getFetcher(requestUrl, p));
  return res;
};
