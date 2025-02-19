import { NetworkConfigContext } from "@/components/NetworkConfigContext";
import Link from "next/link";
import { useContext } from "react";

const DisputeGameLogo: React.FC<{ className?: string }> = ({}) => {
  const { network } = useContext(NetworkConfigContext);
  const isBase = network.indexOf("base") !== -1;
  return (
    <Link href="/">
      <img
        src={isBase ? "/logo_base.svg" : "/logo.svg"}
        className="w-48"
        alt="logo"
      />
    </Link>
  );
};

export default DisputeGameLogo;
