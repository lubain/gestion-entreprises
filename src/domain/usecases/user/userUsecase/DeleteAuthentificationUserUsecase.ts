import { IDeleteAuthentificationUserRepository } from "@/domain/interfaces/repositories/user";
import { IDeleteAuthentificationUserUsecase } from "@/domain/interfaces/usecases/user";

export class DeleteAuthentificationUserUsecase implements IDeleteAuthentificationUserUsecase {
  constructor(
    private readonly deleteAuthentificationUserRepository: IDeleteAuthentificationUserRepository,
  ) {}

  async execute(userId: string): Promise<boolean> {
    return await this.deleteAuthentificationUserRepository.execute(userId);
  }
}
