import { IGetUserByIdRepository } from "@/domain/interfaces/repositories/user";
import { IGetUserByIdUsecase } from "@/domain/interfaces/usecases/user";
import { Utilisateur } from "@/domain/models";

export class GetUserByIdUsecase implements IGetUserByIdUsecase {
  constructor(
    private readonly getUserByIdRepository: IGetUserByIdRepository,
  ) {}

  async execute(id: number): Promise<Utilisateur | null> {
    return await this.getUserByIdRepository.execute(id);
  }
}
