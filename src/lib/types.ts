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
  status: string;
  created_at: number;
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
}

export interface Credit {
  address: string;
  amount: string;
}
