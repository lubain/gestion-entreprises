import { ICreateClientRepository } from "@/domain/interfaces/repositories/client";
import { Client } from "@/domain/models";

export class CreateClientUseCase {
  constructor(
    private readonly createClientRepository: ICreateClientRepository
  ) {}

  async execute(data: Omit<Client, "id">): Promise<Client> {
    return await this.createClientRepository.execute(data);
  }
}
