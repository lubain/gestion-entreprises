export interface IResetPasswordUsecase {
  /**
   * Envoie un email de réinitialisation de mot de passe
   * @param email L'adresse email de l'utilisateur
   * @returns Promise<void>
   */
  execute(email: string): Promise<void>;
}
