export interface Response<T> {
  currrentPage: number;
  pageSize: number;
  records?: T[];
  totalCounts: number;
  totalPage: number;
  data?: T[];
  [propname: string]: any;
}

export interface Pager {
  page: number;
  size: number;
}

export interface Game {
  id: number;
  game_type: number;
  game_contract: string;
  l_2_block_number: number;
  status: number;
  created_at: string;
}

export interface ClaimData {
  id: number;
  game_contract: string;
  data_index: number;
  parent_index: number;
  countered_by: string;
  claimant: string;
  bond: number;
  claim: string;
  position: number;
  clock: BigInt;
}

export interface Credit {
  address: string;
  amount: string;
}

export interface CreditDetail {
  address: string;
  credit: string;
  game_contract: string;
  id: number;
  created_at: string;
  updated_at: string;
}
