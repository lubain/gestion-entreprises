import { IResetPasswordRepository } from "@/domain/interfaces/repositories/user/IResetPasswordRepository";
import { supabase } from "@/infrastructure/supabase/supabase";

class ResetPasswordRepository implements IResetPasswordRepository {
  constructor() { }

  async execute(email: string): Promise<void> {
    try {
      // Utilise la méthode resetPasswordForEmail de Supabase
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        // Gestion des erreurs spécifiques de Supabase
        if (error.message.includes("User not found")) {
          throw new Error("Aucun compte n'est associé à cette adresse email");
        } else if (error.message.includes("Email rate limit exceeded")) {
          throw new Error("Trop de tentatives. Veuillez attendre avant de réessayer");
        } else {
          throw new Error(error.message);
        }
      }

      // Succès - Supabase a envoyé l'email
      console.log("Email de réinitialisation envoyé avec succès");
    } catch (error) {
      console.error("Erreur dans ResetPasswordRepository:", error);
      throw error;
    }
  }
}

export default ResetPasswordRepository;
