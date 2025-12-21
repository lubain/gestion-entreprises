import { ICreateInvoiceRepository } from "@/domain/interfaces/repositories/invoice";
import { Invoice } from "@/domain/models";

export class CreateInvoiceUseCase {
  constructor(
    private readonly createInvoiceRepository: ICreateInvoiceRepository
  ) {}

  async execute(data: Omit<Invoice, "id">): Promise<Invoice> {
    return await this.createInvoiceRepository.execute(data);
  }
}
