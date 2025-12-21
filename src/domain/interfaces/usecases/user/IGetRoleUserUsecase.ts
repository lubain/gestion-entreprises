import { utilisateurs_role_enum } from "@/domain/models/enums";

export interface IGetRoleUserUsecase {
  execute: (utilisateur_id: number) => Promise<utilisateurs_role_enum>;
}
