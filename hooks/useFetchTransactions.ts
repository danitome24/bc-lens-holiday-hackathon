import { Tx } from "@/types";
import { useEffect, useState } from "react";

export const useFetchTransactions = (address: string) => {
  const [tx, setTx] = useState<Tx[]>([]);

  const apiUrl = `https://block-explorer-api.staging.lens.dev/api?module=account&action=txlist&sort=asc&endblock=99999999&startblock=0&address=${address}`;

  useEffect(() => {
    const fetchTx = async () => {
      if (address != "") {
        const response = await fetch(apiUrl);
        const tx = await response.json();
        setTx(
          tx.result.map((tx: any) => ({
            timestamp: tx.timeStamp,
            from: tx.from,
            to: tx.to,
            gas: tx.gas,
            blockNumber: tx.blockNumber,
          }))
        );
      }
    };

    fetchTx();
  }, [address]);

  return {
    tx
  };
};
