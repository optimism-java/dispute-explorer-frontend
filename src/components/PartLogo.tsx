import { NetworkConfigContext } from "@/components/NetworkConfigContext";
import Link from "next/link";
import { useContext } from "react";

const PartLogo: React.FC<{ className?: string }> = ({}) => {
  const { network } = useContext(NetworkConfigContext);
  const isBase = network.indexOf("base") !== -1;
  return (
    <div
      className={`w-8 h-12 bg-left bg-no-repeat bg-[length:400%] ${
        isBase ? "bg-[url('/logo_base.svg')]" : "bg-[url('/logo.svg')]"
      }`}
    />
  );
};

export default PartLogo;
