import { LoginUserDTO } from "@/domain/DTOS/LoginUserDTO";
import { administrateurs } from "@/domain/models";
import { utilisateurs_role_enum } from "@/domain/models/enums";
import { loginCredential } from "@/domain/usecases/user/Login/type";

export interface ILoginUserUsecase {
  getUserInformations(
    role: utilisateurs_role_enum,
    id: number
  ): Promise<administrateurs | null>;
  execute(credential: loginCredential): Promise<LoginUserDTO>;
}
