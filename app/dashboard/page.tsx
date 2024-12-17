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
import { AccountSummary, Header, ScoreGauge } from "@/components";

const Dashboard: NextPage = () => {
  // Radar Chart Data
  const radarData = {
    labels: ["Engagement", "Monetary", "Diversity", "Identity", "Age"],
    datasets: [
      {
        label: "Score Breakdown",
        data: [95, 85, 80, 70, 99], // Datos simulados
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        borderColor: "#10B981",
        borderWidth: 2,
        pointBackgroundColor: "#10B981",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Main Dashboard */}
      <main className="p-8">
        <div className="bg-gray-50">
          {/* Account summary stats */}
          <AccountSummary />

          {/* Score Card */}
          <section className="">
            <ScoreGauge score={95} />
          </section>

          {/* Radar Chart */}
          <section className="bg-white p-6 rounded shadow-lg col-span-2">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Score Analysis
            </h3>
            <div className="w-full h-64">
              <Radar
                data={radarData}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </section>

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
