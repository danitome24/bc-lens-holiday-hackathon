import { useState, useEffect } from "react";
import { Score } from "@/types";
import { useFetchTransactions } from "@/hooks/useFetchTransactions";
import { useFetchUniqueProtocols } from "@/hooks/useFetchUniqueProtocols";
import { useAccountBalance } from "@/hooks/useAccountBalance";
import { useAccountAge } from "@/hooks/useAccountAge";
import { calculateScore } from "@/utils/calculateScore";

const initialScoreState: Score = {
  total: 0,
  normalized: 0,
  txScore: 0,
  accAgeScore: 0,
  protocolsScore: 0,
  monthsInteractingScore: 0,
  grassBalanceScore: 0,
};

export const useFetchUserScore = (
  walletAddress: string
): { score: Score; isLoading: boolean } => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [score, setScore] = useState<Score>(initialScoreState);

  const { tx, monthsWithTx } = useFetchTransactions(walletAddress);
  const { uniqueProtocols: uniqueProtocolsUsed } = useFetchUniqueProtocols(
    walletAddress,
    tx
  );
  const { balanceWithDecimals } = useAccountBalance(walletAddress);
  const { accountAgeMonths } = useAccountAge(walletAddress);

  useEffect(() => {
    if (
      tx.length > 0 &&
      balanceWithDecimals !== null &&
      accountAgeMonths !== null
    ) {
      const userProfile = {
        transactions: tx.length,
        accountAgeMonths: accountAgeMonths,
        protocolsUsed: uniqueProtocolsUsed,
        monthsInteracting: monthsWithTx,
        grassBalance: balanceWithDecimals,
      };

      const calculatedScore = calculateScore(userProfile);
      setScore(calculatedScore);
      setIsLoading(false);
    }
  }, [
    tx,
    uniqueProtocolsUsed,
    balanceWithDecimals,
    accountAgeMonths,
    monthsWithTx,
  ]);

  return { score, isLoading };
};
