import { useAsync } from 'react-use';
import request from '../lib/request';
import { CreditDetail } from '../lib/types';

const useCreditDetail = (address: string) => {
  const state = useAsync(async () => {
    const response = await request.get<CreditDetail>({
      url: `/disputegames/${address}/credit`,
    });
    return response;
  });
  return state;
};

export default useCreditDetail;
