import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type LoadingSpinnerProps = ComponentProps<"div"> & {
  size?: number;
  color?: string;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 50,
  color = "border-blue-500",
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center h-screen",
        className
      )}
      {...props}
    >
      <div
        className={`animate-spin rounded-full border-4 ${color} border-t-transparent`}
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
