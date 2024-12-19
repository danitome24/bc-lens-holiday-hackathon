import React from "react";
import { useAccount, useBalance } from "wagmi";

const BalanceStat: React.FC = () => {
  const account = useAccount();
  const balance = useBalance({ address: account.address });

  const formattedBalance = balance.data?.value
    ? `${Number(balance.data?.value) / 10 ** balance.data.decimals} $GRASS`
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
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          ></path>
        </svg>
      </div>
      <div className="stat-title">Balance</div>
      <div className="stat-value">{formattedBalance}</div>
      <div className="stat-desc">↘︎ 90 (14%)</div>
    </div>
  );
};

export default BalanceStat;
