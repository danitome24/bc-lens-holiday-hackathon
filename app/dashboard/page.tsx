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
import { Radar } from "react-chartjs-2";
ChartJS.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);
import { AccountSummary, ScoreAnalysisCard, ScoreCard, } from "@/components";

const Dashboard: NextPage = () => {


  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Main Dashboard */}
      <main className="p-8">
        <div className="bg-gray-50">
          {/* Account summary stats */}
          <AccountSummary />

          <div className="flex flex-row bg-base-100 text-base-content my-6">
            {/* Score Card */}
            <section className="p-6 border-r-2">
              <ScoreCard />
            </section>

            {/* Radar Chart */}
            <section className="p-6">
              <ScoreAnalysisCard />
            </section>
          </div>

          {/* Metrics Breakdown */}
          <section className="">
            {metrics.map((metric) => (
              <div
                key={metric.name}
                className="bg-white p-4 rounded shadow-sm flex justify-between items-center"
              >
                <p className="text-gray-600">{metric.name}</p>
                <span className="text-xl font-semibold text-green-500">
                  {metric.value}
                </span>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

const metrics = [
  { name: "Engagement", value: "95%" },
  { name: "Monetary Value", value: "85%" },
  { name: "Diversity", value: "80%" },
  { name: "Identity Score", value: "70%" },
  { name: "Age", value: "99%" },
];

export default Dashboard;
