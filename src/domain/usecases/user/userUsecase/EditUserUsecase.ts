import { IEditUserRepository } from "@/domain/interfaces/repositories/user";
import { IEditUserUsecase } from "@/domain/interfaces/usecases/user";
import { Utilisateur } from "@/domain/models";

export class EditUserUsecase implements IEditUserUsecase {
  constructor(
    private readonly editUserRepository: IEditUserRepository,
  ) {}

  async execute(id: number, userData: Utilisateur): Promise<Utilisateur> {
    return await this.editUserRepository.execute(id, userData);
  }
}
