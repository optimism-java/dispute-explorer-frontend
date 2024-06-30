import { useAsync } from 'react-use';
import request from '../lib/axios/indexRequest';
import { Game, SearchParams } from '../lib/types';

const useGames = (params: SearchParams = { limit: 10 }) => {
  const state = useAsync(async () => {
    const response = await request.get<Game>({
      url: '/indexes/disputegame/search',
      params,
    });
    return response;
  });
  return state;
};

export default useGames;
