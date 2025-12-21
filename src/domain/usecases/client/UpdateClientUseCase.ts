import { Client } from "@/domain/models";
import { IUpdateClientRepository } from "@/domain/interfaces/repositories/client";

export class UpdateClientUseCase {
  constructor(
    private readonly updateClientRepository: IUpdateClientRepository
  ) {}

  async execute(id: number, data: Partial<Client>): Promise<Client> {
    return await this.updateClientRepository.execute(id, data);
  }
}
