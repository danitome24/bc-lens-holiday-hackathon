import { Tx } from "@/types";
import { useEffect, useState } from "react";
import { format, parse } from "date-fns";

export const useFetchTransactions = (address: string) => {
  //address = "0x9A0c4B4997485F51FF1013F7080464780BA8b67D";
  const [tx, setTx] = useState<Tx[]>([]);
  const [txByMonth, setTxByMonth] = useState<{ [key: string]: number }>({});
  const [monthsWithTx, setMonthsWithTx] = useState<number>(0);

  const apiUrl = `https://block-explorer-api.staging.lens.dev/api?module=account&offset=1000&action=txlist&sort=asc&endblock=99999999&startblock=0&address=${address}`;

  useEffect(() => {
    const fetchTx = async () => {
      if (address !== "") {
        const response = await fetch(apiUrl);
        const txData = await response.json();
        const transactions = txData.result.map((tx: any) => ({
          timestamp: tx.timeStamp,
          from: tx.from,
          to: tx.to,
          gas: tx.gas,
          blockNumber: tx.blockNumber,
        }));

        setTx(transactions);

        // Group transactions by month
        const txByMonth: { [key: string]: number } = {};
        transactions.forEach((tx: Tx) => {
          const date = parse(tx.timestamp.toString(), "t", new Date());
          const month = format(date, "yyyy-MM");
          if (!txByMonth[month]) {
            txByMonth[month] = 0;
          }
          txByMonth[month]++;
        });
        setTxByMonth(txByMonth);

        // Count the number of months with at least one transaction
        const monthsWithTx = Object.keys(txByMonth).length;
        setMonthsWithTx(monthsWithTx);
      }
    };

    fetchTx();
  }, [address, apiUrl]);

  return {
    tx,
    txByMonth,
    monthsWithTx,
  };
};
