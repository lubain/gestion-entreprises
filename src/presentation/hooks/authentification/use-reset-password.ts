import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { resetPassword } from "@/application/slices/auth/resetPassword";

/**
 * Hook pour gérer la réinitialisation de mot de passe via Redux
 */
export const useResetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(
    (state: RootState) => state.authentification
  );

  const sendResetPasswordEmail = async (email: string) => {
    const result = await dispatch(resetPassword(email));

    if (resetPassword.fulfilled.match(result)) {
      return result.payload;
    } else {
      throw new Error(result.payload as string);
    }
  };

  return {
    sendResetPasswordEmail,
    loading,
    error,
  };
};
