import { SignInWithPasswordCredentials } from "@supabase/supabase-js";

export interface IAuthenticateUserUsecase {
  execute: (credentials: SignInWithPasswordCredentials) => Promise<void>;
}
