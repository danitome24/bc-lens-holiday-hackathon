import { Metric } from "@/types";
import { MetricCard } from "./MetricCard";

export const MetricsList = () => { 

  const metrics: Metric[] = [
    { name: "Engagement", value: "95%" },
    { name: "Monetary Value", value: "85%" },
    { name: "Diversity", value: "80%" },
    { name: "Identity Score", value: "70%" },
    { name: "Age", value: "99%" },
  ];

  return (
    <div className="flex flex-row justify-between gap-1">
      {metrics.map((metric, i) => (
        <MetricCard key={i} metric={metric} />
      ))}
    </div>
  );
};
