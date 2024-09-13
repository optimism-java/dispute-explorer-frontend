import { post } from '@/service';
import useSWRMutation, { SWRMutationResponse } from 'swr/mutation'

type CalculateArgs = {
  disputeGame: string
  position: number
}
export const useCalculateClaim = () => {
  const url = `/api/disputegames/calculate/claim`;
  async function fetcher(url: string, { arg }: { arg: CalculateArgs }) {
    return await post(url, arg)
  }
  const res = useSWRMutation(url, fetcher);
  return res
};
