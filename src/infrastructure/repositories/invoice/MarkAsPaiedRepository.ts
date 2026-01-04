import { Invoice } from "@/domain/models";
import { supabase } from "@/infrastructure/supabase/supabase";
import { INVOICES_TABLE_NAME } from "./Constant";
import { IMarkAsPaiedRepository } from "@/domain/interfaces/repositories/invoice";

export class MarkAsPaiedRepository implements IMarkAsPaiedRepository {
  async execute(id: number): Promise<Invoice> {
    const status = { status: "payée" };
    const { data, error } = await supabase
      .from(INVOICES_TABLE_NAME)
      .update(status)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Invoice;
  }
}
