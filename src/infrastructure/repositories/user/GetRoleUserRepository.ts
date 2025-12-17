import { IGetRoleUserRepository } from "@/domain/interfaces/repositories/user";
import { supabase } from "@/infrastructure/supabase/supabase";
import { USER_TABLE_NAME } from "./constants";
import { utilisateurs_role_enum } from "@/domain/models/enums";

export class GetRoleUserRepository implements IGetRoleUserRepository {
  constructor() {}

  async execute(utilisateur_id: number): Promise<utilisateurs_role_enum> {
    const { data, error } = await supabase
      .from(USER_TABLE_NAME)
      .select("role")
      .eq("id", utilisateur_id)
      .single();

    if (error) throw error;

    return data.role as utilisateurs_role_enum;
  }
}
