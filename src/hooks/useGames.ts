import { useAsync } from 'react-use';
import request from '../lib/request';
import { Game, Pager } from '../lib/types';

const useGames = (params: Pager = { page: 1, size: 10 }) => {
  const state = useAsync(async () => {
    const response = await request.get<Game>({
      url: '/disputegames',
      params,
    });
    return response.records;
  });
  return state;
};

export default useGames;
