import { ScoreHistoryChart } from "@/components";

type ScoreHistoryCardProps = {
  walletAddress: string;
};

export const ScoreHistoryCard = ({ walletAddress }: ScoreHistoryCardProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-primary mb-4">Score History</h2>
      <div className="w-full max-w-4xl h-96">
        <ScoreHistoryChart walletAddress={walletAddress} />
      </div>
    </div>
  );
};
