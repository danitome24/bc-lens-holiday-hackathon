"use client";

import { useAccountScore } from "@/hooks";
import { ScoreGauge } from "./ScoreGauge";

export const ScoreCard = () => {
  const score = useAccountScore({
    transactions: 22,
    accountAgeMonths: 5,
    protocolsUsed: 10,
    monthsInteracting: 4,
    grassBalance: 100,
  });

  return (
    <>
      <div className="card bg-base-100 h-full shadow-xl">
        <div className="card-body">
          <div className="card-title">Social Score</div>
          <div className="flex flex-row">
            <ScoreGauge score={score.normalizedScore} />
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
