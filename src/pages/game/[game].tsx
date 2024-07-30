import { useRouter } from "next/router";
import React, { useMemo } from "react";
import ClaimChart from "@/components/Charts/ClaimChart";
import { useClaimData } from "@/hooks/useClaimData";

const GameDetail = () => {
  const router = useRouter();
  console.log(router);
  const address = (router.query.game as string | undefined) ?? "";
  console.log(address);

  const { data, isLoading } = useClaimData(address);
  if (!data) {
    return <>no data</>;
  }

  return (
    <div className="min-h-screen">
      <ClaimChart claimData={isLoading? [] : data.data} />
    </div>
  );
};

export default GameDetail;
