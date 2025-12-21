import { Expense } from "@/domain/models";
import { supabase } from "@/infrastructure/supabase/supabase";
import { handleError } from "@/infrastructure/supabase/supabaseFetchError";
import { EXPENSE_TABLE_NAME } from "./Constant";
import { IUpdateExpenseRepository } from "@/domain/interfaces/repositories/expense";

export class UpdateExpenseRepository implements IUpdateExpenseRepository {
  async execute(id: number, ExpenseData: Partial<Expense>): Promise<Expense> {
    const { data, error } = await supabase
      .from(EXPENSE_TABLE_NAME)
      .update(ExpenseData)
      .eq("id", id)
      .select()
      .single();

    handleError(error);

    return data as Expense;
  }
}
