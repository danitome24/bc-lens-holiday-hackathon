"use client";

import { useAccountAge } from "@/hooks";
import { DateSVG } from ".";

type ActiveSinceStatProps = {
  walletAddress: string;
};

export const ActiveSinceStat = ({ walletAddress }: ActiveSinceStatProps) => {
  const { firstTxFormattedDate } = useAccountAge(walletAddress ?? "");

  return (
    <div className="stat">
      <div className="stat-figure text-primary">
        <DateSVG />
      </div>
      <div className="stat-title">Active since</div>
      <div className="stat-value text-primary">{firstTxFormattedDate}</div>
      <div className="stat-desc">↗︎ 400 (22%)</div>
    </div>
  );
};
