"use client";

import {
  AccountSummary,
  ScoreAnalysisCard,
  ScoreHistoryCard,
} from "@/components";
import { useFetchUserScore } from "@/hooks";
import { NextPage } from "next";
import { useAccount } from "wagmi";

const DetailsPage: NextPage = () => {
  const account = useAccount();
  const score = useFetchUserScore(account.address || "");

  return (
    <div className="score-detail-container bg-base-200 min-h-screen p-6 text-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-primary mb-8">
        Score Details
      </h1>

      <div className="card bg-base-300 shadow-lg w-full max-w-4xl p-8 rounded-lg">
        <AccountSummary walletAddress={account.address || ""} score={score} />

        <div className="divider my-8"></div>

        <ScoreAnalysisCard score={score} />

        <div className="divider my-8"></div>

        <ScoreHistoryCard />
      </div>
    </div>
  );
};

export default DetailsPage;
