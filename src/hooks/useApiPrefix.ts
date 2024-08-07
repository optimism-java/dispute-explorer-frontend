import { store } from "@/store/globalStore"
import { useSnapshot } from "valtio"


const useApiPrefix = () => {
  const { apiPrefix, indexApiPrefix } = useSnapshot(store)
  return {
    apiPrefix,
    indexApiPrefix
  }
}

export default useApiPrefix