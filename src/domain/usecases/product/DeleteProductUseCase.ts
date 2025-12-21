import { IDeleteProductRepository } from "@/domain/interfaces/repositories/product";

export class DeleteProductUseCase {
  constructor(
    private readonly deleteProductRepository: IDeleteProductRepository
  ) {}

  async execute(id: number): Promise<void> {
    await this.deleteProductRepository.execute(id);
  }
}
