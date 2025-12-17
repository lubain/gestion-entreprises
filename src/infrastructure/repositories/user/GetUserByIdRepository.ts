import { Utilisateur } from "@/domain/models";
import { IGetUserByIdRepository } from "@/domain/interfaces/repositories/user";
import { supabase } from "@/infrastructure/supabase/supabase";
import { USER_TABLE_NAME } from "./constants";

class GetUserByIdRepository implements IGetUserByIdRepository {
  constructor() {}

  async execute(id: number) {
    const { data, error } = await supabase
      .from(USER_TABLE_NAME)
      .select("*")
      .eq("id", id);

    if (error) throw error;

    if (!data || data.length === 0) return null;

    return data[0] as Utilisateur;
  }
}

export default GetUserByIdRepository;
