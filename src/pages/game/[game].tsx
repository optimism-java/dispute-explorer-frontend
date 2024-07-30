import { useRouter } from "next/router";
import React, { useMemo } from "react";
import ClaimChart from "@/components/Charts/ClaimChart";
import { useClaimData } from "@/hooks/useClaimData";
import { ChartSkeleton } from "@/components/ChartSkeleton";
import { ClaimData } from "@/types";
import { useLatestGame } from "@/hooks/useLatestGame";
import { GameItemCard } from "@/components/Cards/GameItemCard";
import Skeleton from "react-loading-skeleton";
import { shortenAddress } from "@/utils";
import {
  formatSeconds,
  formatTimestamp,
  formatTtl,
  getHumanDate,
} from "@/utils/date";

const GameDetail = () => {
  const router = useRouter();
  const address = (router.query.game as string | undefined) ?? "";

  const { data, isLoading } = useClaimData(address);
  const { data: game, isLoading: gameLoading } = useLatestGame({
    limit: "1",
    q: address,
  });
  return (
    <div className="flex flex-col gap-4">
      {gameLoading && isLoading ? (
        <Skeleton style={{ width: "100%" }} height={250} />
      ) : (
        <div className="col-span-3 grid w-full grid-cols-3 gap-2 sm:col-span-3 sm:grid-cols-3">
          <GameItemCard
            name="Game Address"
            content={shortenAddress(game?.hits[0].game_contract as string, 8)}
          />
          <GameItemCard
            name="Root Claim"
            content={"0x" + shortenAddress(data?.data[0].claim as string, 8)}
          />
          <GameItemCard
            name="Created"
            content={formatSeconds(game?.hits[0].block_time as number)}
          />
          <GameItemCard name="Claims" content={data?.data.length.toString()} />
          <GameItemCard
            name="Status"
            content={game?.hits[0].status === 0 ? "In Progress" : "Resloved"}
          />
          <GameItemCard
            name="Disputed L2 Block"
            content={game?.hits[0].l2_block_number.toString()}
          />
        </div>
      )}

      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <ChartSkeleton itemsCount={6} />
        </div>
      ) : (
        <ClaimChart claimData={data?.data as ClaimData[]} />
      )}
    </div>
  );
};

export default GameDetail;
