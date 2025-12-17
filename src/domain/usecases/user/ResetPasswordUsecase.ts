import { IResetPasswordRepository } from "@/domain/interfaces/repositories/user/IResetPasswordRepository";
import { IResetPasswordUsecase } from "@/domain/interfaces/usecases/user/IResetPasswordUsecase";

export class ResetPasswordUsecase implements IResetPasswordUsecase {
  constructor(
    private readonly resetPasswordRepository: IResetPasswordRepository
  ) {}

  async execute(email: string): Promise<void> {
    // Validation de l'email
    if (!email || !email.trim()) {
      throw new Error("L'adresse email est requise");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("L'adresse email n'est pas valide");
    }

    // Appel au repository pour envoyer l'email
    await this.resetPasswordRepository.execute(email.trim().toLowerCase());
  }
}
