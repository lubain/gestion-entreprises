import { Expense } from "@/domain/models";

export interface IUpdateExpenseRepository {
  execute(id: number, data: Partial<Expense>): Promise<Expense>;
}
