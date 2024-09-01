import { ChartCard } from "./ChartCard";
import { ClaimData } from "@/types";
import { depth, shortenAddress } from "@/utils";
import { EChartOption } from "echarts";
import React, { FC, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

const xGap = 100;
const yGap = 100;
const yBase = 100;

type Node = {
  name: string,
  claim: string,
  position: string,
  value: string,
  itemStyle: {
    color: string,
  },
  x: number,
  y: number,
}

const isAttack = (cur: bigint, parent: bigint): boolean => {
  if (parent * BigInt(2) === cur) {
    return true;
  }
  return false;
};

const genNodesAndLinks = (data: ClaimData[]): any => {
  const nodes: Node[] = [];
  const links: any[] = [];

  let maxDepth = 1;

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

  const queue: number[] = [0];
  // key: tree deep, value: nums of nodes at this level
  const levelMap = new Map<number, number>();

  while (queue.length) {
    const parentIndex = queue.shift()!;
    const parent = data[parentIndex];
    for (let i = 1; i < data.length; i++) {
      const current = data[i];
      if (current.parent_index !== parentIndex) {
        continue;
      }
      queue.push(i);
      const deep = depth(BigInt(current.position));
      if (deep > maxDepth) {
        maxDepth = deep;
      }
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
      if (!isAttack(BigInt(current.position), BigInt(parent.position))) {
        node.itemStyle.color = "blue";
        link.lineStyle.color = "blue";
        link.label.formatter = "defend";
      }
      nodes.push(node);
      links.push(link);
      levelMap.set(deep, deepCount + 1);
    }
  }
  return {
    nodes,
    links,
    maxDepth,
  };
};

const ClaimChart: FC<{ claimData: ClaimData[] }> = ({ claimData }) => {
  const { nodes, links, maxDepth } = genNodesAndLinks(claimData);
  const options: EChartOption<EChartOption.SeriesGraph> = {
    tooltip: {
      trigger: "item",
      triggerOn: 'click',
      formatter: (params: any) => {
        // if (params.dataType === "node") {
        //   return `${params.data.claim}`;
        // }
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
        symbolSize: 80,
        // top: "20%",
        // bottom: "20%",
        force: {
          // 设置link长度
          edgeLength: 100, // 固定长度
          // repulsion: 300,
        },
        label: {
          show: true,
          formatter: (params: any) => {
            return params.data.value
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
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState<Node>()
  const [val, setVal] = useState('')
  const handleClick = (e: any) => {
    setShowModal(true)
    setModalData(e.data)
    console.log(e.data, 'e')
  }
  return (
    <>
      <Dialog open={showModal} as="div" className="relative z-10 focus:outline-none" onClose={() => setShowModal(false)}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl dark:bg-surface-dark bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium">
                Challenge
              </DialogTitle>
              <p className="mt-4 text-sm/6 text-white/50">
                <div>
                  <div className="text-sm font-semibold text-contentSecondary-light dark:text-warmGray-300 mb-1">Claim</div>
                  <div className="text-sm text-contentSecondary-light dark:text-warmGray-300 mb-2 break-all">{modalData?.claim}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-contentSecondary-light dark:text-warmGray-300 mb-1">challenge claim</div>
                  <Input
                    type="text"
                    name="search"
                    id="search"
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    className={"rounded-none rounded-l-md"}
                    placeholder={'challenge string'}
                  />
                </div>
              </p>
              <div className="mt-4 flex justify-end gap-4">
                <Button
                  label='defend'
                  variant="outline"
                  onClick={() => setShowModal(false)}
                >
                </Button> <Button
                  label='attack'
                  variant="outline"
                  onClick={() => setShowModal(false)}
                >
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <ChartCard
        title={<div className="flex items-center gap-10">
          <div>Fault Dispute Game Graph</div>
          <ConnectButton showBalance={false} />
        </div>}
        handleClick={handleClick}
        options={options}
        depth={maxDepth}
      />
    </>

  );
};

const genTreeData = (data: ClaimData[]): any => {
  const root = data[0];
  const rootNode = {
    index: 0,
    name: root.event_id.toString(),
    claim: root.claim,
    position: root.position,
    value: `${root.position}👑 ${shortenAddress(root.claim, 2)}`,
    itemStyle: {
      color: "yellow",
    },
    children: [] as any[],
  };
  const queue = [rootNode] as any[];
  while (queue.length) {
    const parent = queue.shift()!;
    const parentIndex = parent!.index;
    for (let i = 1; i < data.length; i++) {
      const current = data[i];
      if (current.parent_index === parentIndex) {
        const node = {
          index: i,
          name: current.event_id.toString(),
          claim: current.claim,
          position: current.position,
          value: `${current.position}⚔️ ${shortenAddress(current.claim, 2)}`,
          itemStyle: {
            color: "red",
          },
          lineStyle: {
            color: "red",
          },
          children: [],
        };
        if (!isAttack(BigInt(current.position), BigInt(parent.position))) {
          node.itemStyle.color = "blue";
          node.lineStyle.color = "blue";
          node.value = `${current.position}🏁 ${shortenAddress(
            current.claim,
            2
          )}`;
        }
        parent!.children.push(node);
        queue.push(node);
      }
    }
  }
  return rootNode;
};

export default ClaimChart;
