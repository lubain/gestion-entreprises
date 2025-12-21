import { Product } from "@/domain/models";

export interface IUpdateProductRepository {
  execute(id: number, data: Partial<Product>): Promise<Product>;
}
