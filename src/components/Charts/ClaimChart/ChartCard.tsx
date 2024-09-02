import type { FC, ReactNode } from "react";
import cn from "classnames";
import type { EChartOption } from "echarts";

import "react-loading-skeleton/dist/skeleton.css";
import React from "react";
import Skeleton from "react-loading-skeleton";

import { ChartSkeleton } from "@/components/ChartSkeleton";
import { ChartBase } from "./ChartBase";
import { Card } from "@/components/Cards/Card";
import { depth } from "@/utils";

type ChartCardProps = {
  title?: ReactNode;
  options: EChartOption;
  depth?: number;
  handleClick: (e: any) => void;
};

function getSeriesDataState(series: EChartOption.Series[] | undefined) {
  return {
    isLoading: series
      ? series.some(({ data }) => data === undefined || data === null)
      : true,
    isEmpty: series ? series.some(({ data }) => data?.length === 0) : false,
  };
}

export const ChartCard: FC<ChartCardProps> = function ({
  title,
  options,
  depth,
  handleClick,
}) {
  const { isEmpty, isLoading } = getSeriesDataState(options.series);

  return (
    <Card className="overflow-visible" compact>
      <div className="flex-start -mb-2 ml-2 flex font-semibold dark:text-warmGray-50">
        {title ?? <Skeleton width={150} />}
      </div>
      <div className="flex h-full flex-col gap-2">
        <div className="h-full max-h-[1000px] overflow-scroll">
          {isEmpty ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-sm font-thin uppercase text-contentSecondary-light dark:text-contentSecondary-dark">
                No data
              </div>
            </div>
          ) : isLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <ChartSkeleton itemsCount={6} />
            </div>
          ) : (
            <ChartBase
              handleClick={handleClick}
              options={options}
              depth={depth}
            />
          )}
        </div>
      </div>
    </Card>
  );
};
