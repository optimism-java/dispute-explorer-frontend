import useSWR, { SWRResponse } from "swr";
import { post, get } from "@/service/index";
import { ClaimData, ListResponse } from "@/types";

import useSWRMutation from "swr/mutation";

async function postFetcher(url: string, { arg }: { arg: any }) {
  return await post(url, arg);
}

export const useFrontendMoveMutation = () => {
  return useSWRMutation("/api/disputegames/frontend-move", postFetcher);
};

export const useGetFrontendMoves = (address: string) => {
  const url = `/api/disputegames/${address}/frontend-moves`;
  const params = {};
  const fetcher = async (): Promise<ListResponse<ClaimData>> => {
    return await get(url, params);
  };
  const res = useSWR(url, fetcher);
  return res;
};

export const useGetFrontendMovesByTx = (txHash: string) => {
  const url = `/api/disputegames/frontend-move/{txHash}`;
  const params = {};
  const fetcher = async (): Promise<ListResponse<ClaimData>> => {
    return await get(url, params);
  };
  const res = useSWR(url, fetcher);
  return res;
};
