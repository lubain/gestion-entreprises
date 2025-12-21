import { Expense } from "@/domain/models";

export interface IDeleteExpenseRepository {
  execute(id: number): Promise<Expense>;
}
