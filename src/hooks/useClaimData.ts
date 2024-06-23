import request from "../lib/request"
import { ClaimData } from "../lib/types"

const useClaimData = (address: string) => {
    const state = request.get<ClaimData>({
        url: `/disputegames/${address}/claimdatas`
    })
    return state
}

export default useClaimData