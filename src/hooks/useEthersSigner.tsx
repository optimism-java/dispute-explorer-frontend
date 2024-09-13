import { Config, getConnectorClient } from '@wagmi/core'
import { BrowserProvider, JsonRpcSigner } from 'ethers'
import { useEffect, useMemo, useState } from 'react'
import type { Account, Chain, Client, Transport } from 'viem'
import { Connector, useAccount } from 'wagmi'
import { wagmiConfig } from './useWagmiConfig'
import { useNetworkConfig } from './useNetworkConfig'
import { mainnet, sepolia } from 'viem/chains'

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new BrowserProvider(transport, network)
  const signer = new JsonRpcSigner(provider, account.address)
  return signer
}

/** Action to convert a viem Wallet Client to an ethers.js Signer. */
export async function getEthersSigner(
  config: Config,
  { chainId, connector }: { chainId?: number, connector?: Connector } = {},
) {
  const client = await getConnectorClient(config, { chainId, connector })
  return clientToSigner(client)
}

export const useEthersSigner = () => {
  const [signer, setSigner] = useState<JsonRpcSigner>()
  const { network } = useNetworkConfig()
  const chainId = useMemo(() => {
    return network === 'mainnet' ? mainnet.id : sepolia.id
  }, [network])
  const { isConnected, connector } = useAccount()
  useEffect(() => {
    const getSigner = async () => {
      const p = await getEthersSigner(wagmiConfig, { chainId, connector })
      setSigner(p)
    }
    if (isConnected && connector) {
      getSigner()
    }
  }, [isConnected])
  return signer
}