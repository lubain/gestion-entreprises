import { IRoleValidator } from "@/domain/interfaces/services/IRoleValidator";
import { utilisateurs_role_enum } from "@/domain/models/enums";

export class RoleValidator implements IRoleValidator {
  isRoleValid(role: utilisateurs_role_enum): boolean {
    if (!Object.values(utilisateurs_role_enum).includes(role)) {
      return false;
    }
    return true;
  }
}
