import { IUserInformationProvider } from "@/domain/interfaces/services/IUserInformationProvider";
import { AdminInformationProvider } from "@/infrastructure/providers/AdminInformationProvider";
import { utilisateurs_role_enum } from "@/domain/models/enums";
import { IGetAdminByUserIdRepository } from "@/domain/interfaces/repositories/admins";

export class UserInformationProviderFactory {
  constructor(private readonly adminRepository: IGetAdminByUserIdRepository) {}

  createProvider(role: utilisateurs_role_enum): IUserInformationProvider {
    const providers = {
      [utilisateurs_role_enum.ADMIN]: () =>
        new AdminInformationProvider(this.adminRepository),
    };

    const providerFactory = providers[role];

    if (!providerFactory) {
      throw new Error(`No provider found for role: ${role}`);
    }

    return providerFactory();
  }
}
