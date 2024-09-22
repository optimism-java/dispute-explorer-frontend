import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "@wagmi/core/chains";
import { http, createConfig } from "@wagmi/core";

export const RainbowConfig = getDefaultConfig({
  appName: "SuperProof explorer",
  projectId: "876a28d2d23153fe7f76c24bacbabb72",
  chains: [mainnet, sepolia],
  // ssr: true
});

export const wagmiConfig = createConfig({
  chains: [sepolia, mainnet],
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
  },
});
