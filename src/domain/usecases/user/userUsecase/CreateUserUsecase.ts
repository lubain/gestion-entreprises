import { ICreateUserRepository } from "@/domain/interfaces/repositories/user";
import { IPasswordService } from "@/domain/interfaces/services/IPasswordService";
import { ICreateUserUsecase } from "@/domain/interfaces/usecases/user";
import { Utilisateur } from "@/domain/models";

export class CreateUserUsecase implements ICreateUserUsecase {
  constructor(
    private readonly createUserRepository: ICreateUserRepository,
    private readonly passwordService: IPasswordService
  ) {}

  async execute(
    userInformations: Omit<Utilisateur, "id" | "cree_a" | "mis_a_jour_a">
  ): Promise<Utilisateur> {
    let hashedPassword: string | null = null;
    hashedPassword = userInformations.mot_de_passe_hash
      ? await this.passwordService.hashPassword(
          userInformations.mot_de_passe_hash
        )
      : null;
    console.log(hashedPassword);
    return await this.createUserRepository.execute(
      userInformations,
      hashedPassword
    );
  }
}
