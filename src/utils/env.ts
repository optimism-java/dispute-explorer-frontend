import { Address } from "viem";

export type Network = "mainnet" | "sepolia" | "base-sepolia";

export const ApiDoc = process.env.NEXT_PUBLIC_API_DOC || "";

export interface NetworkConfig {
  origin: string;
  explorer_l1: string;
  explorer_l2: string;
  network?: Network;
}

export const networkConfigs: Record<Network, NetworkConfig> = {
  mainnet: {
    origin: process.env.NEXT_PUBLIC_OP_MAINNET_URL || "",
    explorer_l1: "https://etherscan.io",
    explorer_l2: "https://optimistic.etherscan.io/",
  },
  sepolia: {
    origin: process.env.NEXT_PUBLIC_OP_SEPOLIA_URL || "",
    explorer_l1: "https://sepolia.etherscan.io",
    explorer_l2: "https://sepolia-optimism.etherscan.io",
  },
  "base-sepolia": {
    origin: process.env.NEXT_PUBLIC_BASE_SEPOLIA_URL || "",
    explorer_l1: "https://sepolia.etherscan.io",
    explorer_l2: "https://sepolia.basescan.org",
  },
};
