import React from "react";

import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

import { capitalize } from "@/utils";

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
  const explorerDetailsItems: ExplorerDetailsItemProps[] = [
    { name: "Network", value: capitalize("sepolia") },
  ];

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
