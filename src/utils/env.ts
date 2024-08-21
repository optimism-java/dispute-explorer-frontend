export type Network = 'mainnet' | 'sepolia' | 'base-sepolia'

export const EXPLORER_L1 = process.env.NEXT_PUBLIC_L1_EXPLORER || 'https://sepolia.etherscan.io'
export const EXPLORER_L2 = process.env.NEXT_PUBLIC_L2_EXPLORER || 'https://sepolia-optimism.etherscan.io'
export const network = process.env.NEXT_PUBLIC_NETWORK as Network || 'sepolia'
export const ApiDoc = process.env.NEXT_PUBLIC_API_DOC || ''

export const SuperProofUrls: Record<Network, string> = {
  'mainnet': process.env.NEXT_PUBLIC_OP_MAINNET_URL || '',
  'sepolia': process.env.NEXT_PUBLIC_OP_SEPOLIA_URL || '',
  'base-sepolia': process.env.NEXT_PUBLIC_BASE_SEPOLIA_URL || ''
}

console.log(SuperProofUrls, 'ssss')
