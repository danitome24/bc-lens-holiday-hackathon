import { ScoreHistoryChart } from "@/components";

export const ScoreHistoryCard = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-primary mb-4">Score History</h2>
      <div className="w-full max-w-4xl h-96">
        <ScoreHistoryChart />
      </div>
    </div>
  );
};
