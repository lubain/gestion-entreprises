import { IDeleteUserRepository } from "@/domain/interfaces/repositories/user";
import { IDeleteUserUsecase } from "@/domain/interfaces/usecases/user";
import { Utilisateur } from "@/domain/models";

export class DeleteUserUsecase implements IDeleteUserUsecase {
  constructor(
    private readonly deleteUserRepository: IDeleteUserRepository,
  ) {}

  async execute(id: number): Promise<Utilisateur> {
    return await this.deleteUserRepository.execute(id);
  }
}
