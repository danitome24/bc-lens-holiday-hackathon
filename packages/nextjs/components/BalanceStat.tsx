import React from "react";
import { useBalance } from "wagmi";

type BalanceStatProps = {
  walletAddress: string;
};

const BalanceStat = ({ walletAddress }: BalanceStatProps) => {
  const balance = useBalance({ address: walletAddress as `0x${string}` });

  const formattedBalance = balance.data?.value
    ? `${(Number(balance.data?.value) / 10 ** balance.data.decimals).toFixed(
        3
      )}`
    : "-";

  return (
    <div className="stat text-white">
      <div className="stat-figure">
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
      <div className="stat-value">{formattedBalance} $GRASS</div>
      <div className="stat-desc">↘︎ 90 (14%)</div>
    </div>
  );
};

export default BalanceStat;
