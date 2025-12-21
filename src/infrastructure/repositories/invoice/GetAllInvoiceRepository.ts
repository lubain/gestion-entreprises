import { supabase } from "@/infrastructure/supabase/supabase";
import { IGetAllInvoiceRepository } from "@/domain/interfaces/repositories/invoice";
import { INVOICES_TABLE_NAME } from "./Constant";
import { handleError } from "@/infrastructure/supabase/supabaseFetchError";
import { Invoice } from "@/domain/models";

export class GetAllInvoiceRepository implements IGetAllInvoiceRepository {
  async execute(): Promise<Invoice[]> {
    const { data, error } = await supabase
      .from(INVOICES_TABLE_NAME)
      .select("*");

    handleError(error);

    return data as Invoice[];
  }
}
