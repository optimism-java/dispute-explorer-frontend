import { useMemo } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

// import { BlockCard } from "@/components/Cards/SurfaceCards/BlockCard";
import { PaginatedListLayout } from "@/components/Layouts/PaginatedListLayout";
import NextError from "@/pages/_error";
import { formatNumber } from "@/utils";
import { getPaginationParams } from "@/utils/pagination";
import { useCreditRank } from "@/hooks/useCreditRank";
import { CreditCard } from "@/components/Cards/SurfaceCards/CreditCard";

const Rank: NextPage = function () {
  const router = useRouter();
  const { p, ps } = getPaginationParams(router.query);
  const { data: rawRankData, error } = useCreditRank({ offset: (p - 1).toString(), limit: ps.toString() })
  const blocksData = useMemo(() => {
    if (!rawRankData) {
      return {};
    }

    return {
      totalRanks: 100,
      ranks: rawRankData.data
    };
  }, [rawRankData]);
  const { ranks, totalRanks } = blocksData;

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
      header={`Rank ${totalRanks ? `(${formatNumber(totalRanks)})` : ""}`}
      items={ranks?.map((b, i) => (
        <CreditCard index={(p && ps ? Number(p - 1) * ps : 0) + i} key={b.address} credit={b} />
      ))}
      totalItems={totalRanks}
      page={p}
      pageSize={ps}
      itemSkeleton={<CreditCard />}
      emptyState="No ranks"
    />
  );
};

export default Rank;
