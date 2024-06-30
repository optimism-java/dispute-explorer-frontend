import { ClaimData } from '../lib/types';

export interface GameData {
  claims: Claim[];
  numClaims: number;
  createdAt: number;
  rootClaim: string;
  absolutePrestate: string;
  l2BlockNumber: number;
  status: number;
  winner: Winner;
}

export interface Claim {
  parentIndex: number;
  countered: boolean;
  claim: string;
  position: BigInt;
  clock: BigInt;
}

export interface Winner {
  index: number;
  opposesRoot: boolean;
}

export const transform = (data: ClaimData[]): GameData => {
  const res = {} as GameData;
  res.claims = data.map((item: any) => {
    return {
      parentIndex: item.parent_index,
      claim: item.claim,
      position: item.position,
      clock: item.clock,
      countered: false,
    } as Claim;
  });
  res.numClaims = data?.length;
  res.winner = resolveGame(res.claims, 4);
  return res;
};

const resolveGame = (
  claims: Claim[],
  maxDepth: number,
  upTo?: number
): Winner => {
  if (!upTo) {
    upTo = claims.length;
  }

  // iterate claims in reverse order
  // mark their parents as disputed (reuse the countered bit for this purpose)
  // ... unless the current claim is disputed
  let subgames: Claim[] = claims.map((c) => {
    let disputed = false;
    if (depth(Number(c.position)) == maxDepth) {
      disputed = c.countered;
    }
    return {
      parentIndex: c.parentIndex,
      countered: c.countered,
      claim: c.claim,
      position: c.position,
      clock: c.clock,
    };
  });

  for (let i = upTo - 1; i >= 0; i--) {
    const subgame = subgames[i];
    const parentSubgame = subgames[subgame.parentIndex];
    if (!subgame.countered && parentSubgame != undefined) {
      parentSubgame.countered = false;
    }
  }
  return {
    index: upTo - 1,
    opposesRoot: false,
  };
};

type Position = number;

export const depth = (position: Position): number => {
  return 31 - Math.clz32(position);
};

export const traceIndex = (position: Position, maxDepth: number): number => {
  return indexAtDepth(rightIndex(position, maxDepth));
};

const indexAtDepth = (position: Position): number => {
  return position - (1 << depth(position));
};

const rightIndex = (position: Position, maxDepth: number): number => {
  let remaining = maxDepth - depth(position);
  return (position << remaining) | ((1 << remaining) - 1);
};
