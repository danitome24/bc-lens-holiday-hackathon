import { Score } from "@/types";
import { MetricsList, ScoreRadarChart } from "@/components";

type ScoreAnalysisCardProps = {
  score: Score;
};

export const ScoreAnalysisCard = ({ score }: ScoreAnalysisCardProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-primary mb-4">Metrics breakdown</h2>
      <div className="flex flex-row overflow-hidden">
          <div className="flex flex-row w-full">
            <div className="w-1/3"></div>
            <ScoreRadarChart score={score} />
          </div>
          <div className="w-2/3">
            <MetricsList score={score} />
          </div>
        </div>
    </div>
  );
};
