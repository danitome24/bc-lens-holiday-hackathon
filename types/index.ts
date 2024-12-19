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
