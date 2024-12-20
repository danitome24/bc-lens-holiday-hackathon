import { Metric, Score } from "@/types";
import { MetricCard } from "./MetricCard";
import { MaxAccountAgePoints, MaxGrassBalancePoints, MaxMonthsInteractingPoints, MaxProtocolsUsedPoints, MaxTransactionPoints } from "@/config/scoreConfig";

type MetricsListProps = {
  score: Score;
};

export const MetricsList = ({ score }: MetricsListProps) => {
  const metrics: Metric[] = [
    { name: "Transactions", value: `${Math.floor(score.txScore / MaxTransactionPoints.MAX * 100)} %` },
    { name: "Balance", value: `${Math.floor(score.grassBalanceScore / MaxGrassBalancePoints.MAX * 100)} %` },
    { name: "Engagement", value: `${Math.floor(score.monthsInteractingScore / MaxMonthsInteractingPoints.MAX * 100)} %` },
    { name: "Protocols Used", value: `${Math.floor(score.protocolsScore / MaxProtocolsUsedPoints.MAX * 100)} %` },
    { name: "Account Age", value: `${Math.floor(score.accAgeScore / MaxAccountAgePoints.MAX * 100)} %` },
  ];

  return (
    <div className="flex justify-between gap-1">
      {metrics.map((metric, i) => (
        <MetricCard key={i} metric={metric} />
      ))}
    </div>
  );
};
