export type Metric = {
  name: string;
  percentage: string;
  score: number;
  description: string;
};

export type Score = {
  total: number;
  normalized: number;
  txScore: number;
  accAgeScore: number;
  protocolsScore: number;
  monthsInteractingScore: number;
  grassBalanceScore: number;
};

export type Tx = {
  timestamp: number;
  from: string;
  to: string;
  gas: number;
  blockNumber: number;
};

export interface WalletScore {
  total: number; // Total score
  transactionsScore: number; // Amount transactions score.
  walletAgeScore: number; // Wallet age score.
  uniqueProtocolsScore: number; // Amount of unique protocols interacted with.
  engagementScore: number; // Number of months interacting with network.
  balanceScore: number; // Score depending on wallet balance.
}
