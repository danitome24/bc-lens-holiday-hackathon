import { Metric } from "@/types";

type MetricCardProps = {
  metric: Metric;
};

export const MetricCard = ({ metric }: MetricCardProps) => {
  return (
    <div
      key={metric.name}
      className="bg-base-200 w-full p-4 rounded shadow-sm flex justify-between items-center"
    >
      <p className="text-base-content">{metric.name}</p>
      <span
        className={`text-xl font-semibold ${
          metric.name.length % 2 === 0 ? "text-primary" : "text-secondary"
        }`}
      >
        {metric.value}
      </span>
    </div>
  );
};
