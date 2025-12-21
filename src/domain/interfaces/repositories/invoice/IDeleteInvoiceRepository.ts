import { Invoice } from "@/domain/models";

export interface IDeleteInvoiceRepository {
  execute(id: number): Promise<Invoice>;
}
