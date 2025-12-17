import { utilisateurs_role_enum } from "@/domain/models/enums";

export interface IGetRoleUserRepository {
  execute: (utilisateur_id: number) => Promise<utilisateurs_role_enum>;
}
