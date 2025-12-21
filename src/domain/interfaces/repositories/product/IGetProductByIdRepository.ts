import { Product } from "@/domain/models";

export interface IGetProductByIdRepository {
  execute: (id: number) => Promise<Product>;
}
