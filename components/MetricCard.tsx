import { Metric } from "@/types";

type MetricCardProps = {
  metric: Metric;
};

export const MetricCard = ({ metric }: MetricCardProps) => {
  return (
    <div
      key={metric.name}
      className="bg-base-100 w-full p-4 rounded shadow-sm flex justify-between items-center"
    >
      <p className="text-gray-600">{metric.name}</p>
      <span className="text-xl font-semibold text-green-500">
        {metric.value}
      </span>
    </div>
  );
};
