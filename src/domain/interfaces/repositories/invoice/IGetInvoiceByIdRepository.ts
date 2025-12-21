import { Invoice } from "@/domain/models";

export interface IGetInvoiceByIdRepository {
  execute: (id: number) => Promise<Invoice>;
}
