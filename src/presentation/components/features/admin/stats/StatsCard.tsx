import { FC, memo } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard: FC<StatsCardProps> = memo(({ title, value, icon, trend }) => {
  return (
    <div className=" rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-sm ${trend.isPositive ? "text-green-500" : "text-red-500"}`}
              >
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}%
              </span>
              <span className="text-gray-500 text-sm ml-1">
                vs mois dernier
              </span>
            </div>
          )}
        </div>
        <div className="text-primary p-3 bg-pme-primary/10 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
});

StatsCard.displayName = "StatsCard";

export default StatsCard;
