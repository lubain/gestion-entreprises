import { IGetAdminByUserIdRepository } from "@/domain/interfaces/repositories/admins";
import { administrateurs } from "@/domain/models";
import { utilisateurs_role_enum } from "@/domain/models/enums";

export class GetUserInformationUsecase {
  constructor(private readonly adminRepository: IGetAdminByUserIdRepository) {}

  private roleStrategies: Record<
    string,
    (id: number) => Promise<administrateurs | null>
  > = {
    [utilisateurs_role_enum.ADMIN]: (id) => this.adminRepository.execute(id),
  };

  async execute(role: string, id: number): Promise<administrateurs | null> {
    const getUserInfo = this.roleStrategies[role];
    return getUserInfo ? getUserInfo(id) : null;
  }
}
