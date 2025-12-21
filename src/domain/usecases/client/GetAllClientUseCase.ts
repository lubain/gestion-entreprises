import { IGetAllClientRepository } from "@/domain/interfaces/repositories/client";
import { Client } from "@/domain/models";

export class GetAllClientUseCase {
  constructor(
    private readonly getAllClientRepository: IGetAllClientRepository
  ) {}

  async execute(): Promise<Client[]> {
    return await this.getAllClientRepository.execute();
  }
}
