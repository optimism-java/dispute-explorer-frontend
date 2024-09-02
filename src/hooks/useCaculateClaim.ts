import useSWRMutation, { SWRMutationResponse } from 'swr/mutation'

type CalculateArgs = {
  disputeGame: string
  position: string
}
export const useCalculateClaim = () => {
  const url = `/api/disputegames/calculate/claim`;
  async function fetcher(url: string, { arg }: { arg: CalculateArgs }) {
    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(arg)
    })
  }
  const res = useSWRMutation(url, fetcher);
  return res
};
