type DashboardItemsCardProps = {
  title: string;
  children: React.ReactNode;
};

export const DashboardItemsCard = ({
  title,
  children
}: DashboardItemsCardProps) => {
  return (
    <div className="card bg-base-300 shadow-lg p-6">
      <h3 className="text-lg font-bold text-secondary mb-2">{title}</h3>
      {children}
    </div>
  );
};
