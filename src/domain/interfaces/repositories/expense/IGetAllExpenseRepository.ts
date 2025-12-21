import { Expense } from "@/domain/models";

export interface IGetAllExpenseRepository {
  execute: () => Promise<Expense[]>;
}
