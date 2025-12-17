import { IGetUserByEmailRepository } from "@/domain/interfaces/repositories/user";
import { supabase } from "@/infrastructure/supabase/supabase";
import { USER_TABLE_NAME } from "./constants";
import { Utilisateur } from "@/domain/models";

class GetUserByEmailRepository implements IGetUserByEmailRepository {
  constructor() {}

  async execute(email: string) {
    const { data, error } = await supabase
      .from(USER_TABLE_NAME)
      .select("*")
      .eq("email", email);

    if (!data || data.length === 0) {
      return null;
    }
    if (error) throw error;

    return data[0] as Utilisateur;
  }
}

export default GetUserByEmailRepository;
