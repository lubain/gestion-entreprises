import { utilisateurs_role_enum } from "@/domain/models/enums";
import { ICreateAdminRepository } from "@/domain/interfaces/repositories/admins";
import { IMatriculeGenerator } from "@/domain/interfaces/services/IMatriculeGenerator";
import { IRegisterStrategy } from "@/domain/interfaces/strategies/IRegisterStrategy";
import { RegisterAdminStrategy } from "@/application/strategies/RegisterAdminStrategy";

export class RegisterStrategyFactory {
  constructor(
    private readonly adminRepository: ICreateAdminRepository,
    private readonly matriculeGenerator: IMatriculeGenerator
  ) {}

  createStrategy(role: utilisateurs_role_enum): IRegisterStrategy {
    const strategies = {
      [utilisateurs_role_enum.ADMIN]: () =>
        new RegisterAdminStrategy(this.adminRepository),
    };

    const strategyFactory = strategies[role];
    if (!strategyFactory) {
      throw new Error(`Aucune stratégie trouvée pour le rôle : ${role}`);
    }

    return strategyFactory();
  }
}
