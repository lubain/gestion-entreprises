import { Expense } from "@/domain/models";
import { supabase } from "@/infrastructure/supabase/supabase";
import { handleError } from "@/infrastructure/supabase/supabaseFetchError";
import { EXPENSE_TABLE_NAME } from "./Constant";
import { ICreateExpenseRepository } from "@/domain/interfaces/repositories/expense";

export class CreateExpenseRepository implements ICreateExpenseRepository {
  async execute(expenseData: Omit<Expense, "id">): Promise<Expense> {
    const { data, error } = await supabase
      .from(EXPENSE_TABLE_NAME)
      .insert(expenseData)
      .select()
      .single();

    handleError(error);

    return data as Expense;
  }
}
