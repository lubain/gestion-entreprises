export const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white rounded-lg shadow-sm border border-slate-200 ${className}`}
  >
    {children}
  </div>
);
