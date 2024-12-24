import { Metric } from "@/types";

type MetricCardProps = {
  metric: Metric;
};

export const MetricCard = ({ metric }: MetricCardProps) => {
  return (
    <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.5rem)] bg-base-200 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-base-content">{metric.name}</h3>
      <p className="text-sm text-base-content mt-1">{metric.description}</p>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-secondary">
            {metric.score}
            <span className="text-base-content text-xs"> Points</span>
          </span>
          <span className="text-sm text-white">{metric.percentage}</span>
        </div>
        <div className="relative w-full h-2 mt-2 bg-neutral rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-accent rounded-full"
            style={{ width: `${metric.percentage.replace(/\s/g, "")}` }}
          />
        </div>
      </div>
    </div>
  );
};
