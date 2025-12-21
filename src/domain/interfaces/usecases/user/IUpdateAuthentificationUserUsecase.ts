import { User, UserAttributes } from "@supabase/supabase-js";

export interface IUpdateAuthentificationUserUsecase {
  execute: (newUserData: UserAttributes) => Promise<User>;
}
