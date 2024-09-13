import { useAccount, useSwitchChain } from "wagmi"
import { useNetworkConfig } from "./useNetworkConfig"
import { useEffect } from "react"
import { mainnet, sepolia } from "viem/chains"


const useAutoSwitchNetwork = () => {
  const { network } = useNetworkConfig()
  const { switchChain } = useSwitchChain()
  const { isConnected, chain } = useAccount()
  useEffect(() => {
    if (!isConnected || !chain) return;
    const targetChainId = network === 'mainnet' ? mainnet.id : sepolia.id;
    if (chain.id !== targetChainId) {
      switchChain({ chainId: targetChainId })
    }
  }, [isConnected, network, chain])
}

export default useAutoSwitchNetwork