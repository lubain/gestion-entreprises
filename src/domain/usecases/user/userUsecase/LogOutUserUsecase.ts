import { ILogOutUserRepository } from "@/domain/interfaces/repositories/user";
import { ILogOutUserUsecase } from "@/domain/interfaces/usecases/user";

export class LogOutUserUsecase implements ILogOutUserUsecase {
  constructor(
    private readonly logOutUserRepository: ILogOutUserRepository,
  ) {}

  async execute(): Promise<void> {
    await this.logOutUserRepository.execute();
  }
}
