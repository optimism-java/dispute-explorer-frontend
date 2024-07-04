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
  sync_block_id: BigInt;
  blockchain: string;
  block_time: number;
  block_hash: string;
  block_log_indexed: number;
  tx_index: number;
  tx_hash: string;
  contract_address: string;
  game_type: number;
  game_contract: string;
  l2_block_number: number;
  status: number;
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
  credit: BigInt;
  game_contract: string;
  id: number;
}

export interface SearchParams {
  q?: string;
  offset?: number;
  limit?: number;
  filter?: string[];
  sort?: string[];
}

export interface IndexResponse<T> {
  indexUid?: string;
  estimatedTotalHits: number;
  hits: T[];
  limit: number;
  offset: number;
  processingTimeMs: number;
  query: string;
}

export interface TwoIndexResponse<T, U> {
  results: [IndexResponse<T>, IndexResponse<U>];
}

export interface Overview {
  disputeGameProxy: string;
  totalCredit: string;
  totalGames: number;
}
