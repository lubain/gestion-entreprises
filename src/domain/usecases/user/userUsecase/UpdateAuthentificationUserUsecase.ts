import { IUpdateAuthentificationUserRepository } from "@/domain/interfaces/repositories/user/IUpdateAuthentificationUserRepository.ts";
import { IGetAuthenticatedUserUsecase } from "@/domain/interfaces/usecases/user/IGetAuthenticatedUserUsecase.ts";
import { IUpdateAuthentificationUserUsecase } from "@/domain/interfaces/usecases/user/IUpdateAuthentificationUserUsecase.ts";
import { UserAttributes } from "@supabase/supabase-js";

class UpdateAuthentificationUserUsecase
  implements IUpdateAuthentificationUserUsecase
{
  constructor(
    private readonly getAuthenticatedUserUsecase: IGetAuthenticatedUserUsecase,
    private readonly updateAuthentificationUserRepository: IUpdateAuthentificationUserRepository
  ) {}

  async execute(newUserData: UserAttributes) {
    const authenticatedUser = await this.getAuthenticatedUserUsecase.execute();
    if (!authenticatedUser) {
      throw new Error("Aucun utilisateur authentifié");
    }
    return await this.updateAuthentificationUserRepository.execute(newUserData);
  }
}

export default UpdateAuthentificationUserUsecase;
