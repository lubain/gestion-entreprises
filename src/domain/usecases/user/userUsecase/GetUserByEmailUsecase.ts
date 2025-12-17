import { IGetUserByEmailRepository } from "@/domain/interfaces/repositories/user";
import { IGetUserByEmailUsecase } from "@/domain/interfaces/usecases/user";
import { Utilisateur } from "@/domain/models";

export class GetUserByEmailUsecase implements IGetUserByEmailUsecase {
  constructor(
    private readonly getUserByEmailRepository: IGetUserByEmailRepository,
  ) {}

  async execute(email: string): Promise<Utilisateur | null> {
    return await this.getUserByEmailRepository.execute(email);
  }
}
