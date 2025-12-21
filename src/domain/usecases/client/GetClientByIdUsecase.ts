import { IGetClientByIdRepository } from "@/domain/interfaces/repositories/client";
import { Client } from "@/domain/models";

export class GetClientByIdUsecase {
  constructor(
    private readonly getClientByIdRepository: IGetClientByIdRepository
  ) {}

  async execute(id: number): Promise<Client | null> {
    return await this.getClientByIdRepository.execute(id);
  }
}
