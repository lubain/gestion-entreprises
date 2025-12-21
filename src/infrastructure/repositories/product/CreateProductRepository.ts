import { Product } from "@/domain/models";
import { supabase } from "@/infrastructure/supabase/supabase";
import { handleError } from "@/infrastructure/supabase/supabaseFetchError";
import { PRODUCT_TABLE_NAME } from "./Constant";
import { ICreateProductRepository } from "@/domain/interfaces/repositories/product";

export class CreateProductRepository implements ICreateProductRepository {
  async execute(productData: Omit<Product, "id">): Promise<Product> {
    const { data, error } = await supabase
      .from(PRODUCT_TABLE_NAME)
      .insert(productData)
      .select()
      .single();

    handleError(error);

    return data as Product;
  }
}
