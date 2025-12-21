import { IGetAuthenticatedUserRepository } from "@/domain/interfaces/repositories/user";
import { IGetAuthenticatedUserUsecase } from "@/domain/interfaces/usecases/user";
import { User } from "@supabase/supabase-js";

export class GetAuthenticatedUserUsecase implements IGetAuthenticatedUserUsecase {
  constructor(
    private readonly getAuthenticatedUserRepository: IGetAuthenticatedUserRepository,
  ) {}

  async execute(): Promise<User> {
    return await this.getAuthenticatedUserRepository.execute();
  }
}
