import React, { useMemo } from "react";

import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

import { capitalize } from "@/utils";
import { useSnapshot } from "valtio";
import { store } from "@/store/globalStore";

type ExplorerDetailsItemProps = {
  name: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
};

function ExplorerDetailsItem({
  name,
  value,
  icon = null,
}: ExplorerDetailsItemProps) {
  return (
    <div className="flex items-center gap-1">
      {icon}
      <span>{name}:</span>
      {value !== undefined ? (
        <span className="font-semibold">{value}</span>
      ) : (
        <Skeleton width={50} />
      )}
    </div>
  );
}

export function ExplorerDetails() {

  const { network } = useSnapshot(store)
  const explorerDetailsItems: ExplorerDetailsItemProps[] = useMemo(() => {
    return [
      { name: "Network", value: capitalize(network) },
    ]
  }, [network]);

  return (
    <div className="sm:fle flex w-full flex-wrap items-center justify-center gap-2 align-middle text-xs text-contentSecondary-light dark:text-contentSecondary-dark sm:h-4 sm:justify-start">
      {explorerDetailsItems.map(({ name, value, icon }, i) => {
        return (
          <div key={name} className="flex items-center gap-2">
            <ExplorerDetailsItem name={name} value={value} icon={icon} />
            {i < explorerDetailsItems.length - 1 ? "･" : ""}
          </div>
        );
      })}
    </div>
  );
}
