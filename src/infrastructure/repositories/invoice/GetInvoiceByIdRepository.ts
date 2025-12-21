import { supabase } from "@/infrastructure/supabase/supabase";
import { IGetInvoiceByIdRepository } from "@/domain/interfaces/repositories/invoice";
import { INVOICES_TABLE_NAME } from "./Constant";
import { handleError } from "@/infrastructure/supabase/supabaseFetchError";
import { Invoice } from "@/domain/models";

export class GetInvoiceByIdRepository implements IGetInvoiceByIdRepository {
  async execute(id: number): Promise<Invoice> {
    const { data, error } = await supabase
      .from(INVOICES_TABLE_NAME)
      .select("*")
      .eq("id", id)
      .single();

    handleError(error);

    return data as Invoice;
  }
}
