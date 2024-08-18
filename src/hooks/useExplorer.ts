import { store } from "@/store/globalStore"
import { useSnapshot } from "valtio"

const MainnetUrl = 'https://optimistic.etherscan.io'
const TestnetUrl = 'https://sepolia-optimism.etherscan.io'
const useExplorer = () => {
  const { network } = useSnapshot(store)
  return network === 'mainnet' ? MainnetUrl : TestnetUrl
}


export default useExplorer