"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useAccount } from "wagmi";

export const ActiveSinceStat = () => {
  const [firstTxTimestamp, setFirstTxTimestamp] = useState<Date | undefined>(
    undefined
  );

  const account = useAccount();

  const apiUrl = `https://block-explorer-api.staging.lens.dev/api?module=account&action=txlist&page=1&offset=1&sort=asc&endblock=99999999&startblock=0&address=${account.address}`;

  useEffect(() => {
    const fetchFirstTx = async () => {
      if (account.address !== undefined) {
        const response = await fetch(apiUrl);
        const tx = await response.json();

        setFirstTxTimestamp(new Date(tx.result[0].timeStamp * 1000));
      }
    };

    fetchFirstTx();
  }, [account]);

  const formattedDate =
    firstTxTimestamp != undefined
      ? format(firstTxTimestamp, "d 'of' MMMM, yyyy")
      : "-";

  return (
    <div className="stat">
      <div className="stat-figure text-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block h-8 w-8 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          ></path>
        </svg>
      </div>
      <div className="stat-title">Active since</div>
      <div className="stat-value">{formattedDate}</div>
      <div className="stat-desc">↗︎ 400 (22%)</div>
    </div>
  );
};
