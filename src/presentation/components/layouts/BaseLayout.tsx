import { AppProvider, Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { appTheme } from "@/presentation/lib/layoutTheme";
import { useNavigationHandler } from "@/presentation/hooks/use-navigation-handler";
import { User } from "./User";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { fr } from "date-fns/locale";
import LoadingSpinner from "../common/LoadingSpinner";
import { useRestoreAuth } from "@/presentation/hooks/use-restore-auth";
import { LogOutModal } from "../common/modal/LogOutModal";

export interface BaseLayoutProps {
  navigation: Navigation;
}
export default function BaseLayout({ navigation }: BaseLayoutProps) {
  const { loading } = useSelector((state: RootState) => state.authentification);
  const { isRestoreDone } = useRestoreAuth();
  const { router, isLogoutModalOpen, handleCloseLogoutModal } =
    useNavigationHandler(location.pathname);

  // Afficher le spinner pendant la restauration des données d'authentification
  if (!isRestoreDone || loading) {
    return <LoadingSpinner />;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
      <AppProvider navigation={navigation} router={router} theme={appTheme}>
        <div className="dashboard-layout-wrapper">
          <DashboardLayout
            slots={{ appTitle: "a", toolbarAccount: User }}
            sidebarExpandedWidth={250}
            sidebarCollapsedWidth={0}
          >
            <PageContainer
              className="bg-slate-50 dark:bg-transparent"
              title={""}
              breadcrumbs={[]}
            >
              <Outlet />
            </PageContainer>
          </DashboardLayout>
        </div>

        {/* Modale de déconnexion */}
        <LogOutModal
          isOpen={isLogoutModalOpen}
          handleClose={handleCloseLogoutModal}
        />
      </AppProvider>
    </LocalizationProvider>
  );
}
