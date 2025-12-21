import { Invoice } from "@/domain/models";
import { supabase } from "@/infrastructure/supabase/supabase";
import { handleError } from "@/infrastructure/supabase/supabaseFetchError";
import { INVOICES_TABLE_NAME } from "./Constant";
import { IUpdateInvoiceRepository } from "@/domain/interfaces/repositories/invoice";

export class UpdateInvoiceRepository implements IUpdateInvoiceRepository {
  async execute(id: number, InvoiceData: Partial<Invoice>): Promise<Invoice> {
    const { data, error } = await supabase
      .from(INVOICES_TABLE_NAME)
      .update(InvoiceData)
      .eq("id", id)
      .select()
      .single();

    handleError(error);

    return data as Invoice;
  }
}
