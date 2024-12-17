import { ScoreGauge } from "./ScoreGauge";

export const ScoreCard = () => {
  return (
    <>
      <div className="card bg-base-100 h-full shadow-xl">
        <div className="card-body">
          <div className="card-title">Social Score</div>
          <div className="flex flex-row">
            <ScoreGauge score={95} />
            <div className="flex flex-col gap-2">
              <div className="py-4 px-8 bg-base-300 rounded-xl text-center">
                <p className="text-sm">
                  Current rank:{" "}
                  <span className="text-lg text-primary font-bold">25/100</span>
                </p>
              </div>

              <div className="py-4 px-8 bg-base-300 rounded-xl text-center">
                <p className="text-sm">TOP</p>

                <p className="text-lg text-primary font-bold">25/100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
