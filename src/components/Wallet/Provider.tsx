
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  sepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ReactNode, useMemo } from 'react';
import { useNetworkConfig } from '@/hooks/useNetworkConfig';


const queryClient = new QueryClient();

const Provider = ({ children }: { children: ReactNode }) => {
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
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale={'en'} modalSize="compact" >
          {
            children
          }
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Provider