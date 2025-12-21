import { IDeleteAuthentificationUserRepository } from "@/domain/interfaces/repositories/user";
import { supabase } from "@/infrastructure/supabase/supabase";

class DeleteAuthentificationUserRepository
  implements IDeleteAuthentificationUserRepository {
  constructor() {}

  async execute(userId: string) {
    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) throw error;

      return true;
    } catch (err) {
      console.error(err);

      throw err;
    }
  }
}

export default DeleteAuthentificationUserRepository;
