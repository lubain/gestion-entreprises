import { utilisateurs_role_enum } from "@/domain/models/enums";

export interface IRoleValidator {
  isRoleValid(role: utilisateurs_role_enum): boolean;
}
