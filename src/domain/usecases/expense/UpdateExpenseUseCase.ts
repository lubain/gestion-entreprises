import { Expense } from "@/domain/models";
import { IUpdateExpenseRepository } from "@/domain/interfaces/repositories/expense";

export class UpdateExpenseUseCase {
  constructor(
    private readonly updateExpenseRepository: IUpdateExpenseRepository
  ) {}

  async execute(id: number, data: Partial<Expense>): Promise<Expense> {
    return await this.updateExpenseRepository.execute(id, data);
  }
}
