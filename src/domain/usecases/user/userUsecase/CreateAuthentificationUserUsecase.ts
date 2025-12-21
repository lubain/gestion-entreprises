import { ICreateAuthentificationUserRepository } from "@/domain/interfaces/repositories/user";
import { ICreateAuthentificationUserUsecase } from "@/domain/interfaces/usecases/user";
import { SignUpWithPasswordCredentials, User } from "@supabase/supabase-js";

export class CreateAuthentificationUserUsecase
  implements ICreateAuthentificationUserUsecase
{
  constructor(
    private readonly createAuthentificationUserRepository: ICreateAuthentificationUserRepository
  ) {}

  async execute(
    credentials: SignUpWithPasswordCredentials,
    name: string,
    redirectToURL?: string
  ): Promise<User> {
    return await this.createAuthentificationUserRepository.execute(
      credentials,
      name,
      redirectToURL
    );
  }
}
