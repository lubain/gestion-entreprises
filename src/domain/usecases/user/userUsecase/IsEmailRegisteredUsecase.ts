import { IIsEmailRegisteredRepository } from "@/domain/interfaces/repositories/user";
import { IIsEmailRegisteredUsecase } from "@/domain/interfaces/usecases/user";

export class IsEmailRegisteredUsecase implements IIsEmailRegisteredUsecase {
  constructor(
    private readonly isEmailRegisteredRepository: IIsEmailRegisteredRepository,
  ) {}

  async execute(email: string): Promise<boolean> {
    return await this.isEmailRegisteredRepository.execute(email);
  }
}
