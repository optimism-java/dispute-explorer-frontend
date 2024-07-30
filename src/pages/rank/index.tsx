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
import { useCreditRank } from "@/hooks/useCreditRank";
import { CreditCard } from "@/components/Cards/SurfaceCards/CreditCard";

const Rank: NextPage = function () {
  const router = useRouter();
  const { p, ps } = getPaginationParams(router.query);
  const { data: rawBlocksData, error } = useCreditRank({ offset: (p - 1).toString(), limit: ps.toString() })
  const blocksData = useMemo(() => {
    if (!rawBlocksData) {
      return {};
    }

    return {
      totalBlocks: 100,
      blocks: rawBlocksData.data
    };
  }, [rawBlocksData]);
  const { blocks, totalBlocks } = blocksData;

  if (error) {
    return (
      <NextError
        title={error.message}
        statusCode={500}
      />
    );
  }

  return (
    <PaginatedListLayout
      header={`Rank ${totalBlocks ? `(${formatNumber(totalBlocks)})` : ""}`}
      items={blocks?.map((b, i) => (
        <CreditCard index={(p && ps ? Number(p - 1) * ps : 0) + i} key={b.address} credit={b} />
      ))}
      totalItems={totalBlocks}
      page={p}
      pageSize={ps}
      itemSkeleton={<CreditCard />}
      emptyState="No blocks"
    />
  );
};

export default Rank;
