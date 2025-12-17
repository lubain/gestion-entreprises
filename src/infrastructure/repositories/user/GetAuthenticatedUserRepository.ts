import { IGetAuthenticatedUserRepository } from "@/domain/interfaces/repositories/user";
import { supabase } from "@/infrastructure/supabase/supabase";

class GetAuthenticatedUserRepository implements IGetAuthenticatedUserRepository {
  constructor() {}

  async execute() {
    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;

    return data.user;
  }
}

export default GetAuthenticatedUserRepository;
