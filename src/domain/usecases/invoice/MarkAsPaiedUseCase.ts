import { Invoice } from "@/domain/models";
import { IMarkAsPaiedRepository } from "@/domain/interfaces/repositories/invoice";

export class MarkAsPaiedUseCase {
  constructor(private readonly markAsPaiedRepository: IMarkAsPaiedRepository) {}

  async execute(id: number): Promise<Invoice> {
    return await this.markAsPaiedRepository.execute(id);
  }
}
