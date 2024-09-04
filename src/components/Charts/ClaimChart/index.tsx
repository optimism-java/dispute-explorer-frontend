import { ChartCard } from "./ChartCard";
import { ClaimData } from "@/types";
import { depth, shortenAddress } from "@/utils";
import { EChartOption } from "echarts";
import React, { FC, useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useCalculateClaim } from "@/hooks/useCaculateClaim";
import { useReadContract, useWriteContract } from "wagmi";
import { abi } from "@/utils/abi";
import { Abi, Address, Chain, Client, Transport, formatUnits, parseUnits } from "viem";
import { useNetworkConfig } from "@/hooks/useNetworkConfig";
import { waitForTransactionReceipt } from "viem/actions";
import { useWagmiConfig } from "@/hooks/useWagmiConfig";

const xGap = 45;
const yGap = 50;
const yBase = 100;

type Node = {
  name: string;
  claim: string;
  position: string;
  value: string;
  itemStyle: {
    color: string;
  };
  x: number;
  y: number;
};

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
    name: root.id.toString(),
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
  // key: parent id, value: nums of attack nodes at this level
  const levelAttackMap = new Map<number, number>();
  // key: parent id, value: nums of defend nodes at this level
  const levelDefendMap = new Map<number, number>();

  while (queue.length) {
    const parentIndex = queue.shift()!;
    const parent = data[parentIndex];
    for (let i = 1; i < data.length; i++) {
      const current = data[i];
      if (current.parent_index !== parentIndex) {
        continue;
      }
      const parentNode = nodes.find(
        (item) => item.name === parent.id.toString()
      )!;
      queue.push(i);
      const deep = depth(BigInt(current.position));
      if (deep > maxDepth) {
        maxDepth = deep;
      }
      const node = {
        id: current.id,
        name: current.id.toString(),
        claim: current.claim,
        parentIndex: current.parent_index,
        position: current.position,
        value: `${current.position}⚔️ ${shortenAddress(current.claim, 3)}`,
        itemStyle: {
          color: "red",
        },
        x: 100,
        y: yBase + deep * yGap,
      };
      const link = {
        source: parent.id.toString(),
        target: current.id.toString(),
        lineStyle: {
          color: "red",
        },
        label: {
          show: true,
          formatter: "attack",
        },
      };
      if (!isAttack(BigInt(current.position), BigInt(parent.position))) {
        const deepCount = levelDefendMap.get(parent.id) || 1;
        node.itemStyle.color = "blue";
        link.lineStyle.color = "blue";
        link.label.formatter = "defend";
        node.x = parentNode.x + deepCount * xGap;
        levelDefendMap.set(parent.id, deepCount + 1);
      } else {
        const deepCount = levelAttackMap.get(parent.id) || 1;
        node.x = parentNode.x - deepCount * xGap;
        levelAttackMap.set(parent.id, deepCount + 1);
      }
      nodes.push(node);
      links.push(link);
    }
  }
  return {
    nodes,
    links,
    maxDepth,
  };
};

