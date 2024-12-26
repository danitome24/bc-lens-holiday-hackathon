import { Score } from "@/types";
import { Radar } from "react-chartjs-2";

type ScoreAnalysisCardProps = {
  score: Score;
};

export const ScoreAnalysisCard = ({ score }: ScoreAnalysisCardProps) => {
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

  return (
    <div className="flex-1 max-w-xl">
      <div className="card bg-base-200 shadow-xl h-full">
        <div className="card-body flex flex-col">
          <h3 className="card-title text-left text-base-content">
            Score Analysis
          </h3>
          <div className="flex-grow mx-auto">
            <Radar data={radarData} options={radarOptions} />
          </div>
          <p className="text-right">
            <span className="text-2xl text-white font-bold">{score.total}</span>{" "}
            points
          </p>
        </div>
      </div>
    </div>
  );
};
