import { ICreateUserRepository } from "@/domain/interfaces/repositories/user";
import { Utilisateur } from "@/domain/models";
import { supabase } from "@/infrastructure/supabase/supabase";
import { USER_TABLE_NAME } from "./constants";

class CreateUserRepository implements ICreateUserRepository {
  constructor() {}

  async execute(
    userInformations: Omit<Utilisateur, "id" | "cree_a" | "mis_a_jour_a">,
    hashedPassword: string | null
  ) {
    const { data, error } = await supabase
      .from(USER_TABLE_NAME)
      .insert({
        ...userInformations,
        mot_de_passe_hash: hashedPassword,
      })
      .select()
      .single();

    if (error) throw error;

    return data as Utilisateur;
  }
}

export default CreateUserRepository;
