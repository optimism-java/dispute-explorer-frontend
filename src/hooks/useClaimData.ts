import useSWR, { SWRResponse } from "swr";
import { get } from "@/service/index";
import { ClaimData, ListResponse } from "@/types";
import useApiPrefix from "./useApiPrefix";

export const useClaimData = (
  address: string
): SWRResponse<ListResponse<ClaimData>, Error, boolean> => {
  const { apiPrefix } = useApiPrefix()
  const url = `${apiPrefix}/disputegames/${address}/claimdatas`;
  const params = {};
  const fetcher = async (): Promise<ListResponse<ClaimData>> => {
    return await get(url, params);
  };
  const res = useSWR(url, fetcher);
  return res;
};
