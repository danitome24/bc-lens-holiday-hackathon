export enum MaxTransactionPoints {
  MIN = 0,
  MAX = 60,
}

export enum MaxAccountAgePoints {
  MIN = 0,
  MAX = 50,
}

export enum MaxProtocolsUsedPoints {
  MIN = 0,
  MAX = 50,
}

export enum MaxMonthsInteractingPoints {
  MIN = 0,
  MAX = 50,
}

export enum MaxGrassBalancePoints {
  MIN = 0,
  MAX = 50,
}
export const MaxTotalScore = 
  MaxTransactionPoints.MAX +
  MaxAccountAgePoints.MAX +
  MaxProtocolsUsedPoints.MAX +
  MaxMonthsInteractingPoints.MAX +
  MaxGrassBalancePoints.MAX;
