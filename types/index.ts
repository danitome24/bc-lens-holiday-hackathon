export type Metric = {
  name: string;
  value: string;
}

export type Score = {
  total: number;
  normalized: number;
  txScore: number;
  accAgeScore: number;
  protocolsScore: number;
  monthsInteractingScore: number;
  grassBalanceScore: number;
}

export type Tx = {
  timestamp: number;
  from : string;
  to: string;
  gas: number;
  blockNumber: number;
}
