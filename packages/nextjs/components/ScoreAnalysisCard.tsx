import { Score } from "@/types";

type ScoreAnalysisCardProps = {
  score: Score;
};

export const ScoreAnalysisCard = ({ score }: ScoreAnalysisCardProps) => {


  return (
    <div className="flex-1 max-w-xl">
      <div className="card bg-base-200 shadow-xl h-full">
        <div className="card-body flex flex-col">
          <h3 className="card-title text-left text-base-content">
            Score Analysis
          </h3>
          
          <p className="text-right">
            <span className="text-2xl text-white font-bold">{score.total}</span>{" "}
            points
          </p>
        </div>
      </div>
    </div>
  );
};
