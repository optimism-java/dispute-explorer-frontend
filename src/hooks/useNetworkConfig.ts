import { NetworkConfig, networkConfigs, Network } from "@/utils/env";
import { useEffect, useMemo, useState } from "react";

export const useNetworkConfig = (): NetworkConfig => {
  const defaultNetwork = networkConfigs["sepolia"];
  const [cachedConfig, setConfig] = useState<NetworkConfig | null>(null);
  useEffect(() => {
    const getChain = async () => {
      if (!cachedConfig) {
        try {
          const res = await fetch("/api/disputegames/chainname");
          const data = res.json() as any;
          const network = data?.blockchain;
          if (network) {
            const config = networkConfigs[network as Network];
            if (config) {
              setConfig(config);
            } else {
              setConfig(defaultNetwork);
            }
          } else {
            setConfig(defaultNetwork);
          }
        } catch (error) {
          console.error("failed to fetch network:", error);
          setConfig(defaultNetwork);
        }
      }
    };
    getChain();
  }, [cachedConfig, defaultNetwork]);
  const host = window?.location?.host;

  defaultNetwork.network = "mainnet";
  const config = useMemo(() => {
    for (const key of Object.keys(networkConfigs)) {
      const val = networkConfigs[key as Network];
      if (val && val.origin === host) {
        val.network = key as Network;
        return val;
      }
    }
  }, [origin]);
  return config || defaultNetwork;
};
