import { useMemo } from "react";
import {
  useAccountAge,
  useAccountBalance,
  useCalculateScore,
  useFetchTransactions,
  useFetchUniqueProtocols,
} from ".";
import { Score } from "@/types";

export const useFetchUserScore = (walletAddress: string): Score => {
  // Fetch All data
  const { tx, monthsWithTx } = useFetchTransactions(walletAddress);
  const { uniqueProtocols: uniqueProtocolsUsed } = useFetchUniqueProtocols(
    walletAddress,
    tx
  );
  const { balanceWithDecimals } = useAccountBalance(walletAddress);
  const { accountAgeMonths } = useAccountAge(walletAddress);

  const userProfile = useMemo(
    () => ({
      transactions: tx.length,
      accountAgeMonths: accountAgeMonths,
      protocolsUsed: uniqueProtocolsUsed,
      monthsInteracting: monthsWithTx,
      grassBalance: balanceWithDecimals,
    }),
    [
      tx,
      uniqueProtocolsUsed,
      balanceWithDecimals,
      monthsWithTx,
      accountAgeMonths,
    ]
  );

  const { score } = useCalculateScore(userProfile);

  return score;
};
