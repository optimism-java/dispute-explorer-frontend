import useSWR, { SWRResponse } from "swr";
import { get } from "@/service/index";
import { ClaimData, ListResponse } from "@/types";

export const useClaimData = (
  address: string
): SWRResponse<ListResponse<ClaimData>, Error, boolean> => {
  const url = `/api/disputegames/${address}/claimdatas`;
  const params = {};
  const fetcher = async (): Promise<ListResponse<ClaimData>> => {
    return await get(url, params);
  };
  const res = useSWR(url, fetcher);
  return res;
};
