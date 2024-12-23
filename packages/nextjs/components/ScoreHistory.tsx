import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const ScoreHistory = () => {
  const months = ["Aug", "Sep", "Oct", "Nov", "Dec"];
  const scores = [20, 25, 32, 34, 51];

  const data = {
    labels: months,
    datasets: [
      {
        label: `Daniel's Score History`,
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
          text: "Months",
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
    <div className="my-5 bg-base-200 shadow-md rounded-md w-full h-auto flex flex-col items-center py-8">
      <h2 className="text-xl font-bold text-base-content mb-4 text-center">
        History Score
      </h2>
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-4xl h-96">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};
