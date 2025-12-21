import { Product } from "@/domain/models";
import { supabase } from "@/infrastructure/supabase/supabase";
import { PRODUCT_TABLE_NAME } from "./Constant";
import { IUpdateProductStockRepository } from "@/domain/interfaces/repositories/product";

export class UpdateProductStockRepository
  implements IUpdateProductStockRepository
{
  async execute(id: number, newStock: number): Promise<Product> {
    const doneState = { stock: newStock };
    console.log(id, newStock);

    const { data, error } = await supabase
      .from(PRODUCT_TABLE_NAME)
      .update(doneState)
      .eq("id", id)
      .single();

    if (error) throw error;

    return data as Product;
  }
}
