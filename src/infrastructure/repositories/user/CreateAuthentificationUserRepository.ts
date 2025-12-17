import { ICreateAuthentificationUserRepository } from "@/domain/interfaces/repositories/user";
import { supabase } from "@/infrastructure/supabase/supabase";
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";

class CreateAuthentificationUserRepository
  implements ICreateAuthentificationUserRepository
{
  constructor() {}

  async execute(
    credentials: SignUpWithPasswordCredentials,
    name: string,
    redirectToURL?: string
  ) {
    const { data: user, error } = await supabase.auth.signUp({
      ...credentials,
      options: {
        data: { first_name: name },
        ...(redirectToURL && { emailRedirectTo: redirectToURL }),
      },
    });

    if (error) throw error;

    return user.user;
  }
}

export default CreateAuthentificationUserRepository;
