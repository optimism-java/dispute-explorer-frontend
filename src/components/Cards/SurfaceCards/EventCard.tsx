import type { FC } from "react";

import dayjs from "@/utils/dayjs";
import { Skeleton } from "@/components/Skeleton";
import { Link } from "../../Link";
import { SurfaceCardBase } from "./SurfaceCardBase";
import { LatestEvents } from "@/types";
import { shortenAddress } from "@/utils";
import { useNetworkConfig } from "@/hooks/useNetworkConfig";

type EventCardProps = {
  events: LatestEvents;
};

const EventCard: FC<Partial<EventCardProps>> = function ({
  events: {
    event_name,
    event_hash,
    block_time,
    contract_address,
    status,
    tx_hash,
  } = {},
}) {
  const { explorer_l1: EXPLORER_L1 } = useNetworkConfig();

  return (
    <SurfaceCardBase>
      <div className="text-sm">{event_name}</div>
      <div className="flex  justify-between gap-2 text-sm">
        <div className="flex gap-2 md:flex-row">
          {event_hash ? (
            <div className="flex gap-1 text-contentSecondary-light dark:text-contentSecondary-dark">
              <Link href={`${EXPLORER_L1}/tx/${tx_hash}`} isExternal>
                {shortenAddress(event_hash, 10)}
              </Link>
            </div>
          ) : (
            <Skeleton width={150} />
          )}
        </div>
        {/* <div className="flex items-center gap-2">
          {status === 1 && (
            <Image src={sword} width={16} height={16} alt="sword" />
          )}
          {status === 2 && (
            <Image src={shield} width={16} height={16} alt="shield" />
          )}
        </div> */}
      </div>
      {block_time ? (
        <div className="text-xs italic text-contentSecondary-light dark:text-contentSecondary-dark">
          {dayjs(block_time * 1000).fromNow()}
        </div>
      ) : (
        <Skeleton width={110} size="xs" />
      )}
      <div className="mt-1.5 flex flex-col gap-1 text-xs">
        <div className="flex w-full gap-1">
          {contract_address ? (
            <div className="flex w-full gap-1">
              <div>Contract Address: </div>
              <Link href={`${EXPLORER_L1}/address/${contract_address}`}>
                {shortenAddress(contract_address)}
              </Link>
            </div>
          ) : (
            <Skeleton width={300} size="xs" />
          )}
        </div>
        {/* {status ? (
          <div className="mt-1 flex">
            <span>{status}</span>
          </div>
        ) : (
          <Skeleton width={170} size="xs" />
        )} */}
      </div>
    </SurfaceCardBase>
  );
};

export { EventCard };
