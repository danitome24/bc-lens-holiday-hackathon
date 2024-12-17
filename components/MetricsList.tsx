import { Metric } from "@/types";

type MetricsListProps = {
  metrics: Metric[];
};

export const MetricsList = ({ metrics }: MetricsListProps) => {
  return (
    <div className="flex flex-row justify-between gap-1">
      {metrics.map((metric) => (
        <div
          key={metric.name}
          className="bg-base-100 w-full p-4 rounded shadow-sm flex justify-between items-center"
        >
          <p className="text-gray-600">{metric.name}</p>
          <span className="text-xl font-semibold text-green-500">
            {metric.value}
          </span>
        </div>
      ))}
    </div>
  );
};
