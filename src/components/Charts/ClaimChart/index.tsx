import { ChartCard } from "./ChartCard";
import { ClaimData } from "@/types";
import { depth, shortenAddress } from "@/utils";
import { EChartOption } from "echarts";
import React, { FC } from "react";


const xGap = 100;
const yGap = 100;
const yBase = 100;

const genNodesAndLinks = (data: ClaimData[]): any => {
  const nodes: any[] = [];
  const links: any[] = [];

  const claimMap = new Map<number, ClaimData>();
  data.forEach(item => {
    claimMap.set(item.position, item);
  })
  const stack: number[] = [1]
  // 增加第一个节点
  const item = claimMap.get(1) as ClaimData
  nodes.push({
    name: item.event_id.toString(),
    claim: item.claim,
    position: item.position,
    value: `${item.position}🏁 ${shortenAddress(item.claim, 3)}`,
    itemStyle: {
      color: "yellow",
    },
    x: 0,
    y: yBase
  })
  while (stack.length) {
    const index = stack.shift() as number;
    const prevItem = claimMap.get(index) as ClaimData;
    // when index is 1, it has only attack node
    if (claimMap.has(index*2)) {
      stack.push(index * 2)
      const item = claimMap.get(index*2) as ClaimData;
      const nodeLevel = depth(item.position);
      nodes.push({
        name: item.event_id.toString(),
        claim: item.claim,
        position: item.position,
        value: `${item.position}⚔️ ${shortenAddress(item.claim, 3)}`,
        itemStyle: {
          color: "red",
        },
        x: -nodeLevel * xGap,
        y: yBase + nodeLevel * yGap
      })
      links.push({
        source: prevItem.event_id.toString(),
        target: item.event_id.toString(),
        lineStyle: {
          color: "red",
        },
        label: {
          show: true,
          formatter: "attack",
        }
      })
    } 
    if(index !== 1 && claimMap.has(index *2 + 2)) {
      stack.push(index*2 + 2)
      const item = claimMap.get(index *2 + 2) as ClaimData;
      const nodeLevel = depth(item.position);
      nodes.push({
        name: item.event_id.toString(),
        claim: item.claim,
        position: item.position,
        value: `${item.position}👑 ${shortenAddress(item.claim, 3)}`,
        itemStyle: {
          color: "blue",
        },
        x: -nodeLevel * xGap + 2 * xGap,
        y: yBase + nodeLevel * yGap
      })
      links.push({
        source: prevItem.event_id.toString(),
        target: item.event_id.toString(),
        lineStyle: {
          color: "blue",
        },
        label: {
          show: true,
          formatter: "defend",
        }
      })
    }
    
  }

  return {
    nodes,
    links,
  };
};

const ClaimChart: FC<{claimData: ClaimData[]}> = ({ claimData }) => {
  // const claimData: ClaimData[] = [
  //   {
  //     id: 1,
  //     game_contract: "0xc9cb084c3ad4e36b719b60649f99ea9f13bb45b7",
  //     data_index: 0,
  //     parent_index: 4294967295,
  //     countered_by: "0x0000000000000000000000000000000000000000",
  //     claimant: "0x49277EE36A024120Ee218127354c4a3591dc90A9",
  //     bond: 80000000000000000,
  //     claim: "c58adb6387728df32318772a7beefa386072b4347e39f64a753bfd82c8acdb07",
  //     position: 1,
  //     clock: 1717457280,
  //     output_block: 12827274,
  //     event_id: 1011299,
  //   },
  //   {
  //     id: 4,
  //     game_contract: "0xc9cb084c3ad4e36b719b60649f99ea9f13bb45b7",
  //     data_index: 1,
  //     parent_index: 0,
  //     countered_by: "0xffb026F67DA0869EB3ABB090cB7F015CE0925CdF",
  //     claimant: "0x06C1a398362ac75e3EeE6e3081Bdb620904713e2",
  //     bond: 87594000000000000,
  //     claim: "0226211e7ac87473f78718497788e090079941fe5a15194c09e6e31640e80e08",
  //     position: 2,
  //     clock: 1717458288,
  //     output_block: 12827274,
  //     event_id: 1011302,
  //   },
  //   {
  //     id: 3,
  //     game_contract: "0xc9cb084c3ad4e36b719b60649f99ea9f13bb45b7",
  //     data_index: 2,
  //     parent_index: 1,
  //     countered_by: "0x0000000000000000000000000000000000000000",
  //     claimant: "0xffb026F67DA0869EB3ABB090cB7F015CE0925CdF",
  //     bond: 95908800000000000,
  //     claim: "c58adb6387728df32318772a7beefa386072b4347e39f64a753bfd82c8acdb07",
  //     position: 4,
  //     clock: 1717458312,
  //     output_block: 12827274,
  //     event_id: 1011301,
  //   },
  //   {
  //     id: 6,
  //     game_contract: "0xc9cb084c3ad4e36b719b60649f99ea9f13bb45b7",
  //     data_index: 3,
  //     parent_index: 2,
  //     countered_by: "0xB3bf1D0Ac3187F5F088cfb7147D41B26F46B52f5",
  //     claimant: "0x06C1a398362ac75e3EeE6e3081Bdb620904713e2",
  //     bond: 105013000000000000,
  //     claim: "0226211e7ac87473f78718497788e090079941fe5a15194c09e6e31640e80e08",
  //     position: 8,
  //     clock: 1717458348,
  //     output_block: 12827274,
  //     event_id: 1011304,
  //   },
  //   {
  //     id: 3,
  //     game_contract: "0xc9cb084c3ad4e36b719b60649f99ea9f13bb45b7",
  //     data_index: 2,
  //     parent_index: 1,
  //     countered_by: "0x0000000000000000000000000000000000000000",
  //     claimant: "0xffb026F67DA0869EB3ABB090cB7F015CE0925CdF",
  //     bond: 95908800000000000,
  //     claim: "c58adb6387728df32318772a7beefa386072b4347e39f64a753bfd82c8acdb07",
  //     position: 10,
  //     clock: 1717458312,
  //     output_block: 12827274,
  //     event_id: 1011399,
  //   },
  //   {
  //     id: 5,
  //     game_contract: "0xc9cb084c3ad4e36b719b60649f99ea9f13bb45b7",
  //     data_index: 4,
  //     parent_index: 3,
  //     countered_by: "0x0000000000000000000000000000000000000000",
  //     claimant: "0xB3bf1D0Ac3187F5F088cfb7147D41B26F46B52f5",
  //     bond: 114981200000000000,
  //     claim: "c58adb6387728df32318772a7beefa386072b4347e39f64a753bfd82c8acdb07",
  //     position: 16,
  //     clock: 1717458360,
  //     output_block: 12827274,
  //     event_id: 1011303,
  //   },
  // ];

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
        force: {
          // 设置link长度
          edgeLength: 100, // 固定长度
          // repulsion: 300,
        },
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
    <ChartCard title="Attack and defend graph" options={options} />
  );
};

export default ClaimChart;
