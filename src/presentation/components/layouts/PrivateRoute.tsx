import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { utilisateurs_role_enum } from "@/domain/models/enums";
import { PublicRoutesNavigation } from "@/shared/constants/AppRoutesNavigation";

type ProtectedRouteProps = {
  allowedRoles: utilisateurs_role_enum[];
  children: JSX.Element;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const { user } = useSelector((state: RootState) => state.authentification);

  if (!user || !user.role) {
    return <Navigate to={PublicRoutesNavigation.MAIN_PAGE} replace />;
  }

  const hasAccess = allowedRoles.includes(user.role);
  if (hasAccess) {
    return children;
  }

  return <Navigate to={PublicRoutesNavigation.MAIN_PAGE} replace />;
};

export default ProtectedRoute;
