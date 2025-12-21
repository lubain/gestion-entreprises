import { Invoice } from "@/domain/models";
import { IUpdateInvoiceRepository } from "@/domain/interfaces/repositories/invoice";

export class UpdateInvoiceUseCase {
  constructor(
    private readonly updateInvoiceRepository: IUpdateInvoiceRepository
  ) {}

  async execute(id: number, data: Partial<Invoice>): Promise<Invoice> {
    return await this.updateInvoiceRepository.execute(id, data);
  }
}
