import React, { useEffect } from "react";
import { Router } from "@toolpad/core/AppProvider";
import { useNavigate } from "react-router-dom";

export function useLayoutRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  const navigate = useNavigate();

  useEffect(() => {
    if (router) {
      navigate(router.pathname);
    }
  }, [router]);

  return router;
}
