import { IAuthenticateUserRepository } from "@/domain/interfaces/repositories/user";
import { IAuthenticateUserUsecase } from "@/domain/interfaces/usecases/user";
import { SignInWithPasswordCredentials } from "@supabase/supabase-js";

export class AuthenticateUserUsecase implements IAuthenticateUserUsecase {
  constructor(
    private readonly authenticateUserRepository: IAuthenticateUserRepository,
  ) {}

  async execute(credentials: SignInWithPasswordCredentials): Promise<void> {
    return await this.authenticateUserRepository.execute(credentials);
  }
}
