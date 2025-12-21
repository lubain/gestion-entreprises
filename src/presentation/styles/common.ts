export const CARD_STYLES = {
  container: "rounded-lg border dark:border-gray-700",
  header: "p-4 border-b border-gray-200 dark:border-gray-700",
  title: "text-lg font-semibold text-gray-900 dark:text-gray-100",
  content: "p-4",
} as const;

export const TEXT_STYLES = {
  primary: "text-gray-900 dark:text-gray-100",
  secondary: "text-gray-600 dark:text-gray-400",
  small: "text-sm",
} as const;

export const ICON_STYLES = {
  base: "h-5 w-5 text-gray-500 dark:text-gray-400",
  container: "p-2 rounded-lg",
} as const;

export const BADGE_STYLES = {
  base: "px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap inline-flex items-center gap-1.5 transition-all duration-300",
  new: "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 text-blue-700 dark:text-blue-200 border border-blue-200/50 dark:border-blue-700/50 shadow-sm hover:shadow-md hover:scale-[1.02]",
  dot: "w-1.5 h-1.5 rounded-full bg-current animate-pulse",
} as const;

export const BUTTON_STYLES = {
  base: "px-4 py-2 rounded-md transition-colors",
  primary:
    "bg-pme-primary-600 text-white hover:bg-pme-primary-700 dark:bg-pme-primary-500 dark:hover:bg-pme-primary-600",
  secondary:
    "border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800",
  danger:
    "text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950",
} as const;
