import { administrateurs } from "@/domain/models";
import { supabase } from "../../supabase/supabase";
import { ADMIN_TABLE_NAME } from "./constants";
import { IGetAdminByIdRepository } from "@/domain/interfaces/repositories/admins/IGetAdminByIdRepository";

class GetAdminByIdRepository implements IGetAdminByIdRepository {
  async execute(id: number): Promise<administrateurs | null> {
    const { data, error } = await supabase
      .from(ADMIN_TABLE_NAME)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // Aucun résultat trouvé
        return null;
      }
      throw error;
    }

    return data as administrateurs;
  }
}

export default GetAdminByIdRepository;
