import { SignUpWithPasswordCredentials, User } from "@supabase/supabase-js";

export interface ICreateAuthentificationUserRepository {
  execute: (
    credentials: SignUpWithPasswordCredentials,
    name: string,
    redirectToURL?: string
  ) => Promise<User>;
}
