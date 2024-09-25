import { ChangeEvent, useCallback, useMemo } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { PaginatedListLayout } from "@/components/Layouts/PaginatedListLayout";
import NextError from "@/pages/_error";
import { formatNumber } from "@/utils";
import { GameCard } from "@/components/Cards/SurfaceCards/GameCard";
import { getPaginationParams, getPaginationWithClaimParams } from "@/utils/pagination";
import { useLatestGame } from "@/hooks/useLatestGame";
import { Input } from "@/components/Input";

const Blocks: NextPage = function () {
  const router = useRouter();
  const { p, ps, len } = getPaginationWithClaimParams(router.query);
  const { data: rawBlocksData, error } = useLatestGame({
    page: Number(p),
    hitsPerPage: Number(ps),
    filter: `claim_data_len >= ${len}`
  });
  const blocksData = useMemo(() => {
    if (!rawBlocksData) {
      return {};
    }
    return {
      totalBlocks: rawBlocksData.totalHits,
      blocks: rawBlocksData.hits,
    };
  }, [rawBlocksData]);
  const { blocks, totalBlocks } = blocksData;
  const handleClaimDataLenChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    void router.push({
      pathname: router.pathname,
      query: {
        p: p,
        ps: ps,
        len: e.target.value
      },
    })
  }, [])
  if (error) {
    return <NextError title={error.message} statusCode={500} />;
  }

  return (
    <PaginatedListLayout
      header={`Games ${totalBlocks ? `(${formatNumber(totalBlocks)})` : ""}`}
      items={blocks?.map((b) => (
        <GameCard key={b.block_hash} game={b} />
      ))}
      filter={
        <div className="flex gap-2 items-center">
          <span className="text-[14px] font-semibold shadow-sm text-contentTertiary-light dark:text-contentTertiary-dark">Min ClaimDataLen:</span>
          <Input
            className="text-sm w-16"
            type="number"
            min={1}
            value={len}
            onChange={handleClaimDataLenChange}
          />
        </div>
      }
      totalItems={totalBlocks}
      page={p}
      pageSize={ps}
      itemSkeleton={<GameCard />}
      emptyState="No blocks"
    />
  );
};

export default Blocks;
