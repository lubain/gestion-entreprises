import { IGetAllProductRepository } from "@/domain/interfaces/repositories/product";
import { Product } from "@/domain/models";

export class GetAllProductUseCase {
  constructor(
    private readonly getAllProductRepository: IGetAllProductRepository
  ) {}

  async execute(): Promise<Product[]> {
    return await this.getAllProductRepository.execute();
  }
}
