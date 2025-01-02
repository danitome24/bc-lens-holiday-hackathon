"use client";

import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useFetchUserHistoryScore } from "@/hooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ScoreHistoryChartProps = {
  walletAddress: string;
};

export const ScoreHistoryChart = ({
  walletAddress,
}: ScoreHistoryChartProps) => {
  const { data: history } = useFetchUserHistoryScore(walletAddress);
  const months = history.map((data) => data.month);
  const scores = history.map((data) => data.score);

  useEffect(() => {
    if (walletAddress != "") {
    }
  }, [walletAddress, history]);

  const data = {
    labels: months,
    datasets: [
      {
        label: `Score Value`,
        data: scores,
        fill: false,
        backgroundColor: "#10B981",
        borderColor: "#10B981",
        borderWidth: 2,
        pointBackgroundColor: "#10B981",
        tension: 0.3,
        pointBorderColor: "#FFF",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#FFF",
        bodyColor: "#FFF",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          color: "#444",
          font: {
            size: 14,
          },
        },
        ticks: {
          color: "#FFF",
        },
        grid: {
          display: false,
          color: "#444",
        },
      },
      y: {
        title: {
          display: true,
          text: "Score",
          color: "#444",
          font: {
            size: 14,
          },
        },
        ticks: {
          beginAtZero: true,
          backdropColor: "transparent",
          color: "#FFF",
          callback: function (tickValue: string | number) {
            return tickValue as number;
          },
        },
        grid: {
          color: "#444",
        },
      },
    },
  };

  return (
    <div className="flex justify-center items-center">
      <Line data={data} options={options} />
    </div>
  );
};
