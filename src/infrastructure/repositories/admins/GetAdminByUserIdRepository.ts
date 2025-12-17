import { IGetAdminByUserIdRepository } from "@/domain/interfaces/repositories/admins";
import { administrateurs } from "@/domain/models";
import { supabase } from "../../supabase/supabase";
import { ADMIN_TABLE_NAME } from "./constants";

export default class GetAdminByUserIdRepository implements IGetAdminByUserIdRepository {
  async execute(id: number): Promise<administrateurs> {
    const { data, error } = await supabase
      .from(ADMIN_TABLE_NAME)
      .select("*")
      .eq("utilisateur_id", id)
      .single();

    if (error) throw error

    return data as administrateurs;
  }
}
