import { supabase } from "@/infrastructure/supabase/supabase";
import { IGetExpenseByIdRepository } from "@/domain/interfaces/repositories/expense";
import { EXPENSE_TABLE_NAME } from "./Constant";
import { handleError } from "@/infrastructure/supabase/supabaseFetchError";
import { Expense } from "@/domain/models";

export class GetExpenseByIdRepository implements IGetExpenseByIdRepository {
  async execute(id: number): Promise<Expense> {
    const { data, error } = await supabase
      .from(EXPENSE_TABLE_NAME)
      .select("*")
      .eq("id", id)
      .single();

    handleError(error);

    return data as Expense;
  }
}
