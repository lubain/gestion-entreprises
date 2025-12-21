import { Invoice } from "@/domain/models";

export interface IUpdateInvoiceRepository {
  execute(id: number, data: Partial<Invoice>): Promise<Invoice>;
}
