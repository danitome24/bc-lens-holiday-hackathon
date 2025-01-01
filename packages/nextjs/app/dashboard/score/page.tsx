"use client";

import { MetricsList, ScoreAnalysisCard } from "@/components";
import { ScoreRadarChart } from "@/components/ScoreRadarChart";
import { useAccountAge, useAccountBalance, useFetchUserScore } from "@/hooks";
import { Score } from "@/types";
import { NextPage } from "next";
import Link from "next/link";
import { useAccount } from "wagmi";

const DetailsPage: NextPage = () => {
  const account = useAccount();
  const score = useFetchUserScore(account.address || "");
  const { activeTime } = useAccountAge(account.address || "");
  const { balanceWithDecimals } = useAccountBalance(account.address || "");

  return (
    <div className="score-detail-container bg-base-200 min-h-screen p-6 text-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-primary mb-8">
        Score Details
      </h1>

      <div className="card bg-base-300 shadow-lg w-full max-w-4xl p-8 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-secondary mb-4">
              Current Score
            </h2>
            <p className="text-6xl font-bold text-accent">{score.total}</p>
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-secondary mb-4">
              Normalized Score
            </h2>
            <p className="text-4xl font-bold text-accent">
              {score.normalized}%
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-secondary mb-4">
              Active Time
            </h2>
            <p className="text-lg text-gray-300">{activeTime}</p>
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-secondary mb-4">Balance</h2>
            <p className="text-lg text-accent">{balanceWithDecimals.toFixed(3)} $GRASS</p>
          </div>
        </div>

        <div className="divider my-8"></div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Score Analysis
          </h2>
          <div className="flex flex-row">
            <div className="flex flex-row w-full">
              <div className="w-1/3"></div>
              <ScoreRadarChart score={score} />
            </div>
            <div className="w-2/3">
              <MetricsList score={score} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
