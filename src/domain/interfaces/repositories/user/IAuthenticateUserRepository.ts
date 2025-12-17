import { SignInWithPasswordCredentials } from "@supabase/supabase-js";

export interface IAuthenticateUserRepository {
  execute: (credentials: SignInWithPasswordCredentials) => Promise<void>;
}
