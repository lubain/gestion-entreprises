import { Invoice } from "@/domain/models";

export interface ICreateInvoiceRepository {
  execute(invoiceData: Omit<Invoice, "id">): Promise<Invoice>;
}
