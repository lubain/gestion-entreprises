import { Invoice } from "@/domain/models";

export interface IGetAllInvoiceRepository {
  execute: () => Promise<Invoice[]>;
}
