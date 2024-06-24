import { useAsync } from "react-use";
import { Game, Pager } from "../lib/types";
import request from '../lib/request';

const useGames = (params: Pager = {page: 1, size: 10}) => {
    const state = useAsync(async () => {
        const response = await request.get<Game>({
            url: '/disputegames',
            params
        })
        return response.data
    })
    return state
}

export default useGames