import { Metric } from "@/types";
import { MetricCard } from "./MetricCard";

type MetricsListProps = {
  metrics: Metric[];
};

export const MetricsList = ({ metrics }: MetricsListProps) => {
  return (
    <div className="flex flex-row justify-between gap-1">
      {metrics.map((metric, i) => (
        <MetricCard key={i} metric={metric} />
      ))}
    </div>
  );
};
