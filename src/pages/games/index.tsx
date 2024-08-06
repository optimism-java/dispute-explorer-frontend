import { useMemo } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

// import { BlockCard } from "@/components/Cards/SurfaceCards/BlockCard";
import { PaginatedListLayout } from "@/components/Layouts/PaginatedListLayout";
import NextError from "@/pages/_error";
import { formatNumber } from "@/utils";
import { GameCard } from "@/components/Cards/SurfaceCards/GameCard";
import { getPaginationParams } from "@/utils/pagination";
import { useLatestGame } from "@/hooks/useLatestGame";

const Blocks: NextPage = function () {
  const router = useRouter();
  const { p, ps } = getPaginationParams(router.query);
  const { data: rawBlocksData, error } = useLatestGame({
    offset: (p - 1).toString(),
    limit: ps.toString(),
  });
  const blocksData = useMemo(() => {
    if (!rawBlocksData) {
      return {};
    }

    return {
      totalBlocks: rawBlocksData.estimatedTotalHits,
      blocks: rawBlocksData.hits,
    };
  }, [rawBlocksData]);
  const { blocks, totalBlocks } = blocksData;

  if (error) {
    return <NextError title={error.message} statusCode={500} />;
  }

  return (
    <PaginatedListLayout
      header={`Games ${totalBlocks ? `(${formatNumber(totalBlocks)})` : ""}`}
      items={blocks?.map((b) => (
        <GameCard key={b.block_hash} game={b} />
      ))}
      totalItems={totalBlocks}
      page={p}
      pageSize={ps}
      itemSkeleton={<GameCard />}
      emptyState="No blocks"
    />
  );
};

export default Blocks;
