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
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 50,
      },
    },
  };
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body flex flex-col">
        <h3 className="card-title text-left">Score Analysis</h3>
        <div className="h-64 w-64 mx-auto">
          <Radar data={radarData} options={radarOptions} />
        </div>
      </div>
    </div>
  );
};
