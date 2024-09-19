import { type Config, getClient } from '@wagmi/core'
import { FallbackProvider, JsonRpcProvider } from 'ethers'
import type { Client, Chain, Transport } from 'viem'
import { wagmiConfig } from './useWagmiConfig'
import { useMemo } from 'react'
import { useNetworkConfig } from './useNetworkConfig'
import { mainnet, sepolia } from 'viem/chains'

export function clientToProvider(client: Client<Transport, Chain>) {
  const { chain, transport } = client
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  if (transport.type === 'fallback') {
    const providers = (transport.transports as ReturnType<Transport>[]).map(
      ({ value }) => new JsonRpcProvider(value?.url, network),
    )
    if (providers.length === 1) return providers[0]
    return new FallbackProvider(providers)
  }
  return new JsonRpcProvider(transport.url, network)
}

/** Action to convert a viem Client to an ethers.js Provider. */
export function useEthersProvider() {
  const { network } = useNetworkConfig()
  const chainId = useMemo(() => {
    return network === 'mainnet' ? mainnet.id : sepolia.id
  }, [network])
  const client = useMemo(() => getClient(wagmiConfig, { chainId }), [chainId])
  return useMemo(() => {
    if (!client) return
    return clientToProvider(client)
  }, [client])
}