import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  AdminRoutesNavigations,
  PublicRoutesNavigation,
} from "@/shared/constants/AppRoutesNavigation";
import { utilisateurs_role_enum } from "@/domain/models/enums";

const getDashboardRoute = (role: string) => {
  switch (role) {
    case utilisateurs_role_enum.ADMIN:
      return `/${AdminRoutesNavigations.DASHBOARD}`;
    default:
      return PublicRoutesNavigation.MAIN_PAGE;
  }
};

type PublicRouteProps = {
  children: JSX.Element;
};

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.authentification);

  // Si l'utilisateur est connecté, redirige vers son dashboard
  if (user && user.role) {
    return <Navigate to={getDashboardRoute(user.role)} replace />;
  }

  return children;
};

export default PublicRoute;
