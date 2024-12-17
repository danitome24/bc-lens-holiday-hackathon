import { ScoreGauge } from "./ScoreGauge";

export const ScoreCard = () => {
  return (
    <>
      <h3 className="text-lg font-semibold ">Social Score</h3>
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
    </>
  );
};
