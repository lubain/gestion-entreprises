import { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "@/presentation/components/common/navigation/ScrollToTop.tsx";
import { useRestoreAuth } from "@/presentation/hooks/authentification/use-restore-auth.ts";
import LoadingSpinner from "@/presentation/components/common/LoadingSpinner";
import PageNotFound from "../components/common/NotFoundPage";
import { publicRoutes } from "./publicRoutes/publicRoutes";
import BaseLayout from "../components/layouts/BaseLayout";
import { ADMIN_NAVIGATION } from "../components/layouts/navigations/adminNavigation";
import adminRoutes from "./protectedRoute/adminRoutes";
import { useToast } from "../hooks/use-toast.ts";
import AuthWrapper from "../components/common/AuthWrapper.tsx";

const AppRoutes = () => {
  const { isRestoreDone } = useRestoreAuth();
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isDisconnectedOnce, setIsDisconnectedOnce] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    const updateConnectionStatus = () => {
      setIsConnected(navigator.onLine);
    };

    window.addEventListener("online", updateConnectionStatus);
    window.addEventListener("offline", updateConnectionStatus);

    // Initial check
    updateConnectionStatus();

    return () => {
      window.removeEventListener("online", updateConnectionStatus);
      window.removeEventListener("offline", updateConnectionStatus);
    };
  }, []);

  useEffect(() => {
    if (isConnected === false) {
      setIsDisconnectedOnce(true);
      toast.warning("Vous êtes actuellement hors ligne.");
    } else if (isConnected === true && isDisconnectedOnce) {
      toast.success("Connexion rétablie !");
    }
  }, [isConnected]);

  if (!isRestoreDone) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthWrapper>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Routes publiques */}
            {publicRoutes.map((route, index) => {
              return (
                <Route key={index} path={route.path} element={route.element} />
              );
            })}

            {/* Routes protégées */}
            <Route element={<BaseLayout navigation={ADMIN_NAVIGATION} />}>
              {adminRoutes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                );
              })}
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </AuthWrapper>
    </BrowserRouter>
  );
};

export default AppRoutes;
