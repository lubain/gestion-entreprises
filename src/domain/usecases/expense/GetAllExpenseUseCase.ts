import { IGetAllExpenseRepository } from "@/domain/interfaces/repositories/expense";
import { Expense } from "@/domain/models";

export class GetAllExpenseUseCase {
  constructor(
    private readonly getAllExpenseRepository: IGetAllExpenseRepository
  ) {}

  async execute(): Promise<Expense[]> {
    return await this.getAllExpenseRepository.execute();
  }
}
