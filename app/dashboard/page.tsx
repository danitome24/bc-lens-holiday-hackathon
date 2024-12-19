"use client";

import {
  Chart as ChartJS,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { NextPage } from "next";
ChartJS.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);
import {
  AccountSummary,
  MetricsList,
  ScoreAnalysisCard,
  ScoreCard,
} from "@/components";
import { useAccountScore } from "@/hooks";
import { useMemo } from "react";

const Dashboard: NextPage = () => {
  const userProfile = useMemo(() => ({
    transactions: 22,
    accountAgeMonths: 5,
    protocolsUsed: 10,
    monthsInteracting: 4,
    grassBalance: 100,
  }), []);

  const { score } = useAccountScore(userProfile);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Main Dashboard */}
      <main className="p-8">
        <div className="bg-gray-50">
          {/* Account summary stats */}
          <AccountSummary />

          <div className="flex flex-row flex-grow justify-between text-base-content my-6">
            {/* Score Card */}
            <section className="flex-1 max-w-xl">
              <ScoreCard normalizedScore={score.normalized} />
            </section>

            {/* Radar Chart */}
            <section className="flex-1 max-w-xl">
              <ScoreAnalysisCard score={score} />
            </section>
          </div>

          {/* Metrics Breakdown */}
          <section className="">
            <MetricsList score={score} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
