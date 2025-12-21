import { Product } from "@/domain/models";
import { supabase } from "@/infrastructure/supabase/supabase";
import { handleError } from "@/infrastructure/supabase/supabaseFetchError";
import { PRODUCT_TABLE_NAME } from "./Constant";
import { IUpdateProductRepository } from "@/domain/interfaces/repositories/product";

export class UpdateProductRepository implements IUpdateProductRepository {
  async execute(id: number, ProductData: Partial<Product>): Promise<Product> {
    const { data, error } = await supabase
      .from(PRODUCT_TABLE_NAME)
      .update(ProductData)
      .eq("id", id)
      .select()
      .single();

    handleError(error);

    return data as Product;
  }
}
