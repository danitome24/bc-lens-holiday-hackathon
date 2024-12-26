import React from "react";
import { useBalance } from "wagmi";
import { MoneySVG } from ".";

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
        <MoneySVG />
      </div>
      <div className="stat-title">Balance</div>
      <div className="stat-value">{formattedBalance} $GRASS</div>
      <div className="stat-desc">↘︎ 90 (14%)</div>
    </div>
  );
};

export default BalanceStat;
