import type { FC } from "react";

import { Skeleton } from "@/components/Skeleton";
import { Link } from "../../Link";
import { CardField } from "../Card";
import { SurfaceCardBase } from "./SurfaceCardBase";
import { Credit } from "@/types";
import { shortenAddress } from "@/utils";
import { EtherUnitDisplay } from "@/components/Displays/EtherUnitDisplay";
import { EXPLORER_L2 } from "@/utils/env";

type CreditCardProps = {
  credit: Credit;
  index: number;
};

const CreditCard: FC<Partial<CreditCardProps>> = function ({
  credit: { address, amount } = {},
  index,
}) {
  return (
    <SurfaceCardBase>
      <div className="flex  justify-between gap-2 text-sm">
        <div className="flex gap-2 md:flex-row">
          {address ? (
            <div className="flex gap-1 text-contentSecondary-light dark:text-contentSecondary-dark">
              Address{" "}
              <Link
                href={`${EXPLORER_L2}/address/${address}`}
                isExternal
              >
                {shortenAddress(address)}
              </Link>
            </div>
          ) : (
            <Skeleton width={150} />
          )}
        </div>
        <div className="flex items-center gap-2">{(index as number) + 1}</div>
      </div>
      {address ? (
        <div className="text-xs italic text-contentSecondary-light dark:text-contentSecondary-dark invisible">
          placeholder
        </div>
      ) : (
        <Skeleton width={110} size="xs" />
      )}
      <div className="mt-1.5 flex flex-col gap-1 text-xs">
        <div className="flex w-full gap-1">
          {amount ? (
            <CardField
              name={<div title="Blob Gas Price">Credits</div>}
              value={
                <EtherUnitDisplay amount={BigInt(amount)} toUnit={"ether"} />
              }
            />
          ) : (
            <Skeleton width={170} size="xs" />
          )}
        </div>
        {amount ? (
          <div className="mt-1 flex invisible">
            <span>placeholder</span>
          </div>
        ) : (
          <Skeleton width={170} size="xs" />
        )}
      </div>
    </SurfaceCardBase>
  );
};

export { CreditCard };
