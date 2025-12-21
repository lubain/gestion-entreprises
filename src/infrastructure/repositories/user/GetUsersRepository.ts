import { IGetUsersRepository } from "@/domain/interfaces/repositories/user";
import { supabase } from "@/infrastructure/supabase/supabase";
import { USER_TABLE_NAME } from "./constants";
import { Utilisateur } from "@/domain/models";

class GetUsersRepository implements IGetUsersRepository {
  constructor() {}

  async execute() {
    const { data, error } = await supabase.from(USER_TABLE_NAME).select("*");

    if (error) throw error;

    return data as Utilisateur[];
  }
}

export default GetUsersRepository;
