import { ScoreGauge } from "./ScoreGauge";

type ScoreCardProps = {
  normalizedScore: number;
};

export const ScoreCard = ({normalizedScore}: ScoreCardProps) => {

  return (
    <div className="flex-1 max-w-xl">
      <div className="card bg-base-200 h-full shadow-xl">
        <div className="card-body">
          <div className="card-title">Social Score</div>
          <div className="flex flex-row">
            <ScoreGauge score={normalizedScore} />
            <div className="flex flex-col gap-2">
              <div className="py-4 px-8 bg-base-300 rounded-xl text-center">
                <p className="text-sm">
                  Current rank:{" "}
                  <span className="text-lg text-white font-bold">25/100</span>
                </p>
              </div>

              <div className="py-4 px-8 bg-base-300 rounded-xl text-center">
                <p className="text-sm">TOP</p>

                <p className="text-lg text-white font-bold">25/100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
