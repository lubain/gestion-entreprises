import { IGetAdminByUserIdRepository } from "@/domain/interfaces/repositories/admins";
import { IUserInformationProvider } from "@/domain/interfaces/services/IUserInformationProvider";
import { administrateurs } from "@/domain/models";

export class AdminInformationProvider implements IUserInformationProvider {
  constructor(private readonly adminRepository: IGetAdminByUserIdRepository) {}

  async getUserInformation(id: number): Promise<administrateurs | null> {
    return await this.adminRepository.execute(id);
  }
}
