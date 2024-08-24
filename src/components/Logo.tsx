import { useNetworkConfig } from "@/hooks/useNetworkConfig";
import { useTheme } from "next-themes";
import Link from "next/link";

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { network } = useNetworkConfig()
  return (
    <Link href="/">
      <img src={network === 'base-sepolia' ? '/logo_base.svg' : '/logo.svg'} className="w-40" alt="logo" />
    </Link>
  );
}
