import { SignUpWithPasswordCredentials, User } from "@supabase/supabase-js";

export interface ICreateAuthentificationUserUsecase {
  execute: (
    credentials: SignUpWithPasswordCredentials,
    name: string,
    redirectToURL?: string
  ) => Promise<User>;
}
