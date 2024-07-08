import { useAsync } from 'react-use';
import request from '../lib/axios/request';
import { Amountperday } from '../lib/types';

const useAmountPerday = () => {
  const state = useAsync(async () => {
    const response = await request.get<Amountperday>({
      url: '/disputegames/overview/amountperdays',
    });
    return response.data;
  });
  return state;
};

export default useAmountPerday;