const ClaimChart: FC<{ claimData: ClaimData[], address: string }> = ({ claimData, address }) => {
  const { nodes, links, maxDepth } = genNodesAndLinks(claimData);
  const { isMutating, trigger } = useCalculateClaim();
  const options: EChartOption<EChartOption.SeriesGraph> = {
    tooltip: {
      trigger: "item",
      triggerOn: "click",
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
        top: "40",
        bottom: "40",
        left: "40",
        right: "auto",
        force: {
          // 设置link长度
          edgeLength: 100, // 固定长度
          repulsion: 50,
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
        // lineStyle: {
        //   color: "red",
        // },
      },
    ],
  };
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<Node>();
  const [val, setVal] = useState("");
  const [recommendAttackClaim, setAttackClaim] = useState("")
  const [recommendDefendClaim, setDefendClaim] = useState("")
  const config = useWagmiConfig()

  const attackPosition = useMemo(() => {
    if (modalData) {
      return 2 * Number(modalData.position)
    }
  }, [modalData])
  const defendPosition = useMemo(() => {
    if (modalData) {
      return 2 * (Number(modalData.position) + 1)
    }
  }, [modalData])
  const { writeContractAsync } = useWriteContract();
  const { data: index } = useReadContract({
    abi: abi as Abi,
    address: address as Address,
    functionName: 'claimDataLen'
  })
  const { data: attackGas } = useReadContract({
    abi: abi as Abi,
    address: address as Address,
    functionName: 'getRequiredBond',
    args: [attackPosition]
  })
  const { data: defendGas } = useReadContract({
    abi: abi as Abi,
    address: address as Address,
    functionName: 'getRequiredBond',
    args: [defendPosition]
  })
  const handleClick = (e: any) => {
    setShowModal(true);
    setModalData(e.data);
  };

  useEffect(() => {
    if (attackPosition) {
      trigger({ disputeGame: address, position: attackPosition }).then((res) => {
        setAttackClaim(res.claims)
      })
    }
  }, [attackPosition])
  useEffect(() => {
    if (defendPosition) {
      trigger({ disputeGame: address, position: defendPosition }).then((res) => {
        setDefendClaim(res.claims)
      })

    }
  }, [defendPosition])

  const handleAttack = async () => {
    if (!val) return;
    if (!index) return;
    if (!attackGas) return;
    const hash = await writeContractAsync({
      abi: abi as Abi,
      address: address as Address,
      functionName: 'attack',
      args: ['0x' + modalData?.claim, Number(index) - 1, val],
      value: parseUnits(formatUnits(attackGas as bigint, 18), 18)
    })
    const res = await waitForTransactionReceipt(config as any, { hash })
    console.log(res, 'res-defend')
  };

  const handleDefend = async () => {
    if (!val) return;
    if (!index) return;
    if (!attackGas) return;
    console.log(['0x' + modalData?.claim, Number(index) - 1, val])
    const hash = await writeContractAsync({
      abi: abi as Abi,
      address: address as Address,
      functionName: 'defend',
      args: ['0x' + modalData?.claim, Number(index) - 1, val],
      value: parseUnits(formatUnits(defendGas as bigint, 18), 18)
    })
    console.log(hash, 'hash')

  }

  return (
    <>
      <Dialog
        open={showModal}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setShowModal(false)}
      >
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
              <div className="mt-4 text-sm/6 text-white/50">
                <div>
                  <div className="text-sm font-semibold text-contentSecondary-light dark:text-warmGray-300 mb-1">
                    Claim:
                  </div>
                  <div className="text-sm text-contentSecondary-light dark:text-warmGray-300 mb-2 break-all">
                    {'0x' + modalData?.claim}
                  </div>
                </div>  <div>
                  <div className="text-sm font-semibold text-contentSecondary-light dark:text-warmGray-300 mb-1">
                    Recommend Attack Claim:
                  </div>
                  <div className="text-sm text-contentSecondary-light dark:text-warmGray-300 mb-2 break-all">
                    {recommendAttackClaim}
                  </div>
                </div>  <div>
                  <div className="text-sm font-semibold text-contentSecondary-light dark:text-warmGray-300 mb-1">
                    Recommend Defend Claim:
                  </div>
                  <div className="text-sm text-contentSecondary-light dark:text-warmGray-300 mb-2 break-all">
                    {recommendDefendClaim}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-contentSecondary-light dark:text-warmGray-300 mb-1">
                    challenge claim
                  </div>
                  <Input
                    type="text"
                    name="search"
                    id="search"
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    className={"rounded-none rounded-l-md text-black"}
                    placeholder={"challenge string"}
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-4">
                <Button
                  label="defend"
                  variant="outline"
                  onClick={handleDefend}
                ></Button>
                <Button
                  label="attack"
                  variant="outline"
                  onClick={handleAttack}
                ></Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <ChartCard
        title={
          <div className="flex items-center gap-10">
            <div>Fault Dispute Game Graph</div>
            <ConnectButton showBalance={false} />
          </div>
        }
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
