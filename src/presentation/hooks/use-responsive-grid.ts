import { useCallback, useEffect, useRef } from "react";

interface UseResponsiveGridProps {
  onWidthChange: (width: number) => void;
}

export const useResponsiveGrid = (
  { onWidthChange }: UseResponsiveGridProps,
) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const handleResizeUpdate = useCallback(() => {
    const currentElement = elementRef.current;
    if (currentElement) {
      onWidthChange(currentElement.offsetWidth);
    }
  }, [onWidthChange]);

  useEffect(() => {
    handleResizeUpdate();
    window.addEventListener("resize", handleResizeUpdate);
    return () => window.removeEventListener("resize", handleResizeUpdate);
  }, [handleResizeUpdate]);

  return {
    elementRef,
  };
};
