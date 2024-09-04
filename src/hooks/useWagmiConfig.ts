import { useMemo } from "react";
import { useNetworkConfig } from "./useNetworkConfig";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "viem/chains";
import { http, createConfig } from 'wagmi'

const useWagmiRainbowConfig = () => {
  const { network } = useNetworkConfig()

  const isMainnet = useMemo(() => {
    return network === 'mainnet'
  }, [network])
  const config = getDefaultConfig({
    appName: 'SuperProof explorer',
    projectId: '876a28d2d23153fe7f76c24bacbabb72',
    chains: [isMainnet ? mainnet : sepolia],
    ssr: true
  });
  return config
}

export default useWagmiRainbowConfig;


const useWagmiConfig = () => {
  const { network } = useNetworkConfig()
  const isMainnet = useMemo(() => {
    return network === 'mainnet'
  }, [network])
  const config = useMemo(() => createConfig({
    chains: [isMainnet ? mainnet : sepolia],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  }), [isMainnet])
  return config
}

export {
  useWagmiConfig
}