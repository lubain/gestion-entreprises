import { supabase } from "@/infrastructure/supabase/supabase";
import { IGetAllExpenseRepository } from "@/domain/interfaces/repositories/expense";
import { EXPENSE_TABLE_NAME } from "./Constant";
import { handleError } from "@/infrastructure/supabase/supabaseFetchError";
import { Expense } from "@/domain/models";

export class GetAllExpenseRepository implements IGetAllExpenseRepository {
  async execute(): Promise<Expense[]> {
    const { data, error } = await supabase.from(EXPENSE_TABLE_NAME).select("*");

    handleError(error);

    return data as Expense[];
  }
}
