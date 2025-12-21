import { supabase } from "@/infrastructure/supabase/supabase";
import { IGetAllProductRepository } from "@/domain/interfaces/repositories/product";
import { PRODUCT_TABLE_NAME } from "./Constant";
import { handleError } from "@/infrastructure/supabase/supabaseFetchError";
import { Product } from "@/domain/models";

export class GetAllProductRepository implements IGetAllProductRepository {
  async execute(): Promise<Product[]> {
    const { data, error } = await supabase.from(PRODUCT_TABLE_NAME).select("*");

    handleError(error);

    return data as Product[];
  }
}
