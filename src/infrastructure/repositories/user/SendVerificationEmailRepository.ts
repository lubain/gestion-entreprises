import { ISendVerificationEmailRepository } from "@/domain/interfaces/repositories/user";
import { supabase } from "@/infrastructure/supabase/supabase";

class SendVerificationEmailRepository
  implements ISendVerificationEmailRepository {
  constructor() {}

  async execute(email: string) {
    try {
      const { data: _, error } = await supabase.auth.resend({
        email: email,
        type: "signup",
      });
      if (error) throw error;

      return "Email renvoyee";
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default SendVerificationEmailRepository;
