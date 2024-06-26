import { useAsync } from 'react-use';
import request from '../lib/request';
import { ClaimData } from '../lib/types';

const useClaimData = (address: string) => {
  const state = useAsync(async () => {
    const response = await request.get<ClaimData>({
      url: `/disputegames/${address}/claimdatas`,
    });
    return response.data;
  });
  return state;
};

export default useClaimData;
