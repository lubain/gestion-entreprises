import { Expense } from "@/domain/models";
import { supabase } from "@/infrastructure/supabase/supabase";
import { handleError } from "@/infrastructure/supabase/supabaseFetchError";
import { EXPENSE_TABLE_NAME } from "./Constant";
import { IDeleteExpenseRepository } from "@/domain/interfaces/repositories/expense";

export class DeleteExpenseRepository implements IDeleteExpenseRepository {
  async execute(id: number): Promise<Expense> {
    const { data, error } = await supabase
      .from(EXPENSE_TABLE_NAME)
      .delete()
      .eq("id", id);

    handleError(error);

    return data as Expense;
  }
}
