import { Expense } from "@/domain/models";

export interface ICreateExpenseRepository {
  execute(expenseData: Omit<Expense, "id">): Promise<Expense>;
}
