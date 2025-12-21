import { Invoice } from "@/domain/models";
import { supabase } from "@/infrastructure/supabase/supabase";
import { handleError } from "@/infrastructure/supabase/supabaseFetchError";
import { INVOICES_TABLE_NAME } from "./Constant";
import { IDeleteInvoiceRepository } from "@/domain/interfaces/repositories/invoice";

export class DeleteInvoiceRepository implements IDeleteInvoiceRepository {
  async execute(id: number): Promise<Invoice> {
    const { data, error } = await supabase
      .from(INVOICES_TABLE_NAME)
      .delete()
      .eq("id", id);

    handleError(error);

    return data as Invoice;
  }
}
