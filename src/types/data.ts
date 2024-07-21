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
  clock: number;
  output_block: number;
  event_id: number;
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
