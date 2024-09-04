import { NetworkConfig, networkConfigs, Network } from "@/utils/env";
import { useMemo } from "react";

export const useNetworkConfig = (): NetworkConfig => {
  const host = window?.location?.host;
  const defaultNetwork = networkConfigs["sepolia"];
  defaultNetwork.network = "sepolia";
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
