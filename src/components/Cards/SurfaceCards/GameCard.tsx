import type { FC } from "react";

import dayjs from "@/utils/dayjs";
import { Skeleton } from "@/components/Skeleton";
import { Link } from "../../Link";
import { CardField } from "../Card";
import { SurfaceCardBase } from "./SurfaceCardBase";
import { Game } from "@/types";
import { shortenAddress } from "@/utils";
import shield from "@/icons/shield.png";
import sword from "@/icons/sword.png";
import Image from "next/image";
import { EXPLORER_L2 } from "@/utils/env";

type GameCardProps = {
  game: Game;
};

const GameCard: FC<Partial<GameCardProps>> = function ({
  game: {
    l2_block_number: number,
    block_time,
    game_contract,
    status,
    tx_hash,
  } = {},
}) {
  return (
    <SurfaceCardBase>
      <div className="flex justify-between gap-2 text-sm">
        <div className="flex gap-2 md:flex-row">
          {number ? (
            <div className="flex gap-1 text-contentSecondary-light dark:text-contentSecondary-dark">
              Block{" "}
              <Link
                href={`${EXPLORER_L2}/block/${number}`}
                isExternal
              >
                {number}
              </Link>
            </div>
          ) : (
            <Skeleton width={150} />
          )}
        </div>
        <div className="flex items-center gap-2">
          {status === 1 && (
            <Image src={sword} width={16} height={16} alt="sword" />
          )}
          {status === 2 && (
            <Image src={shield} width={16} height={16} alt="shield" />
          )}
        </div>
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
          {game_contract ? (
            <CardField
              name={<div title="Game Address">Game Address</div>}
              value={
                <Link href={`/game/${game_contract}`}>
                  {shortenAddress(game_contract)}
                </Link>
              }
            />
          ) : (
            <Skeleton width={300} size="xs" />
          )}
        </div>
        {tx_hash ? (
          <div className="mt-1 flex">
            <span>
              tx hash{" "}
              <Link
                href={`https://sepolia.etherscan.io/tx/${tx_hash}`}
                isExternal
              >
                {shortenAddress(tx_hash as string)}
              </Link>
            </span>
          </div>
        ) : (
          <Skeleton width={170} size="xs" />
        )}
      </div>
    </SurfaceCardBase>
  );
};

export { GameCard };
