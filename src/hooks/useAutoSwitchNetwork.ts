import { useAccount, useSwitchChain } from "wagmi";
import { useContext, useEffect } from "react";
import { mainnet, sepolia } from "viem/chains";
import { NetworkConfigContext } from "@/components/NetworkConfigContext";

const useAutoSwitchNetwork = () => {
  const { network } = useContext(NetworkConfigContext);
  const { switchChain } = useSwitchChain();
  const { isConnected, chain } = useAccount();
  useEffect(() => {
    if (!isConnected || !chain) return;
    const targetChainId = network === "mainnet" ? mainnet.id : sepolia.id;
    if (chain.id !== targetChainId) {
      switchChain({ chainId: targetChainId });
    }
  }, [isConnected, network, chain]);
};

export default useAutoSwitchNetwork;
