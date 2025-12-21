import { supabase } from "@/infrastructure/supabase/supabase";
import { IGetProductByIdRepository } from "@/domain/interfaces/repositories/product";
import { PRODUCT_TABLE_NAME } from "./Constant";
import { handleError } from "@/infrastructure/supabase/supabaseFetchError";
import { Product } from "@/domain/models";

export class GetProductByIdRepository implements IGetProductByIdRepository {
  async execute(id: number): Promise<Product> {
    const { data, error } = await supabase
      .from(PRODUCT_TABLE_NAME)
      .select("*")
      .eq("id", id)
      .single();

    handleError(error);

    return data as Product;
  }
}
