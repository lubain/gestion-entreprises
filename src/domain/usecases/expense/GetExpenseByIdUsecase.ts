import { IGetExpenseByIdRepository } from "@/domain/interfaces/repositories/expense";
import { Expense } from "@/domain/models";

export class GetExpenseByIdUsecase {
  constructor(
    private readonly getExpenseByIdRepository: IGetExpenseByIdRepository
  ) {}

  async execute(id: number): Promise<Expense | null> {
    return await this.getExpenseByIdRepository.execute(id);
  }
}
