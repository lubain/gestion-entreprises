import { User } from "@supabase/supabase-js";

export interface IGetAuthenticatedUserUsecase {
  execute: () => Promise<User>;
}
