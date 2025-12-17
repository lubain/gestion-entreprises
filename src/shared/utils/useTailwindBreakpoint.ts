import { useEffect, useState } from "react";

// Breakpoints Tailwind par défaut
const TAILWIND_BREAKPOINTS: Record<string, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export function useTailwindBreakpoint(
  breakpoint: keyof typeof TAILWIND_BREAKPOINTS
) {
  const minWidth = TAILWIND_BREAKPOINTS[breakpoint];
  const query = `(min-width: ${minWidth}px)`;

  const [matches, setMatches] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    // première synchro
    setMatches(mediaQuery.matches);

    // écoute
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
