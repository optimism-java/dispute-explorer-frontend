import { useAsync } from 'react-use';
import request from '../lib/request';
import { Credit } from '../lib/types';

const useCreditRank = () => {
  const state = useAsync(async () => {
    const response = await request.get<Credit>({
      url: '/disputegames/credit/rank',
    });
    return response.data;
  });
  return state;
};

export default useCreditRank;
