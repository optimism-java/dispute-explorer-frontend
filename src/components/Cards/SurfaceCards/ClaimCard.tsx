import { ClaimData } from "@/types";
import React, { FC } from "react";
import { SurfaceCardBase } from "./SurfaceCardBase";
import { Link } from "@/components/Link";
import { Skeleton } from "@/components/Skeleton";
import { CardField } from "../Card";
import { shortenAddress } from "@/utils";
import { EXPLORER_L2 } from "@/utils/env";

type ClaimCardProps = {
  claimData: ClaimData;
};

const ClaimCard: FC<Partial<ClaimCardProps>> = ({ claimData = {} }) => {
  const { claim, claimant, output_block, event_id } = claimData;
  return (
    <SurfaceCardBase>
      <div className="flex justify-between gap-2 text-sm">
        <div className="flex gap-2 md:flex-row">
          {output_block ? (
            <div className="flex gap-1 text-contentSecondary-light dark:text-contentSecondary-dark">
              Block{" "}
              <Link
                href={`${EXPLORER_L2}/block/${output_block}`}
                isExternal
              >
                {output_block}
              </Link>
            </div>
          ) : (
            <Skeleton width={150} />
          )}
        </div>
      </div>
      {claim ? (
        <CardField name={<div title="claim">Claim</div>} value={claim} />
      ) : (
        <Skeleton width={110} size="xs" />
      )}
      <div className="mt-1.5 flex flex-col gap-1 text-xs">
        <div className="flex w-full gap-1">
          {claimant ? (
            <CardField
              name={<div title="Game Address">Claimant</div>}
              value={
                <Link
                  href={`https://sepolia.etherscan.io/address/${claimant}`}
                  isExternal
                >
                  {shortenAddress(claimant)}
                </Link>
              }
            />
          ) : (
            <Skeleton width={300} size="xs" />
          )}
        </div>
        {event_id ? (
          <CardField
            name={<div title="Game Address">EventId</div>}
            value={event_id}
          />
        ) : (
          <Skeleton width={170} size="xs" />
        )}
      </div>
    </SurfaceCardBase>
  );
};

export default ClaimCard;
