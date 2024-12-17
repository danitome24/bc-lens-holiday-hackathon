import { Radar } from "react-chartjs-2";

export const ScoreAnalysisCard = () => {
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
<div className="card bg-base-100 shadow-xl">
  <div className="card-body flex flex-col">
    <h3 className="card-title text-left">Score Analysis</h3>
    <div className="h-64 w-64 mx-auto">
      <Radar data={radarData} options={{ maintainAspectRatio: true }} />
    </div>
  </div>
</div>

  );
};
