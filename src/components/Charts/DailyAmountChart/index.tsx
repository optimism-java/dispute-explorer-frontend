import { ChartCard } from "@/components/Cards/ChartCard";
import { formatNumber, formatWei } from "@/utils";
import { buildTimeSeriesOptions } from "@/utils/charts";
import type { EChartOption } from "echarts";
import { FC } from "react";

export type DailyAmountChartProps = {
  days: string[];
  data: string[] | undefined;
  compact: boolean;
  opts?: EChartOption<EChartOption.SeriesBar | EChartOption.SeriesLine>;
};

const DailyAmountChart: FC<Partial<DailyAmountChartProps>> = ({
  days,
  data,
  compact = false,
  opts = {},
}) => {
  const options: EChartOption<
    EChartOption.SeriesBar | EChartOption.SeriesLine
  > = {
    ...buildTimeSeriesOptions({
      dates: days,
      axisFormatters: {
        yAxisTooltip: (value) => formatWei(value),
        yAxisLabel: (value) => formatWei(value, { toUnit: "ether" }),
      },
      yUnit: "ethereum",
    }),
    series: [
      {
        name: "Total Credits",
        data: data,
        type: compact ? "line" : "bar",
        smooth: true,
      },
    ],
    ...opts,
  };
  return <ChartCard title="Daily Credits" size="sm" options={options} />;
};

export default DailyAmountChart;
