import { User, UserAttributes } from "@supabase/supabase-js";

export interface IUpdateAuthentificationUserRepository {
  execute: (newUserData: UserAttributes) => Promise<User>;
}
