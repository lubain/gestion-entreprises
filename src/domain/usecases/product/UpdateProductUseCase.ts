import { Product } from "@/domain/models";
import { IUpdateProductRepository } from "@/domain/interfaces/repositories/product";

export class UpdateProductUseCase {
  constructor(
    private readonly updateProductRepository: IUpdateProductRepository
  ) {}

  async execute(id: number, data: Partial<Product>): Promise<Product> {
    return await this.updateProductRepository.execute(id, data);
  }
}
