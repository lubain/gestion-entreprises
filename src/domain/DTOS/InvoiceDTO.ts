import { Invoice, InvoiceItem } from "../models";

export type InvoiceDTO = Invoice & {
  items: InvoiceItem[];
};
