import { Score } from "@/types";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type ScoreRadarChartProps = {
  score: Score;
};

export const ScoreRadarChart = ({ score }: ScoreRadarChartProps) => {
  // Radar Chart Data
  const radarData = {
    labels: [
      "Transactions",
      "Account Age",
      "Protocols used",
      "Engagement",
      "Balance",
    ],
    datasets: [
      {
        label: "Score Breakdown",
        data: [
          score.txScore,
          score.accAgeScore,
          score.protocolsScore,
          score.monthsInteractingScore,
          score.grassBalanceScore,
        ],
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        borderColor: "#10B981",
        borderWidth: 2,
        pointBackgroundColor: "#10B981",
        pointBorderColor: "#FFF",
      },
    ],
  };

  const radarOptions = {
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
      r: {
        beginAtZero: true,
        min: 0,
        max: 50,
        angleLines: {
          color: "#444",
        },
        grid: {
          color: "#444",
        },
        pointLabels: {
          color: "#FFF",
          font: {
            size: 7,
          },
        },
        ticks: {
          backdropColor: "transparent",
          color: "#FFF",
          stepSize: 10,
          suggestedMin: 0,
          suggestedMax: 50,
        },
      },
    },
  };

  return <Radar data={radarData} options={radarOptions} />;
};
