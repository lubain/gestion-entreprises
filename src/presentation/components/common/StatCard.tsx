import { FC, ReactNode } from "react";

/**
 * Trend information for displaying statistical changes
 */
interface TrendInfo {
  /** Percentage change value */
  value: number;
  /** Whether the trend is positive (green) or negative (red) */
  isPositive: boolean;
  /** Descriptive label for the trend period (e.g., "ce mois-ci") */
  label: string;
}

/**
 * Props for the StatCard component
 */
interface StatCardProps {
  /** Card title displayed at the top */
  title: string;
  /** Main value to display - can be string, number, or object with today/total */
  value: string | number | { today: number; total: number };
  /** Icon element to display in the top-right corner */
  icon: ReactNode;
  /** Optional trend information to show percentage change */
  trend: TrendInfo | null;
  /** Background color classes for the card */
  bgColor: string;
}

/**
 * StatCard Component
 *
 * Reusable card component for displaying key statistics with optional
 * trend indicators. Used throughout dashboard interfaces to show
 * metrics like appointment counts, health scores, and other KPIs.
 *
 * @component
 * @example
 * ```tsx
 * // Simple stat card
 * <StatCard
 *   title="Total Appointments"
 *   value={42}
 *   icon={<Calendar className="h-6 w-6" />}
 *   trend={null}
 *   bgColor="bg-blue-50 dark:bg-blue-900/30"
 * />
 *
 * // Stat card with trend
 * <StatCard
 *   title="New"
 *   value={15}
 *   icon={<Users className="h-6 w-6" />}
 *   trend={{ value: 12, isPositive: true, label: "this month" }}
 *   bgColor="bg-green-50 dark:bg-green-900/30"
 * />
 *
 * // Stat card with today/total values
 * <StatCard
 *   title="Revenue"
 *   value={{ today: 1250, total: 45000 }}
 *   icon={<DollarSign className="h-6 w-6" />}
 *   trend={null}
 *   bgColor="bg-emerald-50 dark:bg-emerald-900/30"
 * />
 * ```
 *
 * @param props - Component props
 * @param props.title - Card title displayed at the top
 * @param props.value - Main value (string/number/object with today/total)
 * @param props.icon - Icon element for visual identification
 * @param props.trend - Optional trend data with percentage change
 * @param props.bgColor - Background color classes for theming
 *
 * @architecture
 * - Responsive design with consistent spacing and typography
 * - Dark mode support through Tailwind CSS classes
 * - Flexible value display supporting multiple data types
 * - Optional trend indicator with color-coded positive/negative states
 *
 * @accessibility
 * - Semantic HTML structure with proper heading hierarchy
 * - Color contrast compliant for both light and dark themes
 * - Screen reader friendly with descriptive text content
 */
const StatCard: FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  bgColor,
}) => {
  return (
    <div className={`rounded-xl shadow-sm p-6 ${bgColor}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          {typeof value === "object" ? (
            <>
              <p className="text-lg font-bold mt-1 dark:text-white">
                Aujourd'hui : {value.today}
              </p>
              <p className="text-lg font-bold mt-1 dark:text-white">
                Total : {value.total}
              </p>
            </>
          ) : (
            <p className="text-2xl font-bold mt-1 dark:text-white">{value}</p>
          )}
          {trend && (
            <div className="flex items-center mt-1">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                {trend.label}
              </span>
            </div>
          )}
        </div>
        <div className="p-2 rounded-lg bg-white/60 dark:bg-gray-800/60">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
