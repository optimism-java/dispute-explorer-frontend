export type Network = 'mainnet' | 'sepolia' | 'base-sepolia'

export const EXPLORER_L1 = process.env.NEXT_PUBLIC_L1_EXPLORER || 'https://optimistic.etherscan.io'
export const EXPLORER_L2 = process.env.NEXT_PUBLIC_L1_EXPLORER || 'https://sepolia-optimism.etherscan.io'
export const network = process.env.NEXT_PUBLIC_NETWORK as Network || 'sepolia'

export const ApiDoc = "http://144.76.97.175:8080/swagger/index.html"

export const SuperProofUrls: Record<Network, string> = {
  'mainnet': '',
  'sepolia': '',
  'base-sepolia': ''
}