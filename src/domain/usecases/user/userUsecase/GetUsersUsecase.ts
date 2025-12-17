import { IGetUsersRepository } from "@/domain/interfaces/repositories/user";
import { IGetUsersUsecase } from "@/domain/interfaces/usecases/user";
import { Utilisateur } from "@/domain/models";

export class GetUsersUsecase implements IGetUsersUsecase {
  constructor(
    private readonly getUsersRepository: IGetUsersRepository,
  ) {}

  async execute(): Promise<Utilisateur[]> {
    return await this.getUsersRepository.execute();
  }
}
