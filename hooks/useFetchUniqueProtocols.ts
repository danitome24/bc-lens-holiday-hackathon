import { Tx } from "@/types";
import { useEffect, useState } from "react";

export const useFetchUniqueProtocols = (
  walletAddress: string,
  txs: Tx[]
): { uniqueProtocols: number } => {
  const [uniqueProtocols, setUniqueProtocols] = useState<number>(0);

  useEffect(() => {
    if (txs.length === 0) {
      console.log("No transactions found or an error occurred.");
    }
    const uniqueContracts = new Set<string>();
    console.log("txs", txs);

    for (const tx of txs) {
      console.log(walletAddress == tx.from);
      if (tx.to && tx.to !== walletAddress && walletAddress == tx.from) {
        uniqueContracts.add(tx.to);
      }
    }

    setUniqueProtocols(uniqueContracts.size);
  }, [walletAddress, txs]);

  return { uniqueProtocols };
};
