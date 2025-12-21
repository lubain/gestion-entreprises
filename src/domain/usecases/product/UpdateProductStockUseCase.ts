import { Product } from "@/domain/models";
import { IUpdateProductStockRepository } from "@/domain/interfaces/repositories/product";

export class UpdateProductStockUseCase {
  constructor(
    private readonly updateProductStockRepository: IUpdateProductStockRepository
  ) {}

  async execute(data: { id: number; newStock: number }[]): Promise<Product[]> {
    const updates = data.map((item) =>
      this.updateProductStockRepository.execute(item.id, item.newStock)
    );

    return await Promise.all(updates);
  }
}
