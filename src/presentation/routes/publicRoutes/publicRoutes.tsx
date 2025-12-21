import { lazy } from "react";
import { PublicRoutesNavigation } from "@/shared/constants/AppRoutesNavigation";

// Lazy loading des pages
const Login = lazy(
  () => import("@/presentation/pages/authentification/login/Login")
);
const ForgotPassword = lazy(
  () =>
    import(
      "@/presentation/pages/authentification/forgotPassword/ForgotPassword"
    )
);
const ResetPassword = lazy(
  () =>
    import("@/presentation/pages/authentification/resetPassword/ResetPassword")
);

export const publicRoutes = [
  {
    path: `/${PublicRoutesNavigation.MAIN_PAGE}`,
    element: <Login />,
  },
  {
    path: `/${PublicRoutesNavigation.FORGOT_PASSWORD_PAGE}`,
    element: <ForgotPassword />,
  },
  {
    path: `/${PublicRoutesNavigation.RESET_PASSWORD_PAGE}`,
    element: <ResetPassword />,
  },
];
