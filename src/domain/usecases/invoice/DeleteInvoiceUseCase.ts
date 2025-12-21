import { IDeleteInvoiceRepository } from "@/domain/interfaces/repositories/invoice";

export class DeleteInvoiceUseCase {
  constructor(
    private readonly deleteInvoiceRepository: IDeleteInvoiceRepository
  ) {}

  async execute(id: number): Promise<void> {
    await this.deleteInvoiceRepository.execute(id);
  }
}
