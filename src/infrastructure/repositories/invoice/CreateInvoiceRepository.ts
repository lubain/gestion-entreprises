import { Invoice } from "@/domain/models";
import { supabase } from "@/infrastructure/supabase/supabase";
import { handleError } from "@/infrastructure/supabase/supabaseFetchError";
import { INVOICES_TABLE_NAME } from "./Constant";
import { ICreateInvoiceRepository } from "@/domain/interfaces/repositories/invoice";

export class CreateInvoiceRepository implements ICreateInvoiceRepository {
  async execute(invoiceData: Omit<Invoice, "id">): Promise<Invoice> {
    const { data, error } = await supabase
      .from(INVOICES_TABLE_NAME)
      .insert(invoiceData)
      .select()
      .single();

    handleError(error);

    return data as Invoice;
  }
}
