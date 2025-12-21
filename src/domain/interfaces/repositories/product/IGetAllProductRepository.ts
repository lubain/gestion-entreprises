import { Product } from "@/domain/models";

export interface IGetAllProductRepository {
  execute: () => Promise<Product[]>;
}
