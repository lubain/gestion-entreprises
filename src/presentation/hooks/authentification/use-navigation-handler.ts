import { useState } from "react";
import { Router } from "@toolpad/core/AppProvider";
import { useLayoutRouter } from "./use-layout-router";

export function useNavigationHandler(initialPath: string) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const baseRouter = useLayoutRouter(initialPath);

  // Router personnalisé qui intercepte la navigation vers "Déconnecter"
  const router: Router = {
    ...baseRouter,
    navigate: (path: string | URL) => {
      const pathString = String(path);

      // Debug pour voir les navigations
      console.log("Navigation interceptée:", pathString);

      // Si l'utilisateur clique sur "Déconnecter"
      if (pathString === "logout-action" || pathString === "/logout-action") {
        console.log("Ouverture de la modale de déconnexion");
        setIsLogoutModalOpen(true);
        // Ne pas changer le pathname pour éviter la navigation
        return;
      }

      // Autres cas de déconnexion possibles
      if (pathString.includes("deconnecter") || pathString.includes("logout")) {
        console.log("Déconnexion détectée via pattern");
        setIsLogoutModalOpen(true);
        return;
      }

      // Sinon, navigation normale
      baseRouter.navigate(pathString);
    },
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  return {
    router,
    isLogoutModalOpen,
    handleCloseLogoutModal,
  };
}
