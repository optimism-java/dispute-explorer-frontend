import { useAsync } from 'react-use';
import request from '../lib/axios/request';
import { Overview } from '../lib/types';

const useOverview = () => {
  const state = useAsync(async () => {
    const response = await request.get<Overview>({
      url: '/disputegames/overview',
    });
    return response.data;
  });
  return state;
};

export default useOverview;
