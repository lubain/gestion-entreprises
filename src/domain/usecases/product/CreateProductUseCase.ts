import { ICreateProductRepository } from "@/domain/interfaces/repositories/product";
import { Product } from "@/domain/models";

export class CreateProductUseCase {
  constructor(
    private readonly createProductRepository: ICreateProductRepository
  ) {}

  async execute(data: Omit<Product, "id">): Promise<Product> {
    return await this.createProductRepository.execute(data);
  }
}
