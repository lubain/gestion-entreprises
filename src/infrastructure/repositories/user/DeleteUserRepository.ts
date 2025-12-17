import { IDeleteUserRepository } from "@/domain/interfaces/repositories/user";
import { supabase } from "@/infrastructure/supabase/supabase";
import { USER_TABLE_NAME } from "./constants";
import { Utilisateur } from "@/domain/models";

class DeleteUserRepository implements IDeleteUserRepository {
  constructor() { }

  async execute(id: number) {
    if (!id) throw new Error("L'id est requis pour la suppression");
    const { data, error } = await supabase
      .from(USER_TABLE_NAME)
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as Utilisateur;
  }
}

export default DeleteUserRepository;
