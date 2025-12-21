import { IUpdateUserRepository } from "@/domain/interfaces/repositories/user/IUpdateUserRepository.ts";
import { IUpdateUserUsecase } from "@/domain/interfaces/usecases/user/IUpdateUserUsecase.ts";
import { Utilisateur } from "@/domain/models/Utilisateurs.ts";

class UpdateUserUsecase implements IUpdateUserUsecase {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async execute(
    id: number,
    userData: Partial<Utilisateur>
  ): Promise<Utilisateur> {
    return await this.updateUserRepository.execute(id, userData);
  }
}

export default UpdateUserUsecase;
