"use client";

import { useAccountAge } from "@/hooks";
import { useAccount } from "wagmi";

export const ActiveSinceStat = () => {
  const account = useAccount();
  const { firstTxFormattedDate } = useAccountAge(
    account.address ?? ""
  );

  return (
    <div className="stat">
      <div className="stat-figure text-primary">
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
      <div className="stat-value text-primary">{firstTxFormattedDate}</div>
      <div className="stat-desc">↗︎ 400 (22%)</div>
    </div>
  );
};
