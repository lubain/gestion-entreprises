import { ICreateExpenseRepository } from "@/domain/interfaces/repositories/expense";
import { Expense } from "@/domain/models";

export class CreateExpenseUseCase {
  constructor(
    private readonly createExpenseRepository: ICreateExpenseRepository
  ) {}

  async execute(data: Omit<Expense, "id">): Promise<Expense> {
    return await this.createExpenseRepository.execute(data);
  }
}
