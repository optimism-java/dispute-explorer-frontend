import { ChartCard } from "./ChartCard";
import { ClaimData } from "@/types";
import { depth, shortenAddress } from "@/utils";
import { EChartOption } from "echarts";
import React, { FC } from "react";

const xGap = 100;
const yGap = 100;
const yBase = 100;

const isAttack = (cur: number, parent: number): boolean => {
  if (parent * 2 === cur) {
    return true;
  }
  return false;
};

const genNodesAndLinks = (data: ClaimData[]): any => {
  const nodes: any[] = [];
  const links: any[] = [];

  // key: tree deep, value: nums of nodes at this level
  const levelMap = new Map<number, number>();

  const root = data[0];
  nodes.push({
    name: root.event_id.toString(),
    claim: root.claim,
    position: root.position,
    value: `${root.position}🏁 ${shortenAddress(root.claim, 3)}`,
    itemStyle: {
      color: "yellow",
    },
    x: 0,
    y: yBase,
  });

  for (let i = 1; i < data.length; i++) {
    const current = data[i];
    const parent = data[current.parent_index];
    const deep = depth(current.position);
    const deepCount = levelMap.get(deep) || 0;
    const node = {
      name: current.event_id.toString(),
      claim: current.claim,
      position: current.position,
      value: `${current.position}⚔️ ${shortenAddress(current.claim, 3)}`,
      itemStyle: {
        color: "red",
      },
      x: (-deep + deepCount) * xGap,
      y: yBase + deep * yGap,
    };
    const link = {
      source: parent.event_id.toString(),
      target: current.event_id.toString(),
      lineStyle: {
        color: "red",
      },
      label: {
        show: true,
        formatter: "attack",
      },
    };
    if (!isAttack(current.position, parent.position)) {
      node.itemStyle.color = "blue";
      link.lineStyle.color = "blue";
      link.label.formatter = "defend";
    }
    nodes.push(node);
    links.push(link);
    levelMap.set(deep, deepCount + 1);
  }
  console.log(nodes);
  return {
    nodes,
    links,
  };
};

