import { useNetworkConfig } from "@/hooks/useNetworkConfig";
import Link from "next/link";


const DisputeGameLogo: React.FC<{ className?: string }> = ({ }) => {
  const { network } = useNetworkConfig()
  return <Link href="/">
    <img src={network === 'base-sepolia' ? '/logo_base.svg' : '/logo.svg'} className="w-48" alt="logo" />
  </Link>
};

export default DisputeGameLogo;
