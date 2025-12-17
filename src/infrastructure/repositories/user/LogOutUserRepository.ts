import { supabase } from "@/infrastructure/supabase/supabase";

class LogOutUserRepository {
  constructor() {}

  async execute() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
}

export default LogOutUserRepository;
