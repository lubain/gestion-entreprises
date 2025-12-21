import { IGetInvoiceByIdRepository } from "@/domain/interfaces/repositories/invoice";
import { Invoice } from "@/domain/models";

export class GetInvoiceByIdUsecase {
  constructor(
    private readonly getInvoiceByIdRepository: IGetInvoiceByIdRepository
  ) {}

  async execute(id: number): Promise<Invoice | null> {
    return await this.getInvoiceByIdRepository.execute(id);
  }
}
