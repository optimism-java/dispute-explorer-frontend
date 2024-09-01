import type { FC } from "react";
import { useMemo } from "react";
import type { EChartOption } from "echarts";
import EChartsReact from "echarts-for-react";

type ChartBaseProps = {
  options: EChartOption;
  compact?: boolean;
  depth?: number;
  handleClick: (e: any) => void
};

const COMMON_OPTIONS: EChartOption = {
  grid: { top: 27, right: 10, bottom: 22, left: 45 },
  yAxis: {
    splitLine: { show: false },
  },
  tooltip: {
    trigger: "axis",
  },
};

export const ChartBase: FC<ChartBaseProps> = function ({
  options,
  compact = false,
  depth = 0,
  handleClick
}) {
  const processedSeries = useMemo(
    () =>
      options.series?.map((series) => {
        const { data } = series;
        let newData = data;

        return {
          ...series,
          data: newData,
        };
      }),
    [options]
  );

  // const len = options?.series ? options?.series[0]?.data?.length || 0 : 0;
  const height = depth * 200;

  return (
    <EChartsReact
      onEvents={
        {
          "click": handleClick
        }
      }
      option={{
        ...COMMON_OPTIONS,
        ...options,
        grid: {
          ...COMMON_OPTIONS.grid,
          ...(options.grid || {}),
        },
        tooltip: {
          ...COMMON_OPTIONS["tooltip"],
          ...(options.tooltip || {}),
        },
        xAxis: {
          ...(COMMON_OPTIONS.xAxis || {}),
          ...(options.xAxis || {}),
          ...(compact
            ? {
              axisLine: { show: false },
              axisLabel: {
                interval: 4,
              },
            }
            : {}),
        },
        yAxis: {
          ...(COMMON_OPTIONS.yAxis || {}),
          ...(options.yAxis || {}),
          axisLine: { show: !compact },
        },
        series: processedSeries,
      }}
      style={{ height: `${height}px`, width: "100%" }}
    />
  );
};
