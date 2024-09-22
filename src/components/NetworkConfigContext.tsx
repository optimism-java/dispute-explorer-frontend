import { NetworkConfig, networkConfigs, Network } from "@/utils/env";
import { createContext, ReactNode, useEffect, useState } from "react";

const defaultNetwork = networkConfigs["sepolia"];
export const NetworkConfigContext =
  createContext<NetworkConfig>(defaultNetwork);

export default function NetworkConfigProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [config, setConfig] = useState<NetworkConfig>(defaultNetwork);
  useEffect(() => {
    const getChain = async () => {
      try {
        const res = await fetch("/api/disputegames/chainname");
        const data = await res.json();
        let network = data?.blockchain as string;
        if (network) {
          if (network.startsWith("eth-")) {
            network = network.substring(4);
          }
          const fetchedConfig = networkConfigs[network as Network];
          if (fetchedConfig) {
            setConfig(fetchedConfig); // 更新上下文状态
          }
        }
      } catch (error) {
        console.error("Failed to fetch network:", error);
      }
    };

    getChain();
  }, []);

  return (
    <NetworkConfigContext.Provider value={config}>
      {children}
    </NetworkConfigContext.Provider>
  );
}
