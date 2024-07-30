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

export interface Overview {
  disputeGameProxy: string;
  totalCredit: string;
  totalGames: number;
  challengerWinGamesCount: number;
  defenderWinWinGamesCount: number;
  inProgressGamesCount: number;
}

export interface Amountperday {
  amount: string;
  date: string;
}

export interface BoundProgress {
  amount: string,
  date: string
}

export interface LatestEvents {
  block_hash: string
  block_log_indexed: number
  block_number: number
  block_time: number
  blockchain: string
  contract_address: string
  created_at: number
  data: string
  event_hash: string
  event_name: string
  id: number
  retry_count: number
  status: string
  sync_block_id: number
  tx_hash: string
  tx_index: string
  updated_at: number
}