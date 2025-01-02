import { useState, useEffect, useMemo } from "react";
import { Score } from "../types";
import {
  MaxTransactionPoints,
  MaxAccountAgePoints,
  MaxProtocolsUsedPoints,
  MaxMonthsInteractingPoints,
  MaxGrassBalancePoints,
  MaxTotalScore,
} from "../config/scoreConfig";

interface UserScore {
  transactions: number;
  accountAgeMonths: number;
  protocolsUsed: number;
  monthsInteracting: number;
  grassBalance: number;
}

const calculateTransactionPoints = (transactions: number): number => {
  if (transactions >= 1 && transactions <= 10) return 10;
  if (transactions >= 11 && transactions <= 100) return 20;
  if (transactions >= 101 && transactions <= 500) return 40;
  if (transactions > 500) return MaxTransactionPoints.MAX;
  return MaxTransactionPoints.MIN;
};

const calculateAccountAgePoints = (accountAgeMonths: number): number => {
  if (accountAgeMonths >= 1 && accountAgeMonths <= 3) return 5;
  if (accountAgeMonths >= 4 && accountAgeMonths <= 12) return 15;
  if (accountAgeMonths >= 13 && accountAgeMonths <= 24) return 30;
  if (accountAgeMonths > 24) return MaxAccountAgePoints.MAX;
  return MaxAccountAgePoints.MIN;
};

const calculateProtocolsUsedPoints = (protocolsUsed: number): number => {
  if (protocolsUsed === 1) return 5;
  if (protocolsUsed >= 2 && protocolsUsed <= 3) return 15;
  if (protocolsUsed >= 4 && protocolsUsed <= 5) return 30;
  if (protocolsUsed > 5) return MaxProtocolsUsedPoints.MAX;
  return MaxProtocolsUsedPoints.MIN;
};

const calculateMonthsInteractingPoints = (
  monthsInteracting: number
): number => {
  if (monthsInteracting >= 1 && monthsInteracting <= 2) return 5;
  if (monthsInteracting >= 3 && monthsInteracting <= 6) return 15;
  if (monthsInteracting >= 7 && monthsInteracting <= 10) return 30;
  if (monthsInteracting > 10) return MaxMonthsInteractingPoints.MAX;
  return MaxMonthsInteractingPoints.MIN;
};

const calculateGrassBalancePoints = (grassBalance: number): number => {
  if (grassBalance >= 0.1 && grassBalance <= 10) return 5;
  if (grassBalance >= 11 && grassBalance <= 50) return 15;
  if (grassBalance >= 51 && grassBalance <= 100) return 30;
  if (grassBalance > 100) return MaxGrassBalancePoints.MAX;
  return MaxGrassBalancePoints.MIN;
};

export const useCalculateScore = (userProfile: UserScore) => {
  const [score, setScore] = useState<Score>({
    total: 0,
    normalized: 0,
    txScore: 0,
    accAgeScore: 0,
    protocolsScore: 0,
    monthsInteractingScore: 0,
    grassBalanceScore: 0,
  });

  const calculateTotalScore = useMemo(() => {
    const transactionPoints = calculateTransactionPoints(
      userProfile.transactions
    );
    const accountAgePoints = calculateAccountAgePoints(
      userProfile.accountAgeMonths
    );
    const protocolsUsedPoints = calculateProtocolsUsedPoints(
      userProfile.protocolsUsed
    );
    const monthsInteractingPoints = calculateMonthsInteractingPoints(
      userProfile.monthsInteracting
    );
    const grassBalancePoints = calculateGrassBalancePoints(
      userProfile.grassBalance
    );

    const totalScore =
      transactionPoints +
      accountAgePoints +
      protocolsUsedPoints +
      monthsInteractingPoints +
      grassBalancePoints;
    const normalizedScoreWithDecimals = (totalScore / MaxTotalScore) * 100;

    return {
      total: totalScore,
      normalized: Number(normalizedScoreWithDecimals.toFixed(0)),
      txScore: transactionPoints,
      accAgeScore: accountAgePoints,
      protocolsScore: protocolsUsedPoints,
      monthsInteractingScore: monthsInteractingPoints,
      grassBalanceScore: grassBalancePoints,
    };
  }, [userProfile]);

  useEffect(() => {
    setScore(calculateTotalScore);
  }, [calculateTotalScore]);

  return {
    score,
  };
};
