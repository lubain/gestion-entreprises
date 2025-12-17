import { IGetRoleUserRepository } from "@/domain/interfaces/repositories/user";
import { IGetRoleUserUsecase } from "@/domain/interfaces/usecases/user";
import { utilisateurs_role_enum } from "@/domain/models/enums";

export class GetRoleUserUsecase implements IGetRoleUserUsecase {
  constructor(private readonly getRoleUserRepository: IGetRoleUserRepository) {}
  async execute(utilisateur_id: number): Promise<utilisateurs_role_enum> {
    return await this.getRoleUserRepository.execute(utilisateur_id);
  }
}
