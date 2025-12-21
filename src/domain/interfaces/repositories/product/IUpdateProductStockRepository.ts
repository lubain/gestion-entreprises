import { Product } from "@/domain/models";

export interface IUpdateProductStockRepository {
  execute(id: number, newStock: number): Promise<Product>;
}
