"use client";

import { useAccountAge, useAccountBalance } from "@/hooks";
import { Score } from "@/types";

type AccountSummaryProps = {
  walletAddress: string;
  score: Score;
};

export const AccountSummary = ({
  walletAddress,
  score,
}: AccountSummaryProps) => {
  const { activeTime } = useAccountAge(walletAddress);
  const { balanceWithDecimals } = useAccountBalance(walletAddress);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center col-span-1 lg:col-span-2">
        <h2 className="text-2xl font-bold text-secondary mb-4">
          Current Reputation
        </h2>
        <p className="text-6xl font-bold text-accent">{score.total}</p>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-secondary mb-4">Active Time</h2>
        <p className="text-lg text-gray-300">{activeTime}</p>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-secondary mb-4">Balance</h2>
        <p className="text-lg text-accent">
          {balanceWithDecimals.toFixed(3)} $GRASS
        </p>
      </div>
    </div>
  );
};
