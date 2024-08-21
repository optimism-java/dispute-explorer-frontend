import { NetworkConfig, networkConfigs } from "@/utils/env";
import { useMemo } from "react";

export const useNetworkConfig = (): NetworkConfig => {
  const origin = window.location.origin;
  const config = useMemo(() => {
    for (const val of Object.values(networkConfigs)) {
      if (val.origin === origin) {
        return val;
      }
    }
  }, [origin]);
  return config || networkConfigs["sepolia"];
};
