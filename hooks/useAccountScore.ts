import React, { useState } from "react";

interface UserProfile {
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
  if (transactions > 500) return 60;
  return 0;
};

const calculateAccountAgePoints = (accountAgeMonths: number): number => {
  if (accountAgeMonths >= 0 && accountAgeMonths <= 3) return 5;
  if (accountAgeMonths >= 4 && accountAgeMonths <= 12) return 15;
  if (accountAgeMonths >= 13 && accountAgeMonths <= 24) return 30;
  if (accountAgeMonths > 24) return 50;
  return 0;
};

const calculateProtocolsUsedPoints = (protocolsUsed: number): number => {
  if (protocolsUsed === 1) return 5;
  if (protocolsUsed >= 2 && protocolsUsed <= 3) return 15;
  if (protocolsUsed >= 4 && protocolsUsed <= 5) return 30;
  if (protocolsUsed > 5) return 50;
  return 0;
};

const calculateMonthsInteractingPoints = (
  monthsInteracting: number
): number => {
  if (monthsInteracting >= 1 && monthsInteracting <= 2) return 5;
  if (monthsInteracting >= 3 && monthsInteracting <= 6) return 15;
  if (monthsInteracting >= 7 && monthsInteracting <= 10) return 30;
  if (monthsInteracting > 10) return 50;
  return 0;
};

const calculateGrassBalancePoints = (grassBalance: number): number => {
  if (grassBalance >= 0 && grassBalance <= 10) return 5;
  if (grassBalance >= 11 && grassBalance <= 50) return 15;
  if (grassBalance >= 51 && grassBalance <= 100) return 30;
  if (grassBalance > 100) return 50;
  return 0;
};

export const useAccountScore = (userProfile: UserProfile) => {
  const [score, setScore] = useState<number>(0);
  const [normalizedScore, setNormalizedScore] = useState<number>(0);
  const [txScore, setTxScore] = useState<number>(0);
  const [accAgeScore, setAccAgeScore] = useState<number>(0);
  const [protocolsScore, setProtocolsScore] = useState<number>(0);
  const [monthsInteractingScore, setMonthsInteractingScore] =
    useState<number>(0);
  const [grassBalanceScore, setGrassBalanceScore] = useState<number>(0);

  const calculateTotalScore = () => {
    const transactionPoints = calculateTransactionPoints(
      userProfile.transactions
    );
    setTxScore(transactionPoints);
    const accountAgePoints = calculateAccountAgePoints(
      userProfile.accountAgeMonths
    );
    setAccAgeScore(accountAgePoints);
    const protocolsUsedPoints = calculateProtocolsUsedPoints(
      userProfile.protocolsUsed
    );
    setProtocolsScore(protocolsUsedPoints);
    const monthsInteractingPoints = calculateMonthsInteractingPoints(
      userProfile.monthsInteracting
    );
    setMonthsInteractingScore(monthsInteractingPoints);
    const grassBalancePoints = calculateGrassBalancePoints(
      userProfile.grassBalance
    );
    setGrassBalanceScore(grassBalancePoints);

    const totalScore =
      transactionPoints +
      accountAgePoints +
      protocolsUsedPoints +
      monthsInteractingPoints +
      grassBalancePoints;
    setScore(totalScore);
    const normalizedScoreWithDecimals = (totalScore / 260) * 100;
    setNormalizedScore(Math.round(normalizedScoreWithDecimals));
  };

  React.useEffect(() => {
    calculateTotalScore();
  }, [userProfile]);

  return {
    score,
    normalizedScore,
    txScore,
    accAgeScore,
    protocolsScore,
    monthsInteractingScore,
    grassBalanceScore,
  };
};
