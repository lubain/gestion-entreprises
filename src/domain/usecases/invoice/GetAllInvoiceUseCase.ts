import { IGetAllInvoiceRepository } from "@/domain/interfaces/repositories/invoice";
import { Invoice } from "@/domain/models";

export class GetAllInvoiceUseCase {
  constructor(
    private readonly getAllInvoiceRepository: IGetAllInvoiceRepository
  ) {}

  async execute(): Promise<Invoice[]> {
    return await this.getAllInvoiceRepository.execute();
  }
}
