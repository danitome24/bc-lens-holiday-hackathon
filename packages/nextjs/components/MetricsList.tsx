import { Metric, Score } from "@/types";
import { MetricCard } from "./MetricCard";
import {
  MaxAccountAgePoints,
  MaxGrassBalancePoints,
  MaxMonthsInteractingPoints,
  MaxProtocolsUsedPoints,
  MaxTransactionPoints,
} from "@/config/scoreConfig";

type MetricsListProps = {
  score: Score;
};

export const MetricsList = ({ score }: MetricsListProps) => {
  const metrics: Metric[] = [
    {
      name: "Transactions",
      percentage: `${Math.floor(
        (score.txScore / MaxTransactionPoints.MAX) * 100
      )} %`,
      score: score.txScore,
      description: "Number of transactions made",
    },
    {
      name: "Balance",
      percentage: `${Math.floor(
        (score.grassBalanceScore / MaxGrassBalancePoints.MAX) * 100
      )} %`,
      score: score.grassBalanceScore,
      description: "Total balance in the account",
    },
    {
      name: "Engagement",
      percentage: `${Math.floor(
        (score.monthsInteractingScore / MaxMonthsInteractingPoints.MAX) * 100
      )} %`,
      score: score.monthsInteractingScore,
      description: "Months of active engagement",
    },
    {
      name: "Protocols Used",
      percentage: `${Math.floor(
        (score.protocolsScore / MaxProtocolsUsedPoints.MAX) * 100
      )} %`,
      score: score.protocolsScore,
      description: "Number of unique protocols used",
    },
    {
      name: "Account Age",
      percentage: `${Math.floor(
        (score.accAgeScore / MaxAccountAgePoints.MAX) * 100
      )} %`,
      score: score.accAgeScore,
      description: "Age of the account in months",
    },
  ];

  return (
    <div className="flex flex-col gap-1">
      {metrics.map((metric, i) => (
        <MetricCard key={i} metric={metric} />
      ))}
    </div>
  );
};
