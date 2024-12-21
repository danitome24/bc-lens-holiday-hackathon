import { useEffect, useState } from "react";
import { format } from "date-fns";

export const useAccountAge = (account: string) => {
  const [firstTxTimestamp, setFirstTxTimestamp] = useState<Date | number>(0);
  const [firstTxFormattedDate, setFirstTxFormattedDate] =
    useState<string>("Never");
  const [accountAgeMonths, setAccountAgeMonths] = useState<number>(0);

  const apiUrl = `https://block-explorer-api.staging.lens.dev/api?module=account&action=txlist&page=1&offset=1&sort=asc&endblock=99999999&startblock=0&address=${account}`;

  useEffect(() => {
    const fetchFirstTx = async () => {
      if (account !== "") {
        const response = await fetch(apiUrl);
        const tx = await response.json();
        if (tx.result.length > 0) {
          const firstTxTimestampDate = new Date(tx.result[0].timeStamp * 1000);
          setFirstTxTimestamp(firstTxTimestampDate);
          setFirstTxFormattedDate(
            format(firstTxTimestampDate, "d 'of' MMM, yyyy")
          );
          const now = new Date();
          const diffInMonths =
            (now.getFullYear() - firstTxTimestampDate.getFullYear()) * 12 +
            (now.getMonth() - firstTxTimestampDate.getMonth());
          setAccountAgeMonths(diffInMonths);
        }
      }
    };

    fetchFirstTx();
  }, [account, apiUrl]);

  return { firstTxTimestamp, firstTxFormattedDate, accountAgeMonths };
};
