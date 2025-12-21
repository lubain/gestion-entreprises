import { Product } from "@/domain/models";

export interface IDeleteProductRepository {
  execute(id: number): Promise<Product>;
}
