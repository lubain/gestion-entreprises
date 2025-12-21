import { IEditUserRepository } from "@/domain/interfaces/repositories/user";
import { Utilisateur } from "@/domain/models";
import { USER_TABLE_NAME } from "./constants";
import { supabase } from "@/infrastructure/supabase/supabase";

class EditUserRepository implements IEditUserRepository {
  constructor() {}

  async execute(id: number, userData: Utilisateur) {
    if (!id) throw new Error("L'id est requis pour la modification");
    const { data, error } = await supabase
      .from(USER_TABLE_NAME)
      .update(userData)
      .eq("id", id)
      .select();

    if (error) throw error;

    return data[0] as Utilisateur;
  }
}

export default EditUserRepository;
