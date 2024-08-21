import useSWR, { SWRResponse } from "swr";
import { get, post } from "@/service/index";
import { Game, IndexResponse } from "@/types";
import { useEffect, useState } from "react";

const url = "/index/indexes/disputegames/search";

type GamesParams = {
  hitsPerPage?: number;
  page?: number;
  sort?: any;
  q?: string;
};

const defaultParams: GamesParams = {
  hitsPerPage: 5,
  page: 1,
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

  const p = {
    ...defaultParams,
    ...(params ? params : {}),
  };
  const requestUrl = `${url}`;
  const res = useSWR([requestUrl, p], getFetcher(requestUrl, p));
  return res;
};
