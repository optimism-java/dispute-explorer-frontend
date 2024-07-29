// import { useClaimData } from "@/hooks/useClaimData";
import { ClaimData } from "@/types";
import { depth, shortenAddress } from "@/utils";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
// import GraphViz from "graphviz-react";
import ClaimChart from "@/components/Charts/ClaimChart";

const GameDetail = () => {
  const router = useRouter();
  const address = (router.query.game as string | undefined) ?? "";

  // const { data } = useClaimData(address);
  // if (!data) {
  //   return <>no data</>;
  // }

  const claimData: ClaimData[] = useMemo(
    () => [
      {
        id: 1,
        game_contract: "0xc9cb084c3ad4e36b719b60649f99ea9f13bb45b7",
        data_index: 0,
        parent_index: 4294967295,
        countered_by: "0x0000000000000000000000000000000000000000",
        claimant: "0x49277EE36A024120Ee218127354c4a3591dc90A9",
        bond: 80000000000000000,
        claim:
          "c58adb6387728df32318772a7beefa386072b4347e39f64a753bfd82c8acdb07",
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
        claim:
          "0226211e7ac87473f78718497788e090079941fe5a15194c09e6e31640e80e08",
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
        claim:
          "c58adb6387728df32318772a7beefa386072b4347e39f64a753bfd82c8acdb07",
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
        claim:
          "0226211e7ac87473f78718497788e090079941fe5a15194c09e6e31640e80e08",
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
        claim:
          "c58adb6387728df32318772a7beefa386072b4347e39f64a753bfd82c8acdb07",
        position: 16,
        clock: 1717458360,
        output_block: 12827274,
        event_id: 1011303,
      },
    ],
    []
  );

  const g = useMemo(() => {
    const claims = claimData;
    const claimMap = new Map<number, ClaimData>();
    const linkMap = new Map<number, number[]>();
    let maxDepth = 1;

    claims.forEach((claim) => {
      claimMap.set(claim.position, claim);
      const curDepth = depth(claim.position);
      if (curDepth > maxDepth) {
        maxDepth = curDepth;
      }
    });
    claims.forEach((claim) => {
      const postion = claim.position;
      if (postion === 1) {
        const attackPos = postion * 2;
        if (claimMap.has(attackPos)) {
          if (!linkMap.has(postion)) {
            linkMap.set(postion, []);
          }
          linkMap.get(postion)?.push(attackPos);
        }
        return;
      }
      const attackPos = postion * 2;
      if (claimMap.has(attackPos)) {
        if (!linkMap.has(postion)) {
          linkMap.set(postion, []);
        }
        linkMap.get(postion)?.push(attackPos);
      }
      const defendPos = postion * 2 + 2;
      if (claimMap.has(defendPos)) {
        if (!linkMap.has(postion)) {
          linkMap.set(postion, []);
        }
        linkMap.get(postion)?.push(defendPos);
      }
    });
    const maxIndex = 2 ** (maxDepth + 1);
    console.log(maxIndex);
    let nodes = "";
    let links = "";
    for (let i = 1; i <= maxIndex; i++) {
      if (claimMap.has(i)) {
        const claim = claimMap.get(i);
        nodes += `${i}[label="${i}🏁${shortenAddress(
          claim?.claim as string
        )}"][color="#667174"][fontcolor="#667174"]\n`;
      } else {
        nodes += `${i}[label=${i}][style=invis]\n`;
      }
      if (linkMap.has(i)) {
        const nums = linkMap.get(i);
        nums?.forEach((item) => {
          if (item === i * 2) {
            links += `${i}->${item}[constraint=true][color="#EA6962"][fontcolor="#EA6962"][label=Attack]\n`;
          } else if (item === i * 2 + 2) {
            links += `${i}->${item}[constraint=true][color="#EA6962"][fontcolor="#EA6962"][label=Defend]\n`;
          }
          // links += `${i}->${2 * i + 1}[style=invis]\n`;
          if (2 * i + 1 <= maxIndex) {
            links += `${i}->${2 * i + 1}[style=invis]\n`;
          }
        });
      } else {
        if (2 * i < maxIndex) {
          links += `${i}->${2 * i}[style=invis]\n`;
          links += `${i}->${2 * i + 1}[style=invis]\n`;
        }
      }
    }
    return `
      digraph {
        ${nodes}
        ${links}
      }
    `;
  }, [claimData]);

  if (!address) {
    return <></>;
  }

  return (
    <div className="min-h-screen">
      {/* <GraphViz
        dot={g}
        options={{
          width: "100%",
          height: "100%",
          backgroundColor: "red",
          minHeight: "200px",
        }}
      /> */}
      <ClaimChart />
    </div>
  );
};

export default GameDetail;
