export const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  icon: Icon,
}: any) => {
  const baseStyle =
    "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors text-sm";
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600/50 dark:hover:bg-blue-700/50",
    secondary:
      "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    ghost:
      "text-slate-600 hover:bg-slate-100 dark:text-white dark:hover:text-slate-800",
  };
  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
};
