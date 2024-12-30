type DashboardItemsCardProps = {
  title: string;
  content: string;
};

export const DashboardItemsCard = ({
  title,
  content,
}: DashboardItemsCardProps) => {
  return (
    <div className="card bg-base-300 shadow-lg p-6">
      <h3 className="text-lg font-bold text-secondary mb-2">{title}</h3>
      <p className="text-gray-400 truncate">{content}</p>
    </div>
  );
};
