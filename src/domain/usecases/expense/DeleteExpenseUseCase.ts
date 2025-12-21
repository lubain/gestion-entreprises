import { IDeleteExpenseRepository } from "@/domain/interfaces/repositories/expense";

export class DeleteExpenseUseCase {
  constructor(
    private readonly deleteExpenseRepository: IDeleteExpenseRepository
  ) {}

  async execute(id: number): Promise<void> {
    await this.deleteExpenseRepository.execute(id);
  }
}
