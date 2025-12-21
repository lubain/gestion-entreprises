import { IUpdateAuthentificationUserRepository } from "@/domain/interfaces/repositories/user/IUpdateAuthentificationUserRepository.ts";
import { supabase } from "@/infrastructure/supabase/supabase.ts";
import { UserAttributes } from "@supabase/supabase-js";

class UpdateAuthentificationUserRepository
  implements IUpdateAuthentificationUserRepository
{
  constructor() {}

  async execute(newUserData: UserAttributes) {
    const { data, error } = await supabase.auth.updateUser(newUserData);

    if (error) throw error;

    return data.user;
  }
}

export default UpdateAuthentificationUserRepository;
