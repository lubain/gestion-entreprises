import { IDeleteClientRepository } from "@/domain/interfaces/repositories/client";

export class DeleteClientUseCase {
  constructor(
    private readonly deleteClientRepository: IDeleteClientRepository
  ) {}

  async execute(id: number): Promise<void> {
    await this.deleteClientRepository.execute(id);
  }
}
