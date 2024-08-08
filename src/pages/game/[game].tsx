import { useRouter } from "next/router";
import React from "react";
import ClaimChart from "@/components/Charts/ClaimChart";
import { useClaimData } from "@/hooks/useClaimData";
import { ChartSkeleton } from "@/components/ChartSkeleton";
import { ClaimData, IndexResponse, ListResponse } from "@/types";
import { useLatestGame } from "@/hooks/useLatestGame";
import { GameItemCard } from "@/components/Cards/GameItemCard";
import Skeleton from "react-loading-skeleton";
import { shortenAddress } from "@/utils";
import { formatSeconds } from "@/utils/date";
import { Link } from "@/components/Link";
import { ClockIcon, FlagIcon } from "@heroicons/react/24/outline";
import { Card } from "@/components/Cards/Card";
import ClaimCard from "@/components/Cards/SurfaceCards/ClaimCard";
import { SlidableList } from "@/components/SlidableList";

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
      {gameLoading || isLoading ? (
        <Skeleton style={{ width: "100%" }} height={250} />
      ) : (
        <div className="col-span-3 grid w-full grid-cols-3 gap-2 sm:col-span-3 sm:grid-cols-3">
          <GameItemCard
            name="Game Address"
            content={
              <Link
                href={`https://sepolia.etherscan.io/address/${game?.hits[0].game_contract}`}
                isExternal
              >
                {shortenAddress(game?.hits[0].game_contract!, 8)}
              </Link>
            }
          />
          <GameItemCard
            name="Root Claim"
            content={"0x" + data?.data[0].claim}
          />
          <GameItemCard
            name="Created"
            content={formatSeconds(game?.hits[0].block_time!)}
          />
          <GameItemCard name="Claims" content={data?.data.length.toString()} />
          <GameItemCard
            name="Status"
            content={
              game?.hits[0].status === 0 ? (
                <ClockIcon
                  width={30}
                  height={30}
                  className="inline-block mx-auto text-warning-600"
                />
              ) : (
                <FlagIcon
                  width={30}
                  height={30}
                  className="inline-block mx-auto text-success-600"
                />
              )
            }
          />
          <GameItemCard
            name="Disputed L2 Block"
            content={
              <Link
                href={`https://sepolia-optimism.etherscan.io/block/${game?.hits[0].l2_block_number.toString()}`}
                isExternal
              >
                {game?.hits[0].l2_block_number.toString()}
              </Link>
            }
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
      <Card
        header={
          <div className="flex items-center justify-between gap-5">
            <div>All Claims</div>
          </div>
        }
        emptyState="No data"
      >
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {Array(1)
              .fill(0)
              .map((_, i) => (
                <div className="sm:h-28" key={i}>
                  <ClaimCard />
                </div>
              ))}
          </div>
        ) : (
          <SlidableList
            items={(data as ListResponse<ClaimData>).data?.map((g) => ({
              id: g.id,
              element: (
                <div className="sm:h-28" key={g.id}>
                  <ClaimCard claimData={g} />
                </div>
              ),
            }))}
          />
        )}
      </Card>
    </div>
  );
};

export default GameDetail;
