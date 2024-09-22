import { ClaimData } from "@/types";
import React, { FC, useContext } from "react";
import { SurfaceCardBase } from "./SurfaceCardBase";
import { Link } from "@/components/Link";
import { Skeleton } from "@/components/Skeleton";
import { CardField } from "../Card";
import { shortenAddress } from "@/utils";
import { NetworkConfigContext } from "@/components/NetworkConfigContext";

type ClaimCardProps = {
  claimData: ClaimData;
};

const ClaimCard: FC<Partial<ClaimCardProps>> = ({
  claimData = {} as ClaimData,
}) => {
  const { claim, claimant, output_block, event_id } = claimData;
  const { explorer_l1: EXPLORER_L1, explorer_l2: EXPLORER_L2 } =
    useContext(NetworkConfigContext);
  return (
    <SurfaceCardBase>
      <div className="flex justify-between gap-2 text-sm">
        <div className="flex gap-2 md:flex-row">
          {output_block ? (
            <div className="flex gap-1 text-contentSecondary-light dark:text-contentSecondary-dark">
              Block{" "}
              <Link href={`${EXPLORER_L2}/block/${output_block}`} isExternal>
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
                <Link href={`${EXPLORER_L1}/address/${claimant}`} isExternal>
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
