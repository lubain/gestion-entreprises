import { IAuthenticateUserRepository } from "@/domain/interfaces/repositories/user";
import { supabase } from "@/infrastructure/supabase/supabase";
import { SignInWithPasswordCredentials } from "@supabase/supabase-js";

class AuthenticateUserRepository implements IAuthenticateUserRepository {
  constructor() {}

  async execute(credentials: SignInWithPasswordCredentials) {
    const { data: _data, error } =
      await supabase.auth.signInWithPassword(credentials);

    if (error) {
      throw new Error(error.message);
    }
  }
}

export default AuthenticateUserRepository;
