import { useAsync } from 'react-use';
import request from '../lib/axios/indexRequest';
import { CreditDetail, SearchParams } from '../lib/types';

const useCreditDetail = (params: SearchParams) => {
  const state = useAsync(async () => {
    const response = await request.get<CreditDetail>({
      url: '/indexes/gamecredit/search',
      params,
    });
    return response;
  }, [params]);
  return state;
};

export default useCreditDetail;
