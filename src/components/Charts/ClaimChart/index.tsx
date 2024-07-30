import { ChartCard } from "@/components/Cards/ChartCard";
import { ClaimData } from "@/types";
import { depth, shortenAddress } from "@/utils";
import { EChartOption } from "echarts";
import React from "react";

const xBase = 0;
const gap = 250;
const attackHeight = 400;
const defendHeight = 300;
const xGap = 250;
const yGap = 150;

const genNodesAndLinks = (data: ClaimData[]): any => {
  const nodes: any[] = [];
  const links: any[] = [];

  data?.forEach((item, i, arr) => {
    const nodeLevel = depth(item.position);
    const node: any = {
      name: item.event_id.toString(),
      claim: item.claim,
      x: nodeLevel * 1000,
      position: item.position,
      // y: nodeLevel * gap,
    };

    if (item.position === 1) {
      node.value = `${item.position}'🏁 '${shortenAddress(item.claim, 3)}`;
      node.itemStyle = {
        color: "yellow",
      };
      node.x = 0;
      node.y = 0;
    } else if (item.position % 2 == 0) {
      node.value = `${item.position}'⚔️ '${shortenAddress(item.claim, 3)}`;
      node.itemStyle = {
        color: "red",
      };
      node.y = nodeLevel * 300;
    } else {
      node.value = `${item.position}'👑 '${shortenAddress(item.claim, 3)}`;
      node.itemStyle = {
        color: "blue",
      };
      // node.y = defendHeight;
    }
    if (arr[i + 1]) {
      const link: any = {
        source: item.event_id.toString(),
        target: arr[i + 1].event_id.toString(),
      };
      if (arr[i + 1].position % 2 === 0) {
        link.lineStyle = {
          color: "red",
        };
        link.label = {
          show: true,
          formatter: "attack",
        };
      } else {
        link.lineStyle = {
          color: "blue",
        };
      }
      links.push(link);
    }

    nodes.push(node);
  });
  return {
    nodes,
    links,
  };
};

const ClaimChart = () => {
  const claimData: ClaimData[] = [
    {
      id: 1,
      game_contract: "0xc9cb084c3ad4e36b719b60649f99ea9f13bb45b7",
      data_index: 0,
      parent_index: 4294967295,
      countered_by: "0x0000000000000000000000000000000000000000",
      claimant: "0x49277EE36A024120Ee218127354c4a3591dc90A9",
      bond: 80000000000000000,
      claim: "c58adb6387728df32318772a7beefa386072b4347e39f64a753bfd82c8acdb07",
      position: 1,
      clock: 1717457280,
      output_block: 12827274,
      event_id: 1011299,
    },
    {
      id: 4,
      game_contract: "0xc9cb084c3ad4e36b719b60649f99ea9f13bb45b7",
      data_index: 1,
      parent_index: 0,
      countered_by: "0xffb026F67DA0869EB3ABB090cB7F015CE0925CdF",
      claimant: "0x06C1a398362ac75e3EeE6e3081Bdb620904713e2",
      bond: 87594000000000000,
      claim: "0226211e7ac87473f78718497788e090079941fe5a15194c09e6e31640e80e08",
      position: 2,
      clock: 1717458288,
      output_block: 12827274,
      event_id: 1011302,
    },
    {
      id: 3,
      game_contract: "0xc9cb084c3ad4e36b719b60649f99ea9f13bb45b7",
      data_index: 2,
      parent_index: 1,
      countered_by: "0x0000000000000000000000000000000000000000",
      claimant: "0xffb026F67DA0869EB3ABB090cB7F015CE0925CdF",
      bond: 95908800000000000,
      claim: "c58adb6387728df32318772a7beefa386072b4347e39f64a753bfd82c8acdb07",
      position: 4,
      clock: 1717458312,
      output_block: 12827274,
      event_id: 1011301,
    },
    {
      id: 6,
      game_contract: "0xc9cb084c3ad4e36b719b60649f99ea9f13bb45b7",
      data_index: 3,
      parent_index: 2,
      countered_by: "0xB3bf1D0Ac3187F5F088cfb7147D41B26F46B52f5",
      claimant: "0x06C1a398362ac75e3EeE6e3081Bdb620904713e2",
      bond: 105013000000000000,
      claim: "0226211e7ac87473f78718497788e090079941fe5a15194c09e6e31640e80e08",
      position: 8,
      clock: 1717458348,
      output_block: 12827274,
      event_id: 1011304,
    },
    {
      id: 5,
      game_contract: "0xc9cb084c3ad4e36b719b60649f99ea9f13bb45b7",
      data_index: 4,
      parent_index: 3,
      countered_by: "0x0000000000000000000000000000000000000000",
      claimant: "0xB3bf1D0Ac3187F5F088cfb7147D41B26F46B52f5",
      bond: 114981200000000000,
      claim: "c58adb6387728df32318772a7beefa386072b4347e39f64a753bfd82c8acdb07",
      position: 16,
      clock: 1717458360,
      output_block: 12827274,
      event_id: 1011303,
    },
  ];

  const { nodes, links } = genNodesAndLinks(claimData);
  const options: EChartOption<EChartOption.SeriesGraph> = {
    tooltip: {
      trigger: "item",
      formatter: (params: any) => {
        if (params.dataType === "node") {
          return `${params.data.claim}`;
        }
        return "";
      },
    },
    grid: {
      left: "5%",
      right: "5%",
    },
    xAxis: {
      type: "category",
      show: false,
    },
    yAxis: {
      type: "value",
      show: false,
    },
    series: [
      {
        data: nodes,
        type: "graph",
        layout: "none",
        symbolSize: 90,
        label: {
          show: true,
          formatter: (params: any) => {
            return params.data.value;
          },
        },
        edgeSymbol: ["circle", "arrow"],
        edgeSymbolSize: [4, 10],
        links,
        lineStyle: {
          color: "red",
        },
      },
    ],
  };
  return (
    <ChartCard title="Attack and defend graph" size="sm" options={options} />
  );
};

export default ClaimChart;
