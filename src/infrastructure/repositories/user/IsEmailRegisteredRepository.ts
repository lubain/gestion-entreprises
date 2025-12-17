import { IIsEmailRegisteredRepository } from "@/domain/interfaces/repositories/user";
import { supabase } from "@/infrastructure/supabase/supabase";
import { ErrorMessages } from "@/shared/constants/ErrorMessages";
import { AdminUserAttributes } from "@supabase/supabase-js";

class IsEmailRegisteredRepository implements IIsEmailRegisteredRepository {
  constructor() {}

  async execute(email: string) {
    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) throw new Error(ErrorMessages.REGENERATE_SIGNUP_LINK_ERROR);

    return data.users.some((user: AdminUserAttributes) => user.email === email);
  }
}

export default IsEmailRegisteredRepository;
