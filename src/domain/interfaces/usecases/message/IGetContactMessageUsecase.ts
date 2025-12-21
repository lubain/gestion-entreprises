import { utilisateurs_role_enum } from "@/domain/models/enums";
import { Contact } from "@/presentation/types/message.types";

export interface IGetContactMessageUsecase {
  execute(role: utilisateurs_role_enum): Promise<Contact[]>;
}
