import { Expense } from "@/domain/models";

export interface IGetExpenseByIdRepository {
  execute: (id: number) => Promise<Expense>;
}