const ClaimChart: FC<{ claimData: ClaimData[] }> = ({ claimData }) => {
  // const claimData = [
  //   {
  //     id: 7585,
  //     created_at: "2024-08-23T02:29:11Z",
  //     updated_at: "2024-08-23T02:29:11Z",
  //     game_contract: "0x2ed2a8c32bbe31e55dd03f31c85bd45138a1181f",
  //     data_index: 0,
  //     parent_index: 4294967295,
  //     countered_by: "0x0000000000000000000000000000000000000000",
  //     claimant: "0x49277EE36A024120Ee218127354c4a3591dc90A9",
  //     bond: 80000000000000000,
  //     claim: "bef852721eceb6b7da05920bf3c7ce8291cb1d673e93409e79da26106fff3a5a",
  //     position: 1,
  //     clock: 1724379108,
  //     output_block: 16288209,
  //     event_id: 14781,
  //   },
  //   {
  //     id: 7588,
  //     created_at: "2024-08-23T03:07:27Z",
  //     updated_at: "2024-08-23T03:07:27Z",
  //     game_contract: "0x2ed2a8c32bbe31e55dd03f31c85bd45138a1181f",
  //     data_index: 1,
  //     parent_index: 0,
  //     countered_by: "0x0000000000000000000000000000000000000000",
  //     claimant: "0x756A6aa43547fA8cCF02ab417E6c4c4747137346",
  //     bond: 87594000000000000,
  //     claim: "bef852721eceb6b7da05920bf3c7ce8291cb1d673e93409e79da26106fff3a5b",
  //     position: 2,
  //     clock: 1724381664,
  //     output_block: 16288209,
  //     event_id: 14787,
  //   },
  //   {
  //     id: 7589,
  //     created_at: "2024-08-23T03:13:45Z",
  //     updated_at: "2024-08-23T03:13:45Z",
  //     game_contract: "0x2ed2a8c32bbe31e55dd03f31c85bd45138a1181f",
  //     data_index: 2,
  //     parent_index: 1,
  //     countered_by: "0x0000000000000000000000000000000000000000",
  //     claimant: "0xffb026F67DA0869EB3ABB090cB7F015CE0925CdF",
  //     bond: 95908800000000000,
  //     claim: "bef852721eceb6b7da05920bf3c7ce8291cb1d673e93409e79da26106fff3a5a",
  //     position: 4,
  //     clock: 1724381676,
  //     output_block: 16288209,
  //     event_id: 14788,
  //   },
  //   {
  //     id: 7603,
  //     created_at: "2024-08-23T06:25:52Z",
  //     updated_at: "2024-08-23T06:25:52Z",
  //     game_contract: "0x2ed2a8c32bbe31e55dd03f31c85bd45138a1181f",
  //     data_index: 1,
  //     parent_index: 0,
  //     countered_by: "0x0000000000000000000000000000000000000000",
  //     claimant: "0x756A6aa43547fA8cCF02ab417E6c4c4747137346",
  //     bond: 87594000000000000,
  //     claim: "bef852721eceb6b7da05920bf3c7ce8291cb1d673e93409e79da26106fff3a5b",
  //     position: 2,
  //     clock: 1724381664,
  //     output_block: 16288209,
  //     event_id: 14815,
  //   },
  //   {
  //     id: 7604,
  //     created_at: "2024-08-23T06:25:52Z",
  //     updated_at: "2024-08-23T06:25:52Z",
  //     game_contract: "0x2ed2a8c32bbe31e55dd03f31c85bd45138a1181f",
  //     data_index: 4,
  //     parent_index: 3,
  //     countered_by: "0x0000000000000000000000000000000000000000",
  //     claimant: "0xffb026F67DA0869EB3ABB090cB7F015CE0925CdF",
  //     bond: 95908800000000000,
  //     claim: "bef852721eceb6b7da05920bf3c7ce8291cb1d673e93409e79da26106fff3a5a",
  //     position: 4,
  //     clock: 1724393436,
  //     output_block: 16288209,
  //     event_id: 14816,
  //   },
  //   {
  //     id: 7605,
  //     created_at: "2024-08-23T06:32:24Z",
  //     updated_at: "2024-08-23T06:32:24Z",
  //     game_contract: "0x2ed2a8c32bbe31e55dd03f31c85bd45138a1181f",
  //     data_index: 1,
  //     parent_index: 0,
  //     countered_by: "0x0000000000000000000000000000000000000000",
  //     claimant: "0x756A6aa43547fA8cCF02ab417E6c4c4747137346",
  //     bond: 87594000000000000,
  //     claim: "bef852721eceb6b7da05920bf3c7ce8291cb1d673e93409e79da26106fff3a5b",
  //     position: 2,
  //     clock: 1724381664,
  //     output_block: 16288209,
  //     event_id: 14817,
  //   },
  //   {
  //     id: 7606,
  //     created_at: "2024-08-23T06:32:25Z",
  //     updated_at: "2024-08-23T06:32:25Z",
  //     game_contract: "0x2ed2a8c32bbe31e55dd03f31c85bd45138a1181f",
  //     data_index: 6,
  //     parent_index: 5,
  //     countered_by: "0x0000000000000000000000000000000000000000",
  //     claimant: "0xffb026F67DA0869EB3ABB090cB7F015CE0925CdF",
  //     bond: 95908800000000000,
  //     claim: "bef852721eceb6b7da05920bf3c7ce8291cb1d673e93409e79da26106fff3a5a",
  //     position: 4,
  //     clock: 1724393700,
  //     output_block: 16288209,
  //     event_id: 14818,
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
  return <ChartCard title="Fault Dispute Game Graph" options={options} />;
};

export default ClaimChart;
