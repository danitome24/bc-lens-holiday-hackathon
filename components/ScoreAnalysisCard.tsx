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
    <>
      <h3 className="text-lg font-semibold mb-4">Score Analysis</h3>
      <div className="w-full h-64">
        <Radar data={radarData} options={{ maintainAspectRatio: true }} />
      </div>
    </>
  );
};
