import { ISendVerificationEmailRepository } from "@/domain/interfaces/repositories/user";
import {
  ISendVerificationEmailUsecase,
} from "@/domain/interfaces/usecases/user";

export class SendVerificationEmailUsecase
  implements ISendVerificationEmailUsecase {
  constructor(
    private readonly sendVerificationEmailRepository:
      ISendVerificationEmailRepository,
  ) {}

  async execute(email: string): Promise<void> {
    try {
      await this.sendVerificationEmailRepository.execute(email);
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}
