import { ICreateAdminRepository } from "@/domain/interfaces/repositories/admins";
import { administrateurs } from "@/domain/models";
import { supabase } from "../../supabase/supabase";
import { ADMIN_TABLE_NAME } from "./constants";

export default class CreateAdminRepository implements ICreateAdminRepository {
  async execute(
    adminInformations: Omit<administrateurs, "id">
  ): Promise<administrateurs> {
    const { data, error } = await supabase
      .from(ADMIN_TABLE_NAME)
      .insert(adminInformations)
      .select()
      .single();

    if (error) throw error;

    return data as administrateurs;
  }
}
