"use client"
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ReactNode, useMemo } from 'react';
import { RainbowConfig } from '@/hooks/useWagmiConfig';


const queryClient = new QueryClient();

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={RainbowConfig}>
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