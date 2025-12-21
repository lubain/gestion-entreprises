import { Product } from "@/domain/models";

export interface ICreateProductRepository {
  execute(productData: Omit<Product, "id">): Promise<Product>;
}
