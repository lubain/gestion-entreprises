import { User } from "@supabase/supabase-js";

export interface IGetAuthenticatedUserRepository {
  execute: () => Promise<User>;
}
