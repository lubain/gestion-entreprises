import { useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "@/presentation/components/common/toast/Toast";
import { resetPassword } from "@/application/slices/auth/resetPassword";
import { AppDispatch } from "@/store";

interface UseForgotPasswordReturn {
  email: string;
  setEmail: (email: string) => void;
  loading: boolean;
  isSubmitted: boolean;
  sendResetLink: (email: string) => Promise<void>;
  resetForm: () => void;
}

export const useForgotPassword = (): UseForgotPasswordReturn => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendResetLink = async (emailAddress: string): Promise<void> => {
    if (!emailAddress.trim()) {
      toast.error("Veuillez saisir votre adresse email");
      throw new Error("Email requis");
    }

    if (!validateEmail(emailAddress)) {
      toast.error("Veuillez saisir une adresse email valide");
      throw new Error("Email invalide");
    }

    setLoading(true);

    try {
      // Utilisation du slice Redux pour envoyer l'email de réinitialisation
      const result = await dispatch(resetPassword(emailAddress));

      if (resetPassword.fulfilled.match(result)) {
        setIsSubmitted(true);
        toast.success("Lien de réinitialisation envoyé avec succès");
      } else {
        throw new Error(result.payload as string);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erreur lors de l'envoi du lien de réinitialisation";

      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetForm = (): void => {
    setEmail("");
    setLoading(false);
    setIsSubmitted(false);
  };

  return {
    email,
    setEmail,
    loading,
    isSubmitted,
    sendResetLink,
    resetForm,
  };
};
