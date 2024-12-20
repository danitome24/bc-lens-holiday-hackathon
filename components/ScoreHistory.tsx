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
  const scores = [120, 135, 150, 170, 180];

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
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
          color: "#333",
          font: {
            size: 14,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "Score",
          color: "#333",
          font: {
            size: 14,
          },
        },
        ticks: {
          beginAtZero: true,
          callback: (value: number) => value,
        },
        grid: {
          color: "#e5e7eb",
        },
      },
    },
  };

  return (
    <div className="my-5 bg-white shadow-md rounded-md w-full h-auto flex flex-col items-center">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        History Score
      </h2>
      <div className="w-full h-96 flex justify-center items-center">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
