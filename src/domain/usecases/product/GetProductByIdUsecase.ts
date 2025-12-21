import { IGetProductByIdRepository } from "@/domain/interfaces/repositories/product";
import { Product } from "@/domain/models";

export class GetProductByIdUsecase {
  constructor(
    private readonly getProductByIdRepository: IGetProductByIdRepository
  ) {}

  async execute(id: number): Promise<Product | null> {
    return await this.getProductByIdRepository.execute(id);
  }
}
