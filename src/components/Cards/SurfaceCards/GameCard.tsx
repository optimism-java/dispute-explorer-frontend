import { useMemo } from "react";
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

type GameCardProps = {
  game: Game;
};

const GameCard: FC<Partial<GameCardProps>> = function ({
  game: { l2_block_number: number, block_time, game_contract, status } = {},
}) {
  return (
    <SurfaceCardBase>
      <div className="flex  justify-between gap-2 text-sm">
        <div className="flex gap-2 md:flex-row">
          {number ? (
            <div className="flex gap-1 text-contentSecondary-light dark:text-contentSecondary-dark">
              Block{" "}
              <Link
                href={`https://sepolia-optimism.etherscan.io/block/${number}`}
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
            <>
              <CardField
                name={<div title="Game Address">Game Address</div>}
                value={shortenAddress(game_contract)}
              />
            </>
          ) : (
            <Skeleton width={300} size="xs" />
          )}
        </div>
        {block_time ? (
          <div className="mt-1 flex">
            <span>4 Claims</span>
          </div>
        ) : (
          <Skeleton width={170} size="xs" />
        )}
      </div>
    </SurfaceCardBase>
  );
};

export { GameCard };
