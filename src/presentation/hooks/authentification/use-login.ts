import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "@/application/slices/auth/authSlice";
import { SuccessMessages } from "@/shared/constants/SuccessMessages";
import { useNavigate } from "react-router-dom";
import {
  AdminRoutesNavigations,
  PublicRoutesNavigation,
} from "@/shared/constants/AppRoutesNavigation";
import { Utilisateur } from "@/domain/models";
import { LoginUserDTO } from "@/domain/DTOS/LoginUserDTO";
import { useToast } from "@/presentation/components/common/toast/Toast";

const useLogin = () => {
  const toast = useToast();
  const { error, loading } = useSelector(
    (state: RootState) => state.authentification
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const redirectAuthenticatedUser = (userToRedirect: Utilisateur) => {
    if (!userToRedirect) {
      console.error("Aucun utilisateur a rediriger");
      return;
    }

    if (!userToRedirect.role) {
      toast.error("Erreur: rôle utilisateur non défini");
      return;
    }

    switch (userToRedirect.role) {
      case "admin":
        navigate(`/${AdminRoutesNavigations.DASHBOARD}`);
        break;
      default:
        console.error("Role de l'utilisateur inconnue: ", userToRedirect.role);
        toast.error("Erreur: rôle utilisateur non reconnu");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const data = {
        email: email.trim(),
        password: password.trim(),
      };

      const resultAction = await dispatch(
        loginUser({ email: data.email, password: data.password })
      );
      const loginData = resultAction.payload as LoginUserDTO;

      if (!loginData || !loginData.success) {
        return;
      }

      if (!loginData.user) {
        console.error("Aucune donnee utilisateur trouvee dans la reponse");
        toast.error(
          "Erreur lors de la connexion: données utilisateur manquantes"
        );
        return;
      }

      const loggedInUser = loginData.user;
      toast.success(SuccessMessages.LOGIN_SUCCESS);
      redirectAuthenticatedUser(loggedInUser);
    } catch (error) {
      toast.error(error);
    }
  };

  const logout = async () => {
    try {
      await dispatch(logoutUser());

      // Réinitialiser le mode sombre en mode clair lors de la déconnexion
      document.documentElement.classList.remove("dark");

      // Optionnel : sauvegarder la préférence en localStorage
      localStorage.setItem("theme", "light");

      navigate(PublicRoutesNavigation.MAIN_PAGE);
    } catch (error) {
      toast.error(error);
    }
  };

  return {
    login,
    loading,
    error,
    logout,
  };
};

export default useLogin;
