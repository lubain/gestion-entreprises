import { Product } from "@/domain/models";
import { supabase } from "@/infrastructure/supabase/supabase";
import { handleError } from "@/infrastructure/supabase/supabaseFetchError";
import { PRODUCT_TABLE_NAME } from "./Constant";
import { IDeleteProductRepository } from "@/domain/interfaces/repositories/product";

export class DeleteProductRepository implements IDeleteProductRepository {
  async execute(id: number): Promise<Product> {
    const { data, error } = await supabase
      .from(PRODUCT_TABLE_NAME)
      .delete()
      .eq("id", id);

    handleError(error);

    return data as Product;
  }
}
