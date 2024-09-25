import { NetworkConfigContext } from "@/components/NetworkConfigContext";
import Link from "next/link";
import { useContext } from "react";

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { network } = useContext(NetworkConfigContext);
  return (
    <Link href="/">
      <img
        src={network === "base-sepolia" ? "/logo_base.svg" : "/logo.svg"}
        className="w-40"
        alt="logo"
      />
    </Link>
  );
};
